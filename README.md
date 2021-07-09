# bc-cms-prototype

A React, Node.js/Express, and PostgreSQL application. The production environment is assumed to be Heroku.


## Local application setup

Clone this repository and install dependencies with: `npm i`

Run in development mode with: `npm run start:dev`


## Database setup for local development

PostgreSQL is used for data persistence through the `pg` package. Install [PostgreSQL](https://www.postgresql.org/) locally as desired, and then follow the instructions below to create an empty database that we will later seed.

1. Open the `psql` shell using the superuser and default database:

```sh
psql -d postgres
```

2. In `psql`, create the database user that will be used to create and access the database. The username and password you select should be saved in the environment variables `DB_USER` and `DB_PASSWORD` in `./.env`.

```sql
CREATE ROLE cms_user WITH LOGIN PASSWORD 'password';
ALTER ROLE cms_user CREATEDB;
```

3. Exit `psql`, and open the shell again using the newly created user:

```sh
\q
psql -d postgres -U cms_user
```

4. Create the new database. The database name should be saved in the environment variable `DB_DATABASE` in `./.env`.

```sql
CREATE DATABASE cms;
```


## Initial data seeding

[Knex.js](https://knexjs.org/#Migrations) is used as a SQL query builder, and for creating migrations and seeds. Migrations are written to be able to roll back or forward, dropping or creating tables.

To make migration or seed files while developing locally, `knex` must be installed globally: `npm install -g knex`

`knex` will look for configuration information in `./knexfile.js`. This project saves migrations and seeds in directories within `./db`.

### Run migrations

Forward to the latest configuration:

```sh
knex migrate:latest
```

Roll back the last migration:

```sh
knex migrate:rollback
```

Roll back all migrations:

```sh
knex migrate:rollback --all
```

### Create a new migration file

Create a new migration file with the slug `create_pages_table` in the file name:

```sh
knex migrate:make create_pages_table
```

### Run seeds

```sh
knex seed:run
```

### Create a new seed file

Create a new seed file with the slug `add_hello_world_page` in the file name:

```sh
knex seed:make add_hello_world_page
```


## Remote database usage

This project assumes a deployment on Heroku, but can be used anywhere. Note that the reference to `process.env.DATABASE_URL` in `production` node of `./knexfile.js` assumes that this environment variable will be available as it is on Heroku.
