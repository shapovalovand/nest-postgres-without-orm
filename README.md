## Description

This is a tutorial project. 

## Development requirement:
* subd: Postgres 9+
* without using ORM libraries (pure sql)

## Stack: 
* nestJS
* postgresql
* docker-compose

## Installation

```bash
$ npm install
```

## Running the app

```bash
# up database container
$ docker-compose up

# stop database container
$ docker-compose down -v

# run server
$ nest start

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```