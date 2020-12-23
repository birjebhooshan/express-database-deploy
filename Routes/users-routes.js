const express = require("express");
const bcrypt = require("bcryptjs");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.post("/login", (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    res.status(400).json({ message: "Both username and password required" });
  }

  Lessons.findUserByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ Message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ Message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post("/register", (req, res) => {
  const credentials = req.body;
  const { username, password } = credentials;

  if (!(username && password)) {
    res.status(400).json({ message: "Both username and password required" });
  }

  const hash = bcrypt.hashSync(credentials.password, 12);
  credentials.password = hash;

  Lessons.addUser(credentials)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      if (error.errno == 19) {
        //when conflict in sql constraint eg. Unique field, error no is 19.
        res.status(400).json({ Message: "Username already taken" });
      } else {
        res.status(500).json(error);
      }
    });
});

router.get("/", (req, res) => {
  Lessons.findAllUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(error => {
      res.status(500).json({ message: "unable to retrieve users" });
    });
});

router.get("/:username", (req, res) => {
  const { username } = req.params;
  Lessons.findUserByUsername(username)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
