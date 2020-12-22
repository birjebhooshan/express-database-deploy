const express = require("express");
const MessageRouter = require("../Routes/message-routes");
const LessonRouter = require("../Routes/lesson-routes");

const server = express();
server.use(express.json());

server.get("/", (req, res) => {
  res.json("Hello darkness my old friend");
});

server.use("/api/lessons", LessonRouter);
server.use("/api/messages", MessageRouter);

module.exports = server;
