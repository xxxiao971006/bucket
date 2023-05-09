const express = require("express");
const router = express.Router();
const {
  getUserFeed,
  createNewBucket,
  showBuckets,
  getUserByUserId,
} = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

const { ensureAuthenticated } = require("../middleware");

router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  const totalBucketTitle = showBuckets("all", req.user);
  res.render("profile", { data, totalBucketTitle });
});

router.post("/", (req, res) => {
  // console.log(req.body);
  const { newMessage, bucket } = req.body;
  const user_id = req.user.id;
  createNewBucket(user_id, bucket, newMessage);
  res.redirect("/profile/");
});

router.get("/edit", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  // const totalBucketTitle = showBuckets("all", req.user);
  res.render("editProfile", { data });
});

router.get("/settings", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  res.render("settings", { data });
});

module.exports = router;
