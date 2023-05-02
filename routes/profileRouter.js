const express = require("express");
const router = express.Router();
const { getUserFeed, createNewBucket, showBuckets,  getUserByUserId}  = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

const { ensureAuthenticated } = require("../middleware");

router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  const netBucket = showBuckets("all", req.user).length;
  res.render("profile", { data, netBucket});
});

router.post("/", (req, res) => {
  const { newMessage, bucket } = req.body;
  const user_id = req.user.id;
  // console.log(newMessage);
  createNewBucket(user_id, bucket, newMessage);
  res.redirect("/profile/");
});


router.get("/edit", (req, res) => {
  const user_id = req.user.id;
  const user =  getUserByUserId(user_id);
  res.render("editProfile", { user });
});


module.exports = router;
