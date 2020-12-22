const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router({ mergeParams: true });
//mergeParams:true, if you want to use the dynamic parameter from the
//parent router then you've to use this.

router.post("/", (req, res) => {
  const { id } = req.params;
  const msg = req.body;

  if (!msg.lesson_id) {
    msg["lesson_id"] = parseInt(id, 10);
  }

  Lessons.findById(id)
    .then(lesson => {
      if (!lesson) {
        res.status(404).json({ message: "Invalid id" });
      }
      // Check for all required fields
      if (!msg.sender || !msg.text) {
        res
          .status(400)
          .json({ message: "Must provide both Sender and Text values" });
      } else {
        Lessons.addMessage(msg, id)
          .then(message => {
            if (message) {
              res.status(200).json(message);
            }
          })
          .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Failed to add message" });
          });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Error finding lesson" });
    });
});

router.get("/", (req, res) => {
  const { id } = req.params;
  Lessons.findLessonMessages(id)
    .then(messages => {
      if (messages) {
        res.status(200).json(messages);
      } else {
        res.status(404).json({ message: "No messages for the given id" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ error: "Couldn't retrieve messages" });
    });
});

module.exports = router;
