const users = [
  {
    id: "1",
    username: "@samsmith",
    email: "samsmith@gmail.com",
    password: "sam123",
    following: ["3", "4", "5"],
    message: ["1001"],
    message: ["1001"],
  },
  {
    id: "2",
    username: "@janedoe",
    email: "janedoe@gmail.com",
    password: "jane123",
    following: ["1", "4", "7"],
    message: ["1002", "1003"],
  },
  {
    id: "3",
    username: "@johnbrown",
    email: "johnbrown@gmail.com",
    password: "john123",
    following: ["1", "2"],
    message: ["1004"],
  },
  {
    id: "4",
    username: "@annalee",
    email: "annalee@gmail.com",
    password: "anna123",
    following: ["1", "2", "6"],
    message: ["1005"],
  },
  {
    id: "5",
    username: "@davidc",
    email: "davidc@gmail.com",
    password: "david123",
    following: ["1"],
    message: ["1006"],
  },
  {
    id: "6",
    username: "@mikejones",
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
  {id: "1001",
    user_id: "1",
    bucket_id: "1",
    message:
      "I am going to mentor someone! I am so excited to help other students!",
    timestamp: Date.now(),
    completed: false,
  },
  {
  id: "1002",
  user_id: "2",
  bucket_id: "5",
  message:
    "Libero fugit ex assumenda exercitationem praesentium atque debitis. Dolorum rem maiores aliquam ex qui. Sed maiores saepe saepe ullam libero est temporibus veniam deleniti. Minima dolores esse voluptate officia.",
  timestamp: "2022-06-19T17:10:12.891Z",
  completed: false,},
  {
  id: "1003",
  user_id: "2",
  bucket_id: "8",
  message:
    "Ducimus magni ducimus ducimus aperiam saepe ratione. Non ad adipisci repellendus vitae nostrum vitae quo dolorum. Debitis corporis sint non quisquam eaque tempore autem.",
  timestamp: "2022-08-25T04:55:34.847Z",
  completed: true,
},{
  id: "1004",
  user_id: "7",
  bucket_id: "1",
  message:
    "Eum ullam quae totam impedit quo quo reprehenderit. Consectetur officiis optio dolores quaerat. Aliquam aliquid rem neque reiciendis sapiente incidunt. In nihil aspernatur reiciendis nobis vero atque voluptatibus tempora modi.",
  timestamp: "2023-01-19T20:17:57.732Z",
  completed: false,
},{
  id: "1005",
  user_id: "5",
  bucket_id: "1",
  message:
    "Accusamus sed excepturi culpa suscipit maxime. A animi veniam architecto repellendus voluptatibus ex. Tenetur pariatur sit quo consequuntur nam eum eius. Accusantium quisquam perferendis ipsum assumenda voluptate qui. Repudiandae esse quibusdam.",
  timestamp: "2022-12-04T10:43:12.497Z",
  completed: false,
},{
  id: "1006",
  user_id: "6",
  bucket_id: "7",
  message:
    "Laudantium quam dicta culpa iste recusandae laboriosam nemo consequatur. Incidunt minima quae natus maiores maxime optio sequi aliquid. Illum quasi ipsa quidem numquam. Quidem pariatur sunt nobis minus asperiores illum. Odit doloribus eius quod nobis quis.",
  timestamp: "2022-12-08T13:14:23.625Z",
  completed: true,
},{
  id: "1007",
  user_id: "1",
  bucket_id: "7",
  message:
    "Sed minima doloribus distinctio explicabo praesentium inventore. Illum possimus natus illo iure error nostrum. Minus nobis labore maxime. Sed in a necessitatibus. Adipisci earum culpa tenetur. Quos veniam expedita consequatur eos eius molestiae consectetur.",
  timestamp: "2022-09-15T23:22:10.862Z",
  completed: false,
},{
  id: "1008",
  user_id: "1",
  bucket_id: "3",
  message:
    "Recusandae eaque esse itaque excepturi. Maxime deserunt deserunt quidem accusantium autem ipsam laudantium. Possimus sequi ipsa illo cupiditate consequatur minus magni quam temporibus. Repellat debitis vitae rem similique debitis. Deleniti numquam expedita eveniet.",
  timestamp: "2023-04-22T05:12:10.383Z",
  completed: true,
},{
  id: "1009",
  user_id: "3",
  bucket_id: "6",
  message:
    "Recusandae eaque esse itaque excepturi. Maxime deserunt deserunt quidem accusantium autem ipsam laudantium. Possimus sequi ipsa illo cupiditate consequatur minus magni quam temporibus. Repellat debitis vitae rem similique debitis. Deleniti numquam expedita eveniet.",
  timestamp: "2023-04-22T05:12:10.383Z",
  completed: true,
}];

const getUsernameById = (id) => {
  return users.find((user) => user.id == id).username;
}; //returning username

const getUserMessageIdByUserId = (user_id) => {
  const userInformation = users.find((user) => user.id === user_id);
  return userInformation ? userInformation.message : null;
  //user_id : 1 => return ["1001"];
};

const getMessageByMessageId = (messageId) => {
  return messages.find((message) => message.id == messageId);
}


//ASSUME THAT LOGGED IN USER IS USER_ID : "1"
const getFollowingByUserId = (user_Id) => {
  const userInformation = users.find((user) => user.id === user_Id);
  return userInformation ? userInformation.following : null;
};


const getMessageIdsByUserId = (user_Id) => {
  const userInformation = users.find((user) => user.id === user_Id);
  return userInformation ? userInformation.message : null;
};

const getBucketById = (id) => {
  return buckets.find((bucket) => bucket.id == id).title;
}; //gives the bucket title

const getUserFeed = (user_id) => {
  let userMessage = getUserMessageIdByUserId(user_id);
  let outcome = userMessage.map((userMessageId) => {
    return {
      username: getUsernameById(user_id), //samsmith
      completed: getMessageByMessageId(userMessageId).completed
        ? "Completed"
        : "In Progress",
      bucketName: getBucketById(getMessageByMessageId(userMessageId).bucket_id),
      messages: getMessageByMessageId(userMessageId).message,
    };
  });
  return outcome;
};
;

const getUserInfoByUsername = (username) => {
  return users.find((user) => user.username === username);
};
console.log(getUserInfoByUsername(("@samsmith")));

const getMessagesByMessageId = (id) => {
  return messages.find((message) => message.id == id);
};


const getFriendsFeed = (loggedInUserId) => {
  // TODO: REFACTOR THIS FUNCTION
  // getMessagesByMessageId;
  let friends = getFollowingByUserId(loggedInUserId);
  friends = friends.map((friendId) => {
    return {
      username: getUsernameById(friendId),
      completed: getMessageIdsByUserId(friendId).map((msgId) =>
        getMessagesByMessageId(msgId).completed ? "Completed" : "In Progress"
      ),
      bucketName: getMessageIdsByUserId(friendId).map((msgId) =>
        getBucketById(getMessagesByMessageId(msgId).bucket_id)
      ),
      messages: getMessageIdsByUserId(friendId).map(
        (msgId) => getMessagesByMessageId(msgId).message
      ),
    };
  });
  return friends;
}; 

module.exports = {getMessageByMessageId, getUserInfoByUsername, getUsernameById, getFriendsFeed, getUserFeed };
