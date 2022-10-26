# Development

This document describes the process for setting up this package on your local computer.

## Prerequisites

This package is for Node.js.

You can install Node.js [here](https://nodejs.org/en/), or if you are using Chocolatey run `choco install nodejs`.

It runs on MacOS, Windows, and Linux environments.

It runs on many versions of Node.js, tested back to version 14.x.

## Linting

ESLint is used for Typescript linting. To lint the Typescript code, run `npm run lint`. To only lint for errors (excluding warnings), run `npm run lint-errors-only`.

## Building

To build all of the Typescript code, run `npm run build-ts`.

To build the Typescript code that is published to npm, run `npm run build-ts-dist`.

## Miscellaneous Scripts

`npm run check` - Useful to run before committing to check the full validity of a change. This runs linting, Typescript build.

## Pull Requests

Pull requests automatically run a CI pipeline that checks various criteria:

* Linting
* Typescript build

These must pass for a pull request to be approved and merged.

## NPM Publishing

Run `npm run check` to check local validity of code.

Run `npm run build-ts-dist` to build the Typescript code to produce the Javascript code that is published to npm.

Run `npm publish` to publish to npm.