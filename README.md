# Node React Starter App

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- [Running the Tests](#running-the-tests)
- [Deploying the App](#deploying-the-app)
- [Acknowledgments](#acknowledgments)

## Overview

This is a starter web app I've put together from what I think is currently a good setup.
- Node.js backend
- React frontend
- Integration, component and unit tests setup
- OpenAPI 3 spec
- Eslint
- VSCode debugger
- Husky git hooks
- Ready to deploy to cloud (IBM Cloud Foundry)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

[Download Node.js v8 or above](https://github.com/nodejs/node#download)

### Installing

Clone the repo

```bash
git clone git@github.com:rwalle61/nodeReactStarterApp.git
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

The client app will be running at `http://localhost:3000`.

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

### Locally (for accessing the client site on the same computer)

1. Set up a [Cloudant database on IBM Cloud](https://cloud.ibm.com/catalog/services/cloudant), or run a local instance of  [Apache CouchDB](http://docs.couchdb.org/en/stable/install/mac.html).
2. In `server/config/index.js`, set where your database is located. (If it is located on the cloud, ensure you have specified your login details in `server/config/index.js` or a `.env` file).
3. Run `npm run deploy:local`

### Local network (for accessing the client site on nearby devices, without a Wi-Fi connection)

1. Run a local instance of [Apache CouchDB](http://docs.couchdb.org/en/stable/install/mac.html).
2. In `server/config/index.js`, set that your database is located locally.
3. Run `npm run deploy:local-network`
4. Create a local network by (on Mac) going to `Wi-Fi settings` and selecting `Create Network`.
5. In `client/config/index.js`, set your `origin` to your computer's Private IP address (e.g. 192.168.0.0). (On Mac, go to `System Preferences` -> `Network` -> `Wi-Fi`).
6. On nearby internet-enabled devices, open the `available networks` settings page. The local network you created should appear here. Connect to it.
7. The app should now be accessible at (e.g.) `http://192.168.0.0:9100`

### To IBM Cloud Foundry (for accessing the client site on any internet device connected to the internet)

1. Set up your [IBM Cloud Foundry](https://www.ibm.com/cloud/cloud-foundry) account.
2. In `client/config/index.js`, set the cloud config to your Cloud Foundry address.
3. Set up a [Cloudant database on IBM Cloud](https://cloud.ibm.com/catalog/services/cloudant).
4. In `server/config/index.js`, set that your database is located on the cloud. Ensure you have specified your login details in `server/config/index.js` or a `.env` file.
5. `npm run deploy:cloud`

## Acknowledgments

- Inspired by many people and sources on the internet
