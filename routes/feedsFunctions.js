const express = require("express");
const router = express.Router();
const {
  createNewBucket,
  buckets,
  getUserFeed,
  getFriendsFeed,
} = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

router.get("/home", (req, res) => {
  console.log("Rendering home-feed-foryou.ejs"); // for debugging
  const data = getUserFeed("1");
  res.render("home-feed-foryou", { data });
});

router.get("/friendspost", (req, res) => {
  console.log("Rendering friendspost.ejs"); // for debugging
  const feed = getFriendsFeed("1");
  res.render("friendspost", { feed });
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
  //HARD CODE USER_ID -- fix it later!
  const user_id = 1;
  const { newMessage, bucketTitle } = req.body;
  createNewBucket(1, bucketTitle, newMessage);
  res.redirect("/feeds/home");
});

module.exports = router;
