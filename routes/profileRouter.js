const express = require("express");
const router = express.Router();
const {
  getUserFeed,
  addNewMessage,
  showBuckets,
  getUserByUserId,
  getAllMessage,
  getAllComments,
  getMessagesByMessageId,
  commentMessage,
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

router.get("/comment/:messageId", async ( req, res ) => {
  const messageId = req.params.messageId;
  const message_id = Number(messageId);
  // const user_id = req.user.id;
  const comments = await getAllComments(message_id);
  const message = await getMessagesByMessageId(message_id);

  const modifiedComments = await Promise.all(comments.map(async (comment) =>  { 
    const commentor = await getUserByUserId(comment.userId);
    const commentorName = commentor.username;
    const commentorProfile = commentor.profileImg;
    return {
    id: comment.id,
    comment: comment.content,
    messageId: comment.messageId,
    username: commentorName,
    userProfile: commentorProfile,
    createdAt: comment.createdAt
  }}));
  res.render("comment", {comments: modifiedComments, message});
});

router.post("/comment/:messageId", async ( req, res ) => {
  const user_id = req.user.id;
  const message_id = req.params.messageId;
  const messageId = Number(message_id);
  const {newComment} = req.body;
  const comment = await commentMessage(newComment, messageId, user_id);
  res.redirect(`/profile/comment/${message_id}`);
})


module.exports = router;
