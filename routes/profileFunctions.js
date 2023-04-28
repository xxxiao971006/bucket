const express = require("express");
const router = express.Router();
const { getUserFeed } = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  const data = getUserFeed("1");
  res.render("profile", { data });
});

router.post("/", (req, res) => {
  const { newMessage } = req.body;
  console.log(newMessage);
  const data = getUserFeed("1");
  res.render("profile", { data });
});

module.exports = router;
