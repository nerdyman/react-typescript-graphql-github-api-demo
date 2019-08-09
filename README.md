# React TypeScript GraphQL Github API Demo

[![CircleCI](https://circleci.com/gh/nerdyman/react-typescript-graphql-github-api-demo.svg?style=svg)](https://circleci.com/gh/nerdyman/react-typescript-graphql-github-api-demo)

React + TypeScript app demo using the GitHub V4 GraphQL API.

## Features

- Configurable ([`.env`](./.env.example))
- Offline caching ([offline-plugin](<https://github.com/NekR/offline-plugin>))
- Continuous integration (CircleCI)
- Continuous deployment (netlify)
- Optimized
  - Embedded critical CSS
  - Lazy loaded components

## Set up

You will need to generate a personal access token to connect to the GitHub GraphQL API.

To do this navigate to [https://github.com/settings/tokens/new](<https://github.com/settings/tokens/new>) and select the following options:

- repo
  - repo:status
  - repo_deployment
  - public_repo
  - repo:invite
admin:org
  - read:org
admin:public_key
  - read:public_key
- notifications
- user
  - read:user
  - user:email
  - user:follow
admin:gpg_key:
  - read:gpg_key

Then run `yarn bootstrap` and add your token to the `API_AUTH_TOKEN` environment
variable in `.env`.

To test the service worker and offline functionality you may want to use [ngrok](<https://ngrok.com/>) and use the HTTPS endpoint provided.

## Scripts

| Script               | Description                | Environment  |
|----------------------|----------------------------|-----------------------------|
| `yarn bootstrap`     | Set-up app config files    | `development`, `production` |
| `yarn codegen`       | Run `graphql-codegen` on `API_ENDPOINT` defined in `.env` | `development` |
| `yarn bootstrap`     | Production build    | `production` |
| `yarn serve`         | Serve local build    | `development` |
| `yarn start`         | Run development build    | `development` |
| `yarn test`          | Run tests    | `development`, `production` |
| `yarn docker:bootstrap` | Run `bootstrap` using docker | `development` |
| `yarn docker:build` | Run `build` using docker | `development` |
| `yarn docker:start` | Run `start` using docker | `development` |
| `yarn docker:test` | Run `test` using docker | `development` |

## Tools and libraries

- [GraphQL Code Generator](<https://github.com/dotansimha/graphql-code-generator>)
- [Emotion](<https://github.com/emotion-js/emotion>)
- [Styled System](<https://github.com/styled-system/styled-system>)

## TODO

- Implement continuous deployment
- Add codecov
- Add robust tests
- Add reconciliation for allow for fetch more
- Suggest repos when none are found
- Optimise hooks
- Add logging service
- Fix linter warnings
- Add initial loading screen
- Use intersection observer for loading more results
- Support GitHub app auth
- Make `RepositoryItem` and `RepositoryDetail` components generic
- Replace emojis with icons
- Legacy browser testing
- Use import aliases to avoid `..` relative imports
