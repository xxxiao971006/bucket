const express = require("express");
const router = express.Router();
const {
  createNewBucket,
  buckets,
  getUserFeed,
  getMainFeed,
  showBuckets,
} = require("../fake-db");

const { ensureAuthenticated } = require("../middleware");

router.use(ensureAuthenticated);

router.get("/home", (req, res) => {
  const user_id = req.user.id;
  const feed = getMainFeed(user_id);
  res.render("mainfeed", { feed });
});

router.get("/createBucket", (req, res) => {
  const data = buckets;
  const bucketlists = data.map((bucket) => {
    return bucket.title;
  });
  res.render("creatingNewBucket", { bucketlists });
});

router.get("/createMessage", (req, res) => {
  const bucketTitle = req.query.bucket;
  const data = getUserFeed(req.user.id);
  res.render("createMessage", { data, bucketTitle });
});

router.post("/createMessage", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  const { newMessage, bucketTitle } = req.body;
  createNewBucket(user_id, bucketTitle, newMessage);
  res.redirect("/profile");
});

router.get("/buckets", (req, res) => {
  const { show } = req.query; // "inprogress" "completed"
  const currentUser = req.user;
  const bucketTitles = showBuckets(show, currentUser);
  res.render("showBuckets", { bucketTitles });
});

module.exports = router;
