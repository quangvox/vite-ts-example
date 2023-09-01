# vite-ts-example

This is a guide on how to install, configure, run, test and deploy this project.

## Prerequisites

- You need to have `yarn` installed on your machine.
- You may need to install `cmake` (`brew install cmake`) if you encounter any errors during the installation.
- You need to have either `docker` (`brew cask install docker`) or `gettext` (`brew install gettext && brew link --force gettext`) installed for generating the local config file.

## Installation

- Run `yarn install` to install the required packages.
- Run `yarn husky install` to set up husky for re-commit.

## Configuration

- Create the configuration files `public/config.js` follow template in `public/config.js.template`:

## Running the UI

- Run `yarn dev` to start the App.
- Run `make dev-up` to start with docker
- You will see the information about the app and port in the terminal.

## Building Project

- Run `yarn build` to build project to ESM Library.
- Run `yarn build:preview` to build project in preview mode. Run `yarn preview` to start the build file.
- Run `make preview-up` to build and prevuew project with docker

## Formatting the code

- Run `yarn lint` to check format the code using eslint and prettier.

## Testing the project

- Run `yarn test` to run the tests with a watcher (recommended for development).
- Run `yarn test:ci` to run the tests only for checking the result (suitable for CI).
- Run `make test-up` to run the tests on docker.
