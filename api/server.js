const express = require("express");
const MessageRouter = require("../Routes/message-routes");
const LessonRouter = require("../Routes/lesson-routes");
const UserRouter = require("../Routes/users-routes");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json("Hello darkness my old friend");
});

server.use("/api/lessons", LessonRouter);
server.use("/api/messages", MessageRouter);
server.use("/api/users", UserRouter);

module.exports = server;
