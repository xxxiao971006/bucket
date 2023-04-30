const express = require("express");
const router = express.Router();
const {
  createNewBucket,
  buckets,
  getUserFeed,
  getFriendsFeed,
} = require("../fake-db");

const { ensureAuthenticated } = require("../middleware");

router.use(ensureAuthenticated);
router.get("/home", (req, res) => {
  // console.log("Rendering mainfeedUser.ejs");
  const user_id = req.user.id;
  const currentUser = req.user;
  const data = getUserFeed(user_id);
  res.render("mainfeedUser", { data, currentUser });
});

router.get("/friendspost", (req, res) => {
  const user_id = req.user.id;
  console.log("Rendering friendspost.ejs"); // for debugging
  const feed = getFriendsFeed(user_id);
  res.render("mainfeedFriends", { feed });
});

router.get("/createBucket", (req, res) => {
  const data = buckets;
  const bucketlists = data.map((bucket) => {
    return bucket.title;
  });
  res.render("createBucket", { bucketlists });
});

router.get("/createMessage", (req, res) => {
  const bucketTitle = req.query.bucket;
  res.render("createMessage", { bucketTitle });
});

router.post("/createMessage", (req, res) => {
  const user_id = req.user.id;
  const { newMessage, bucketTitle } = req.body;
  createNewBucket(user_id, bucketTitle, newMessage);
  res.redirect("/feeds/home");
});

module.exports = router;
