const express = require("express");
const router = express.Router();
const database = require("../database");

router.get("/", (req, res) => {
  const feeds = database.getFeeds();
  res.render("feeds.ejs", {
    feeds,
  });
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
