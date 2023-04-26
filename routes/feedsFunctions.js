const express = require("express");
const router = express.Router();
const { getUserFeed, getFriendsFeed } = require("../fake-db");

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

router.get("/createPost", (req, res) => {
  res.render("createPost.ejs");}
);

//Showing all User's friends' posts
router.get("/friendspost", (req, res) => {
  const feed = getFriendsFeed("1");
  res.render("friendspost", { feed });
});


router.get("/createPost", (req, res) => {
  res.render("createPost.ejs"); 
});

router.post("/:id/delete", (req, res) => {
  const id = +req.params.id;
  database.deleteFeed(id);

  res.redirect("/feeds");
});

router.get("/:id", (req, res) => {
  const id = +req.params.id;
  const feed = database.getFeed(id);
  if (!feed) {
    res.status(404).render("feed404.ejs");
    return;
  }
  res.render("singleFeed.ejs", {
    feed,
  });
});

router.post("/", (req, res) => {
  const data = req.body;
  database.addFeed(data);

  res.redirect("/feeds");
});

module.exports = router;
