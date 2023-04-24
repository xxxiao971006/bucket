const express = require("express");
const bodyParser = require("body-parser");
const app = express();
add-login-functionality
const database = require("./fake-db");
=======
const home = require("./routes/home");
const feeds = require("./routes/feeds");
const createPost = require("./routes/createPost");
const deletePost = require("./routes/deletePost");


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.render("index.ejs", {
    numberOfItterations: 50,
  });
});

//app login part
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  let givenUsername = req.body.username;
  let givenPassword = req.body.password;
  if (!givenUsername || !givenPassword) {
    res.redirect("/login");
  } else {
    let foundUser = database.getUserByUsername(givenUsername);
    if (foundUser && foundUser.password === givenPassword) {
      res.cookie("whoami", givenUsername, { signed: true });
      console.log(`login attempt from user ${givenUsername}, SUCCESS`);
      res.redirect("/");
    } else {
      console.log(
        `login attempt from user ${givenUsername}, failure, might be a hacker`
      );
      res.redirect("/login");
    }
  }
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

app.use("/", home); // Add this line back
app.use("/feeds", feeds);
app.use("/createPost", createPost);
app.use("/deletePost", deletePost);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
