const express = require("express");
const app = express();
const home = require("./routes/home");
const feeds = require("./routes/feeds");
const createPost = require("./routes/createPost");
const deletePost = require("./routes/deletePost");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
