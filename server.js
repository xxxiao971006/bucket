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

//app login part
// app.get("/login", (req, res) => {
//   res.render("login");
// });

// app.post("/login", (req, res) => {
//   let givenUsername = req.body.username;
//   let givenPassword = req.body.password;
//   if (!givenUsername || !givenPassword) {
//     res.redirect("/login");
//   } else {
//     let foundUser = database.getUserByUsername(givenUsername);
//     if (foundUser && foundUser.password === givenPassword) {
//       res.cookie("whoami", givenUsername, { signed: true });
//       console.log(`login attempt from user ${givenUsername}, SUCCESS`);
//       res.redirect("/");
//     } else {
//       console.log(
//         `login attempt from user ${givenUsername}, failure, might be a hacker`
//       );
//       res.redirect("/login");
//     }
//   }
// });


const port = 8000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
