### nestjs app:  simple jwt authorization + simple CRUD with text profanity check

## Contents

1. [Requirements](#requirements)
2. [Project configuration](#project-configuration)
3. [Running the app](#running-the-app)
 
#

## Requirements

| Technology| VERSION |
| --------- | ------- |
| NodeJS    |  22.7   |
| NestJS    |  10.4.7   |
| NPM       |  10.8.2   |
| MongoDB   |  6.0    |


To change nodejs and npm version use [nvm](https://github.com/nvm-sh/nvm/blob/master/README.md).


## Project configuration

```bash
$ git clone   
 
$ cd  jwt_auth_CRUD_profanity_validation/
 
$ npm ci
```
After installing the dependencies, you should set up your project by creating a new `.env` file like `.example.env`, containing the environment variables used for development.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Code style
I use airbnb code style 

[Airbnb documentation](https://github.com/airbnb/javascript)

[npm eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)
 