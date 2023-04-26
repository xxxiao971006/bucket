const express = require("express");
const router = express.Router();
const database = require("../fake-db");

router.get("/", (req, res) => {
  // console.log("Rendering profile.ejs"); // for debugging
  const username = "@samsmith";
  const user = database.getUserByUsername(username);
  if (!user) {
    return res.status(404).send("User not found");
  }
  const messages = user.message.map((messageId) => database.getMessageById(messageId));
  res.render("profile", {
    user: user,
    messages: messages,
    database: database
   });
});

module.exports = router;

