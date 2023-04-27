const express = require("express");
const router = express.Router();
const {getUserFeed, getMessageByMessageId, getUsernameById, getUserInfoByUsername} = require("../fake-db");

router.get("/", (req, res) => {
  // console.log("Rendering profile.ejs"); // for debugging
  const data = getUserFeed("1");
  res.render("profile", { data });

});

module.exports = router;

/*
<user.message.forEach((messageId) => { %>
  <% const message = database.getMessageById(messageId); %>
  <% if (message) { %>
    <div class="post">
      <h3><%= user.username %></h3>
      <p><%= message.message %></p>
      <div class="post-actions">
        <button class="like-button" data-message-id="<%= message.id %>">
          <i class="fas fa-heart"></i>
          <% if (message.likes) { %>
            <span class="likes-count"><%= message.likes %></span>
          <% } %>
        </button>
        <button class="comment-button">
          <i class="fas fa-comment"></i>
          <% if (message.comments && message.comments.length) { %>
            <span class="comments-count"><%= message.comments.length %></span>
          <% } %>
        </button>
      </div>
    </div>
  <% } %>
<% }) %>
*/