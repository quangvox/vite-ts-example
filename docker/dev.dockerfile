FROM node:18-alpine as base

RUN apk update && apk add jq

WORKDIR /app
ENV PORT=8080
COPY --from=powerman/dockerize:0.19.0 /usr/local/bin/dockerize /usr/local/bin/dockerize

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app/

RUN jq -c 'del(.dependencies, .devDependencies)' package.json > tmp.$$.json && mv tmp.$$.json package.json
ENV NODE_PATH="src/"

EXPOSE $PORT

ENTRYPOINT ["dockerize", "-template", "./public/config.js.template:./public/config.js"]
CMD yarn dev --port ${PORT}