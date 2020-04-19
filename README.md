# BGPG (Board Game Playground)

BGPG is a web-based online board game sandbox. The main idea behind
this project is to have an online platform to play any board game with friends.
BGPG gives to you all the stuff to start playing just you would in reality, but it only understands some common dynamics on board games but doesn't implement any game rules.

There is an online version of the project running at https://bgpg.herokuapp.com

## Packages

The entire project is developed using TypesScript and is divided in two applications:

| App      | Package               | Description                                    |
| -------- | --------------------- | ---------------------------------------------- |
| Frontend | @mimopo/bgpg-frontend | An Angular SPA application                     |
| Backend  | @mimopo/bgpg-backend  | A NestJS application using Express & Socket.io |

## Project structure

This is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) managed with [rush](https://rushjs.io/).

The main parts are:

| File/Folder         | Description                       |
| ------------------- | --------------------------------- |
| /backend            | NestJS application                |
| /common             | Common parts between applications |
| /docker             | Docker build tasks                |
| /frontend           | Angular application               |
| /docker-compose.yml | Docker Compose servers stack      |
| /rush.json          | Rush config file                  |

## Running your private BGPG server

You can run a private BGPG server using Docker (Docker Hub images coming soon).

> :warning: **This project is in an early stage, many changes are coming so we can't guarantee the backward compatibility.**

Just follow these steps:

0. Install Rush:
   ```
   npm install -g @microsoft/rush
   ```
1. Clone the project:
   ```
   git clone git@github.com:mimopo/bgpg.git
   ```
2. Get inside:
   ```
   cd bgpg
   ```
3. Install dependencies:
   ```
   rush update
   ```
4. Build Apps & Docker image:
   ```
   rush build
   ```
5. Use the provided `docker-compose.yml` file to run the BGPG and MongoDB servers:
   ```
   docker-compose up
   ```
