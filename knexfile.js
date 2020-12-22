// Update with your config settings.
require("dotenv").config();
module.exports = {
  development: {
    client: "postgresql",
    connection: {
      host: "localhost",
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER_PW,
      database: process.env.POSTGRES_DATABASE
    }
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tablename: "knex_migrations",
      directory: "./migrations"
    }
  }
};
