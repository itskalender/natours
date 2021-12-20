# Natours

A REST-API for a fictional company whose business is to sell and organize tours.

## API Documentation

[Here](https://documenter.getpostman.com/view/18199678/UVRAKTMb) is the link for API documentation.

## .env

An .env file should consist of:

    PORT
    NODE_ENV

    DATABASE_CONNECTION
    DATABASE_PASSWORD

    JWT_SECRET
    JWT_EXPIRES_IN
    JWT_COOKIE_EXPIRES_IN
  
    EMAIL_HOST
    EMAIL_PORT
    EMAIL_USERNAME
    EMAIL_PASSWORD

## Notes

- This project is created by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman?lang=en). I watched the course and coded along with him.

## Installation

Clone the source code:

    git clone git@github.com:toptaskalender/natours.git

Install dependencies:

    npm install

## Starting the app

- Run `npm start:dev` to start the application in development mode.
- Run `npm start:prod` to start the application in production mode.