const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../middleware");

router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  res.send("This page is not yet set up");
});
