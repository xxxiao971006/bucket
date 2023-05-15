const express = require("express");
const router = express.Router();
const {
  getUserFollowing,
  getAllTags,
  messagesByTag,
  getAllMessages,
  getMessagesofCertainBucket,
  getBucketIdByBucketTitle,
  getUserIdByBucketId,
} = require("../fake-db");
const querystring = require("querystring");

const { bucket } = require("../prisma/client");

const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: false }));

const { ensureAuthenticated } = require("../middleware");
router.use(ensureAuthenticated);

router.get("/", async (req, res) => {
  const data = await getUserFollowing(req.user.id);
  const followings = Object.values(data).flat();
  const tags = await getAllTags();
  res.render("search", { data: followings, tags });
});

router.post("/", async (req, res) => {
  const { searchInput } = req.body;

  const data = await getUserFollowing(req.user.id);
  const followings = Object.values(data).flat();
  const followingBuckets = followings.map((following) =>
    following.buckets.map((bucket) => {
      const outcome = {
        id: bucket.id,
        title: bucket.title,
      };
      return outcome;
    })
  );
  const tags = await getAllTags();
  const followingNames = followings.map((following) => {
    const outcome = { followingId: following.id, username: following.username };
    return outcome;
  });
  const followingBucketTitles = followingBuckets.flat();

  let allSimilarBucket = [];

  const matchingTag = tags.find(
    (tag) => tag.tagName.toLowerCase() === searchInput.toLowerCase()
  );
  const matchingName = followingNames.find(
    (name) => name.username.toLowerCase() === searchInput.toLowerCase()
  );

  if (!matchingTag || !matchingName) {
    followingBucketTitles.forEach((bucket) => {
      const bucketWordsArr = bucket.title.toLowerCase().split(" ");
      const searchInputArr = searchInput.toLowerCase().split(" ");

      for (let i = 0; i < searchInputArr.length; i++) {
        for (let j = 0; j < bucketWordsArr.length; j++) {
          if (bucketWordsArr[j] == searchInputArr[i]) {
            allSimilarBucket.push(bucket.title);
          }
        }
      }
    });
  }

  let uniqueBucketTitles = [...new Set(allSimilarBucket)];
  // console.log(uniqueBucketTitles);

  async function getBucketIds(arr) {
    return await Promise.all(
      arr.map(async (title) => await getBucketIdByBucketTitle(title))
    );
  }

  if (matchingTag) {
    const tagId = matchingTag.id;
    const tag_id = Number(tagId);
    res.redirect(`/search/tag/${tag_id}`);
  } else if (matchingName) {
    const userId = matchingName.followingId;
    const user_id = Number(userId);
    res.redirect(`/profile/${user_id}`);
  } else if (uniqueBucketTitles.length > 0) {
    const data = await getBucketIds(uniqueBucketTitles);
    const queryString = querystring.stringify({ data: JSON.stringify(data) });
    res.redirect(`/search/search/?${queryString}`);
  } else {
    res.redirect("/search/");
  }
});

router.get("/tag/:tag_id", async (req, res) => {
  const userid = req.user.id;
  const user_id = Number(userid);
  const tagid = req.params.tag_id;
  const tag_id = Number(tagid);
  const data = await messagesByTag(user_id, tag_id);
  res.render("messageByTag", { data });
});

router.get("/search", async (req, res) => {
  const user_id = req.user.id;
  const queryString = req.originalUrl.split("?")[1];
  const decodedQuery = decodeURIComponent(queryString);
  const { data } = querystring.parse(decodedQuery);

  const possibleBucketIds = JSON.parse(data);
  const BucketUsers = await Promise.all(
    possibleBucketIds.map(async (bucket) => {
      return await getUserIdByBucketId(bucket.id);
    })
  );

  const allMessages = await Promise.all(
    BucketUsers.map((user) => getAllMessages(user.userId))
  );
  const allallMessage = allMessages.flat();

  const filteredMessages = allallMessage.filter(message => {
    return possibleBucketIds.some(bucket => bucket.id === message.bucket.id);
  });

  const uniqueMessages = filteredMessages.filter((message, index) => {
    return index === filteredMessages.findIndex(obj => {
      return JSON.stringify(obj) === JSON.stringify(message);
    });
  });
  
  console.log(uniqueMessages);

  res.render("possibleBuckets", {feed: uniqueMessages, user_id});
});

module.exports = router;
