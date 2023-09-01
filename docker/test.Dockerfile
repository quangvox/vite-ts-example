FROM node:18-alpine as base

WORKDIR /app

COPY package.json yarn.lock /app/
RUN yarn install

COPY . /app

CMD yarn test:ci
