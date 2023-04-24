const express = require("express");
const router = express.Router();
const database = require("../database");

router.post("/:id/delete", (req, res) => {
  const id = +req.params.id;
  database.deleteFeed(id);

  res.redirect("/feeds");
});

module.exports = router;
