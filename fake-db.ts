const users = [
  {
    id: "1",
    username: "samsmith",
    email: "samsmith@gmail.com",
    password: "sam123",
    following: ["3", "4", "5"],
    bucket_messages: [1],
  },
  {
    id: "2",
    username: "janedoe",
    email: "janedoe@gmail.com",
    password: "jane123",
    following: ["1", "4", "7"],
    posts: ["1002", "1003"],
  },
  {
    id: "3",
    username: "johnbrown",
    email: "johnbrown@gmail.com",
    password: "john123",
    following: ["1", "2"],
    posts: ["1004"],
  },
  {
    id: "4",
    username: "annalee",
    email: "annalee@gmail.com",
    password: "anna123",
    following: ["1", "2", "6"],
    posts: ["1005"],
  },
  {
    id: "5",
    username: "davidc",
    email: "davidc@gmail.com",
    password: "david123",
    following: ["1"],
    posts: ["1006"],
  },
  {
    id: "6",
    username: "mikejones",
    email: "mikejones@gmail.com",
    password: "mike123",
    following: ["4", "7"],
    posts: ["1007", "1008"],
  },
  {
    id: "7",
    username: "jessicas",
    email: "jessicas@gmail.com",
    password: "jessica123",
    following: ["2", "6"],
    posts: ["1009"],
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

const progress = {
  "0": "In progress",
  "1": "Completed",
};

const bucket_messages = [
  {
    id: 1,
    bucket_id: 1,
    post_id: 1001,
  },
];

const buckets = [
  {
    id: "1",
    message: "Ride a roller coaster",
    filter: ["2", "5"],
  },
  {
    id: "2",
    message: "Run a marathon",
    filter: ["8"],
  },
  {
    id: "3",
    message: "Mentor someone",
    filter: ["4"],
  },
  {
    id: "4",
    message: "Visit friends",
    filter: ["5"],
  },
  {
    id: "5",
    message: "Go skiing",
    filter: ["2", "5", "8"],
  },
  {
    id: "6",
    message: "Adopt a pet",
    filter: ["9"],
  },
  {
    id: "7",
    message: "Go fishing",
    filter: ["5"],
  },
  {
    id: "8",
    message: "Go swimming",
    filter: ["5", "8"],
  },
];

const post = [
  {
    id: 1001,
    message:
      "I am going to mentor someone! I am so excited to help other students!",
    timestamp: Date.now(),
    completed: false,
  },
];
