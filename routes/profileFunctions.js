const express = require("express");
const router = express.Router();
const { getUserFeed, createNewBucket } = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  // console.log(data);
  res.render("profile", { data });
});

router.post("/", (req, res) => {
  const { newMessage, bucket } = req.body;
  const user_id = req.user.id;
  // console.log(newMessage);
  createNewBucket(user_id, bucket, newMessage);
  res.redirect("/profile/");
});

module.exports = router;
