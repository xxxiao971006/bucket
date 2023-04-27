const express = require("express");
const app = express();
const home = require("./routes/home");
const feedsFunctions = require("./routes/feedsFunctions");
const profileFunctions = require("./routes/profileFunctions");
const database = require("./fake-db");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/styles", express.static(__dirname + "/styles"));

app.use("/", home);
app.use("/feeds", feedsFunctions); 
app.use("/profile", profileFunctions);


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});


app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/logout", (req, res) => {
  res.render("logout");
});


const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});