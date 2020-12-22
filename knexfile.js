// Update with your config settings.

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      database: process.env.POSTGRES_DATABASE,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_USER_PW
    }
  }
};
