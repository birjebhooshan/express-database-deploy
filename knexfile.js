module.exports = {
  client: "postgres",
  debug: false,
  connection: {
    host: process.env.POSTGRES_HOST || "localhost",
    port: process.env.POSTGRES_PORT || 5000,
    user: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_USER_PW || undefined
  }
};
