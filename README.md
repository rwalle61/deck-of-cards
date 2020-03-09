# Deck of Cards

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Deploying the App](#deploying-the-app)
- [Acknowledgments](#acknowledgments)

## Overview

This is a simple web app allowing a magician to perform magic tricks. They can shuffle, draw and sort cards.

The app is mainly a React frontend supported by a minimal Node.js Express server backend.

To aid development and ensure quality, we:
- use Behaviour Driven Development ([Cypress integration tests](#all-tests) and [Mocha backend tests](#server))
- run all the tests on every commit to any branch (see our [`.travis.yml`](https://github.com/rwalle61/deck-of-cards/blob/master/.travis.yml))
- have an [OpenAPI 3 specification](https://rwalle61.github.io/deck-of-cards/) for the server
- use Eslint (Airbnb) and Husky git hooks
- have set up a VSCode debugger
- have set the app up to [deploy to cloud (IBM Cloud Foundry)](#deploying-the-app).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:rwalle61/deck-of-cards.git
```

Install dependencies

```bash
npm install
```

### Run the app

```bash
npm run build

npm start
```

The app will be running at `http://localhost:9100`.

Alternatively, you can run `npm start` from
- `/server` to start only the server
- `/client` to start only the client

### Run the app in development mode

Run `npm run start:dev` from the root directory to start both the client and server in 'hot-restart' mode. Editing the client code will restart the client; editing the server code will restart the server

The client app will be running at `http://localhost:42000`.

The server will be running at `http://localhost:9100`.

## Running the Tests

### All tests

```bash
npm run test:full
```

Run this from the root directory to run integration and component tests for both the client and server.

### End-to-end tests

We use [Cypress](https://www.cypress.io/) to perform client-server integration tests. Cypress manipulates our client, checking that calling the server's API renders the correct components.

If the app is already running, run these tests via the following command:

```bash
# With Cypress UI
npm run cypress:open

# Without Cypress UI, in command line
npm run cypress:run
```

If the app is not already running, use the following command to start the app, run the integration tests, then clean up:

```bash
npm run test:integration
```

### Component tests

These do not require the app to be running.

#### Client

We use [Jest](https://jestjs.io/) to test that the client's components render correctly.

```bash
cd client

# Run all component tests
jest

# Run all component tests in watch mode
jest --watch
```

#### Server

We use [Mocha](https://mochajs.org/) to test our server's APIs.

```bash
cd server

# Run all API tests
npm test

# Run all API tests and generate coverage report
npm run test:coverage
```

## Deploying the app

### To IBM Cloud Foundry

1. Set up your [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry) account.
2. In `client/config/index.js`, set the cloud config to your Cloud Foundry address.
3. Deploy using `npm run deploy:cloud` then update using `npm run deploy:cloud:update`

## Acknowledgments

- Card deck design based on [Sarah Kuehnle's React Card Deck codepen](https://codepen.io/ursooperduper/pen/EXWxdW)
- Inspired by many people and sources on the internet
