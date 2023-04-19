const express = require("express");
const app = express();
const database = require("./database");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    numberOfItterations: 50,
  });
});

app.get("/feeds", (req, res) => {
  const feeds = database.getFeeds();
  res.render("feeds.ejs", {
    feeds,
  });
});

app.get("/feeds/:id", (req, res) => {
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

app.get("/createPost", (req, res) => {
  res.render("createPost.ejs");
});

app.post("/feeds", (req, res) => {
  const data = req.body;
  database.addFeed(data);

  res.redirect("/feeds");
});

app.post("/feeds/:id/delete", (req, res) => {
  const id = +req.params.id;
  database.deleteFeed(id);

  res.redirect("/feeds");
});

app.use(express.static("public"));

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
