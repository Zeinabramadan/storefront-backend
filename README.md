# Storefront Backend Project

## Table of contents

- [Getting Started](#getting-started)

### Getting Started (development Usage)

- Install the latest LTS versions of Node.js from https://nodejs.org, yarn from https://yarnpkg.com/ and PostgreSQL from https://www.postgresql.org/

- Clone the project on your machine, then from the terminal window go to the application directory then run the following command `yarn install` to install the dependencies as defined in the package.json file.

- Create a `.env` file with the following variables inside the root folder:

```
POSTGRES_HOST=localhost
POSTGRES_DB=udacitydev
POSTGRES_USER=ecommerce_admin
POSTGRES_PASSWORD=password22
POSTGRES_DB_TESTING=udacitytest
POSTGRES_USER_TESTING=ecommerce_admin
POSTGRES_PASSWORD_TESTING=password22
PORT=4000
ENV=dev
BCRYPT_PASSWORD=password
PEPPER=@dh.k094
SALT_ROUNDS=10
TOKEN_SECRET=alohomora123!
```

- Then run `yarn run dev` from root directory and it will run the server on `http://localhost:4000`.

- Database Creation

> - `CREATE DATABASE udacitydev`
> - `CREATE DATABASE udacitytest`
> - `CREATE USER ecommerce_admin WITH PASSWORD 'password22';`
> - `\c udacitydev`
> - `GRANT ALL PRIVILEGES ON DATABASE udacitydev TO ecommerce_admin;`
> - `\c udacitytest`
> - `GRANT ALL PRIVILEGES ON DATABASE udacitytest TO ecommerce_admin;`

- Database PORT `5432`
- Server PORT `4000`

- Here are the scripts needed to run migrations, tests, and linters.

```
    "dev": "nodemon --watch 'src/**/*.ts' --exec 'ts-node' src/server.ts",
    "lint": "eslint .",
    "lint:fix": "eslint --fix src",
    "format": "prettier --write 'src/**/*.ts'",
    "build": "npx tsc",
    "jasmine": "jasmine",
    "start:production": "yarn run build && node dist/index.js",
    "migrate-dev:up": "db-migrate up",
    "migrate-dev:down": "db-migrate down -c 4",
    "migrate-test:up": "db-migrate --env test up",
    "migrate-test:down": "db-migrate --env test down -c 4",
    "jasmine-test": "yarn run build && yarn run jasmine",
    "test": "export ENV=test&& yarn run migrate-test:down && yarn run migrate-test:up && yarn run jasmine-test && yarn run migrate-test:down"
```

- > Run `yarn run dev` for development usage
- > Run `yarn run lint:fix` for fixing formats warnings and errors.
- > Run `yarn run migrate-dev:up` for DB migrations for development environment.
- > Run `yarn run test` for testing the whole application.

### Application Architecture

1. **handlers** Folder contain all the APIS, there are four Handlers: Users, Orders, Products and Dashboard, includes tests files
2. **middleware** Custom middleware such as authentication.
3. **models** Folder contain all models for the app there are three models: user, order and product
4. **types** Typescript types to be placed here.
5. **utils** Contain any helper functions used throughout the application.

### Endpoints

- > [GET] http://localhost:4000/users - **Authenticated**
- > [POST] http://localhost:4000/users - **Authenticated**
- > [GET] http://localhost:4000/users/:id - **Authenticated**

- > [GET] http://localhost:4000/products
- > [GET] http://localhost:4000/products/:id
- > [GET] http://localhost:4000/products/:category
- > [POST] http://localhost:4000/products - **Authenticated**

- > [GET] http://localhost:4000/orders - **Authenticated**
- > [GET] http://localhost:4000/orders/:id - **Authenticated**
- > [POST] http://localhost:4000/orders - **Authenticated**
- > [POST] http://localhost:4000/orders/:id/products - **Authenticated**

- > [GET] http://localhost:4000/users/:id/orders - **Authenticated**
- > [GET] http://localhost:4000/products_in_orders - **Authenticated**
