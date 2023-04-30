const express = require("express");
const session = require("express-session");
const app = express();

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./passport-middleware");
app.use(passport.initialize());
app.use(passport.session());

const database = require("./fake-db");

app.set("view engine", "ejs");
app.use("/styles", express.static(__dirname + "/styles"));
app.use(express.static("static"));
app.use(express.urlencoded({ extended: true }));

const home = require("./routes/home");
const feedsFunctions = require("./routes/feedsFunctions");
const profileFunctions = require("./routes/profileFunctions");
const authFunctions = require("./routes/authFunctions");

app.use("/", home);
app.use("/feeds", feedsFunctions);
app.use("/profile", profileFunctions);
app.use("/auth", authFunctions);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});



const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
