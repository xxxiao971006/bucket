const express = require("express");
const router = express.Router();
const database = require("../fake-db");


router.get("/", (req, res) => {
    // console.log("Rendering profile.ejs"); // for debugging
    const username = "@samsmith";
    const user = database.getUserByUsername(username);
    let messages = [];
    if (Array.isArray(user.message)) {
      messages = user.message.map((messageId) => database.getMessageById(messageId));
    }
    res.render("profile", {
      user: user,
      messages: messages,
      locals: { database: database }
    });    
  });
  module.exports = router;