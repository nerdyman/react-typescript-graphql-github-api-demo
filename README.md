# React TypeScript GraphQL Github API Demo

[![CircleCI](https://circleci.com/gh/nerdyman/react-typescript-graphql-github-api-demo.svg?style=svg)](https://circleci.com/gh/nerdyman/react-typescript-graphql-github-api-demo)

## Scripts

- ### `yarn bootstrap` <sup>(development|production)</sup>
  -  Copy `.env.example` to `.env`
- ### `yarn codegen` <sup>(development)</sup>
  -  Run `graphql-codegen` on `API_ENDPOINT` defined in `.env`
- ### `yarn build` <sup>(production)</sup>
  -  Production build
- ### `yarn serve` <sup>(development)</sup>
  -  Serve local build
- ### `yarn start` <sup>(development)</sup>
  -  Start developer build
- ### `yarn test` <sup>(development|production)</sup>
  -  Run tests

## TODO

- Add serviceworker for offline
- Inline critical CSS into `head` in production build
- Continuous deployment
- Make it look pretty
- Add logging service
- Add robust tests
- Fix linter warnings
- Handle no repositories
- Fix onclick event handler in SharedListingItem
