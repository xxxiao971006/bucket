// let feeds = [
//   {
//     id: 1,
//     title: "Eating Baguette at Eiffel Tower",
//     timestamp: Date.now(),
//     contents:
//       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit tempus ante, vitae ultricies lectus rhoncus dictum. Vivamus eu luctus orci, a accumsan dolor. Maecenas vel justo at felis elementum consectetur. Maecenas eget ornare eros. Pellentesque in faucibus enim, et tristique neque. Praesent suscipit commodo placerat.",
//   },
//   {
//     id: 2,
//     title: "Buy Macbook pro + iPad + Apple watch",
//     timestamp: Date.now(),
//     contents:
//       "Duis sagittis quam felis, vel suscipit metus luctus luctus. Morbi at leo vel risus bibendum tincidunt. In odio nibh, eleifend quis metus non, imperdiet convallis enim. Curabitur ac metus convallis, maximus ligula eget, rutrum ex. Sed lacus dui, accumsan nec scelerisque ut, tempor quis magna.",
//   },
// ];

// function getFeeds() {
//   return feeds;
// }
// exports.getFeeds = getFeeds;

// function getFeed(id) {
//   return feeds.find((feed) => feed.id === id);
// }
// exports.getFeed = getFeed;

// function addFeed(feed) {
//   feeds.push({
//     ...feed,
//     id: feeds.length + 1,
//     timestamp: Date.now(),
//   });
// }
// exports.addFeed = addFeed;

// function deleteFeed(id) {
//   feeds = feeds.filter(feed => feed.id !== id);
// }
// exports.deleteFeed = deleteFeed;

///////////////fakedb down here//////////////////

const users = [
  {
    id: "1",
    username: "samsmith",
    email: "samsmith@gmail.com",
    password: "sam123",
    following: ["3", "4", "5"],
    message: "1001",
  },
  {
    id: "2",
    username: "janedoe",
    email: "janedoe@gmail.com",
    password: "jane123",
    following: ["1", "4", "7"],
    message: ["1002", "1003"],
  },
  {
    id: "3",
    username: "johnbrown",
    email: "johnbrown@gmail.com",
    password: "john123",
    following: ["1", "2"],
    message: ["1004"],
  },
  {
    id: "4",
    username: "annalee",
    email: "annalee@gmail.com",
    password: "anna123",
    following: ["1", "2", "6"],
    message: ["1005"],
  },
  {
    id: "5",
    username: "davidc",
    email: "davidc@gmail.com",
    password: "david123",
    following: ["1"],
    message: ["1006"],
  },
  {
    id: "6",
    username: "mikejones",
    email: "mikejones@gmail.com",
    password: "mike123",
    following: ["4", "7"],
    message: ["1007", "1008"],
  },
  {
    id: "7",
    username: "jessicas",
    email: "jessicas@gmail.com",
    password: "jessica123",
    following: ["2", "6"],
    message: ["1009"],
  },
];

const filters = [
  {
    id: "1",
    filter: "Travel",
  },
  {
    id: "2",
    filter: "Adventure",
  },
  {
    id: "3",
    filter: "Food",
  },
  {
    id: "4",
    filter: "Study",
  },
  {
    id: "5",
    filter: "Fun",
  },
  {
    id: "6",
    filter: "Nature",
  },
  {
    id: "7",
    filter: "Culture",
  },
  {
    id: "8",
    filter: "Exercise",
  },
  {
    id: "9",
    filter: "Others",
  },
];

const buckets = [
  {
    id: "1",
    title: "Ride a roller coaster",
    filter: ["2", "5"],
  },
  {
    id: "2",
    title: "Run a marathon",
    filter: ["8"],
  },
  {
    id: "3",
    title: "Mentor someone",
    filter: ["4"],
  },
  {
    id: "4",
    title: "Visit friends",
    filter: ["5"],
  },
  {
    id: "5",
    title: "Go skiing",
    filter: ["2", "5", "8"],
  },
  {
    id: "6",
    title: "Adopt a pet",
    filter: ["9"],
  },
  {
    id: "7",
    title: "Go fishing",
    filter: ["5"],
  },
  {
    id: "8",
    title: "Go swimming",
    filter: ["5", "8"],
  },
];

const messages = [
  {
    id: 1001,
    user_id: 1,
    bucket_id: 1,
    message:
      "I am going to mentor someone! I am so excited to help other students!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1002,
    user_id: 2,
    bucket_id: 4,
    message: "I finally get to visit my friends after so long! Can't wait!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1003,
    user_id: 2,
    bucket_id: 6,
    message: "Thinking of adopting a pet, any suggestions for a good pet?",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1004,
    user_id: 3,
    bucket_id: 5,
    message: "Going skiing this weekend, anyone else up for it?",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1005,
    user_id: 4,
    bucket_id: 2,
    message:
      "Training for a marathon is hard work, but I'm up for the challenge!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1006,
    user_id: 5,
    bucket_id: 8,
    message: "Just went for a swim, feels so refreshing!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1007,
    user_id: 6,
    bucket_id: 7,
    message:
      "Going fishing with some friends this weekend, can't wait to catch some fish!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1008,
    user_id: 6,
    bucket_id: 1,
    message: "Going to ride a roller coaster for the first time, wish me luck!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1009,
    user_id: 7,
    bucket_id: 3,
    message: "I love trying new foods, any suggestions for a good restaurant?",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1010,
    user_id: 1,
    bucket_id: 6,
    message:
      "Going for a hike in the mountains, can't wait to see the beautiful scenery!",
    timestamp: Date.now(),
    completed: false,
  },
  {
    id: 1011,
    user_id: 2,
    bucket_id: 9,
    message:
      "Thinking of trying something new, any ideas for a unique experience?",
    timestamp: Date.now(),
    completed: false,
  },
];

function getUsers() {
  return users;
}
function getUserById(id) {
  return users.find((user) => user.id === id);
}

function getFilters() {
  return filters;
}
function getFilterById(id) {
  return filters.find((filter) => filter.id === id);
}

function getBuckets() {
  return buckets;
}
function getBucketById(id) {
  return buckets.find((bucket) => bucket.id === id);
}

function getMessages() {
  return messages;
}
function getMessageById(id) {
  return messages.find((message) => message.id === id);
}
function getMessagesByUserId(id) {
  return messages.filter((message) => message.user_id === id);
}

module.exports = {
  getUsers,
  getUserById,
  getFilters,
  getFilterById,
  getBuckets,
  getBucketById,
  getMessages,
  getMessageById,
  getMessagesByUserId,
};

const userMessage = messages.filter((message) => message.user_id === 1)

    userMessage.forEach((message) => {
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].completed === false) {
                messages[i].completed = "Progress";
                } else {
                    messages[i].completed = "Completed";
                }
        }
        for (let j = 0; j < users.length; j++) {
            if (users[j].id === message.user_id) {
                    message.user_id = users[j].username
                } else {
                    message.user_id = message.user_id
                }
        }
        console.log(message.user_id, message.completed, message.message)
    })