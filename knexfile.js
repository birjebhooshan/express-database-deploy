// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER_PW
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
