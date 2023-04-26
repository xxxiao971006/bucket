const express = require("express");
const app = express();
const home = require("./routes/home");
const feedsFunctions = require("./routes/feedsFunctions");
const database = require("./database");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", home);
app.use("/feeds", feedsFunctions);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
