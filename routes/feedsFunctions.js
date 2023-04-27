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

router.get("/", (req, res) => {
  const feeds = database.getFeeds();
  res.render("feeds.ejs", {
    feeds,
  });
});

//Showing all User(only)'s posts
router.get("/home", (req, res) => {
  const data = getUserFeed("1");
  res.render("home-feed-foryou", { data });
});

//Showing all User's friends' posts
router.get("/friendspost", (req, res) => {
  const feed = getFriendsFeed("1");
  res.render("friendspost", { feed });
});

router.get("/createPost", (req, res) => {
  res.render("createPost");
});

//CREATE NEW BUCKET ROUTES:
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



// router.post("/:id/delete", (req, res) => {
//   const id = +req.params.id;
//   database.deleteFeed(id);

//   res.redirect("/feeds");
// });

// router.get("/:id", (req, res) => {
//   const id = +req.params.id;
//   const feed = database.getFeed(id);
//   if (!feed) {
//     res.status(404).render("feed404.ejs");
//     return;
//   }
//   res.render("singleFeed.ejs", {
//     feed,
//   });
// });

// router.post("/", (req, res) => {
//   const data = req.body;
//   database.addFeed(data);

//   res.redirect("/feeds");
// });

module.exports = router;
