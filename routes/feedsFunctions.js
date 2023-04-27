const express = require("express");
const router = express.Router();
const { getUserFeed, getFriendsFeed } = require("../fake-db");




//Showing all User(only)'s posts
router.get("/home", (req, res) => {
  console.log("Rendering home-feed-foryou.ejs"); // for debugging
  const data = getUserFeed("1");
  res.render("home-feed-foryou", { data });
});



//Showing all User's friends' posts
router.get("/friendspost", (req, res) => {
  console.log("Rendering friendspost.ejs"); // for debugging
  const feed = getFriendsFeed("1");
  res.render("friendspost", { feed });
});




module.exports = router;
