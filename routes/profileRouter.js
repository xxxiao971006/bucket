const express = require("express");
const router = express.Router();
const {
  getUserFeed,
  addNewMessage,
  showBuckets,
  getUserByUserId,
  getAllMessage
} = require("../fake-db");
const bodyParser = require("body-parser");

router.use(bodyParser.urlencoded({ extended: false }));

const { ensureAuthenticated } = require("../middleware");
router.use(ensureAuthenticated);

router.get("/", async (req, res) => {
  const user_id = req.user.id;
  const data = await getAllMessage(user_id);
  const user = await getUserByUserId(user_id);
  const totalBucketTitle = await showBuckets("all", req.user.id);
  res.render("profile", { data, user, totalBucketTitle });
});

router.post("/", async (req, res) => {
  const { bucket_id, newMessage } = req.body;
  await addNewMessage(newMessage, bucket_id);
  res.redirect("/profile/");
});

router.get("/edit", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  // const totalBucketTitle = showBuckets("all", req.user);
  res.render("editProfile", { data });
});

router.get("/settings", (req, res) => {
  const user_id = req.user.id;
  const data = getUserFeed(user_id);
  res.render("settings", { data });
});

module.exports = router;
