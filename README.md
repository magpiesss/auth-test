# Authentication Test App

An app that implements a basic authentication system.
It allows users to register, login and see their details.
When they're done, it allows them to log out again.

it has been created with a react and redux front end (with typescript),
a node express back end (with typsecript), and a postgres database.

## Requirements

* Node version 20
* Postgres 16.4

## Setup

1. Set up a new postgres database using the script in the `scripts` folder. 
You will need to run the script against the postgres database for the server.
2. Create a .env file in the `auth-back-end` folder. Copy the environment variables
from the `.env.example` file in the same folder and replace as required.
3. `cd auth-back-end` and `npm install`.
4. Create a `.env` file in the `auth-front-end` folder. Copy the environment variables
from the `.env.example` file in that folder and replace as required.
5. `cd auth-front-end` and `npm install`.

## Running in dev mode

Run the back end and front end using the `npm run dev-front-end` and `npm run dev-back-end`
commands from the root directory of the app (this will require two terminal instances).

## Caveats

**Important Note:** This is an authentication test app but **I am not a cryptographer**!!

This should not be used in any production application.
I would recommend instead following the OAuth2 Authorisation code flow and use an
Authentication as a service provider.