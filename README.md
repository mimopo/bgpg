# BGPG (Board Game Playground)

BGPG is a web-based online board game sandbox. The main idea behind this project is to have an online platform to play any board game with friends.
BGPG gives to you all the stuff to start playing just you would in reality, it only understands some common dynamics on board games but doesn't implement any game rules.

There is an online version of the project running at https://bgpg.herokuapp.com

## Packages

The entire project is developed using TypesScript and is divided in two applications:

| App      | Package               | Description                                    |
| -------- | --------------------- | ---------------------------------------------- |
| Frontend | @mimopo/bgpg-frontend | An Angular SPA application                     |
| Backend  | @mimopo/bgpg-backend  | A NestJS application using Express & Socket.io |

## Project structure

The main parts are:

| File/Folder         | Description                       |
| ------------------- | --------------------------------- |
| /backend            | NestJS application                |
| /common             | Common parts between applications |
| /docker             | Docker build tasks                |
| /frontend           | Angular application               |
| /docker-compose.yml | Docker Compose servers stack      |
| /rush.json          | Rush config file                  |

## Running development server

TODO

## Running your private BGPG server

You can run a private BGPG server using Docker (Docker Hub images coming soon).

> :warning: **This project is in an early stage, many changes are coming so we can't guarantee the backward compatibility.**

Just follow these steps:

TODO

## Development Environment

This project comes with VSCode configurations. Please, enable the recommended extensions to get full advantages.

### VSCode doesn't run eslint on backend files

You have to approve the ESLint execution, just open the command palette and run "ESLint: Manage Library Execution". More info at
https://github.com/microsoft/vscode-eslint#version-2110

## License

BGPG project is open source and licensed under [AGPL-3.0](LICENSE) license.
