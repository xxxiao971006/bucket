const express = require("express");
const router = express.Router();
// const {} = require("../fake-db");

const { bucket } = require('../prisma/client');

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

const { ensureAuthenticated } = require("../middleware");
router.use(ensureAuthenticated);

router.get("/", (req, res) => {
  res.render("search");
})


module.exports = router;