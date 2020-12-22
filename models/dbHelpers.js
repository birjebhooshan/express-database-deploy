//we write knex queries here.
// const knex = require("knex");
// const config = require("../knexfile");
// const db = knex(config.development);

//we used dbConfig file to as the middleware between dbHelpers and .knexfile
//so we now don't need lines 2,3,4.

const db = require("../dbConfig");

module.exports = {
  add,
  find,
  findById,
  remove,
  update,
  addMessage,
  findMessageById,
  findMessage,
  findLessonMessages,
  removeMessages,
  updateMessages
};

async function add(lesson) {
  return await db("lessons").insert(lesson, ["id", "name"]);
  //this["id", "name"] is specific to postgres.
  //this is what the insert statement will return
}

function find() {
  return db("lessons");
}

function findById(id) {
  return db("lessons").where({ id }).first();
}

function remove(id) {
  return db("lessons").where({ id }).del();
}

function update(id, changes) {
  return db("lessons")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}

function findMessageById(id) {
  return db("messages").where({ id }).first();
}

async function addMessage(message, lesson_id) {
  return await db("messages").where({ lesson_id }).insert(message, ["id"]);
}

function findMessage() {
  return db("messages");
}

function findLessonMessages(lesson_id) {
  return db("lessons as l")
    .join("messages as m", "l.id", "m.lesson_id")
    .select(
      "l.id as LessonID",
      "l.name as LessonName",
      "m.id as MessageID",
      "m.sender",
      "m.text"
    )
    .where({ lesson_id });
}

function removeMessages(id) {
  return db("messages").where({ id }).del();
}

function updateMessages(id, changes) {
  return db("messages")
    .where({ id })
    .update(changes)
    .then(() => {
      return findMessageById(id);
    });
}

function update(id, changes) {
  return db("lessons")
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id);
    });
}
