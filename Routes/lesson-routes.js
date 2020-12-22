const express = require("express");
const Lessons = require("../models/dbHelpers");
const LessonsID = require("../Routes/lessonid-routes");

const router = express.Router();

router.use("/:id", LessonsID);

router.post("/", (req, res) => {
  Lessons.add(req.body)
    .then(lesson => {
      res.status(200).json(lesson);
    })
    .catch(error => {
      res.status(500).json({ message: "cannot add lesson" });
    });
});

router.get("/", (req, res) => {
  Lessons.find()
    .then(lessons => {
      res.status(200).json(lessons);
    })
    .catch(lessons => {
      res.status(500).json({ message: "Unable to retrieve lessons" });
    });
});

module.exports = router;
