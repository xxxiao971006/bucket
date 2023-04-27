const express = require("express");
const router = express.Router();
const {getUserFeed} = require("../fake-db");

router.get("/", (req, res) => {
  const data = getUserFeed("1");
  res.render("profile", { data });

});

module.exports = router;
