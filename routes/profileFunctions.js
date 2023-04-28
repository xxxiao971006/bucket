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
  const { newMessage, bucket } = req.body;
  console.log(newMessage);
  console.log(bucket);
  const data = getUserFeed("1");
  res.render("profile", { data });
});

module.exports = router;
