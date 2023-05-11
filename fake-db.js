const prisma = require("./prisma/client");



const getUsernameById = (id) => {
  return users.find((user) => user.id == id).username;
};

const getUserMessageIdByUserId = (user_id) => {
  const userInformation = users.find((user) => user.id == user_id);
  return userInformation ? userInformation.message : null;
};

const getMessagesByMessageId = (messageId) => {
  return messages.find((message) => message.id == messageId);
};

const getFollowingByUserId = (user_Id) => {
  const userInformation = users.find((user) => user.id == user_Id);
  return userInformation ? userInformation.following : null;
};

const getMessageIdsByUserId = (user_Id) => {
  const userInformation = users.find((user) => user.id == user_Id);
  return userInformation ? userInformation.message : null;
};

const sortPosts = (posts) => {
  try {
    return posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } catch (error) {
    throw new Error("Method not implemented.");
  }
};


 const getBucketIdByBucketTitle = (bucket_title) => {
  const bucketFound = buckets.find((bucket) => bucket.title == bucket_title);
  return bucketFound ? bucketFound.id : null;
};

//👍
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

const getBucketTitleByBucketId = async (id) => {
  const bucketTitle = await prisma.bucket.findUnique({
    where: {id: id},
    select: {title: true}
  })
  return bucketTitle ;
};

const completeBucketlist = async (bucket_id) => {
  await prisma.bucket.update({
    where: { id: bucket_id },
    data: { completed: true }
  }) 
 };

const deleteBucketlist = async (bucket_id) => {
  await prisma.bucket.delete({ 
    where: { id: bucket_id }, 
    include: { Task: true, messages: true } })
};

//👍
const createNewTasks = async (taskMessage, bucket_id) => {
  try {
    const newTask = await prisma.task.create({
      data: {

        message: taskMessage,
        completed: false,
        bucket: {connect: {id: bucket_id}}
      }
      // data: {
      //   message: taskMessage,
      //   bucket: {connect: bucket_id}
      // }
    })
    return newTask;  
  } catch (error) {
    console.log(error);
  }
  
}

const updateTask = async (completion, task_id) => {
  const task = await prisma.task.update({
    where: {
      id: task_id
    },
    data: {
      completed: completion
    }
  });
  return task;
}

//👍
const getTasks = async (bucket_id) => {
  const tasks = await prisma.bucket.findUnique({
    where: { id: bucket_id },
    select: { Task: true },
  });
  return tasks;
};

const getMainFeed = async (user_id) => {
  const mainFeed = await prisma.user.findUnique({
    where: { id: user_id },
    select: {
      following: {
        select: {
          username: true,
          profileImg: true,
          buckets: {
            select: {
              title: true,
              completed: true,
              messages: {
                orderBy: { createdAt: "asc" },
                select: {
                  content: true,
                  likes: true,
                  createdAt: true,
                  comments: {
                    select: { content: true, createdAt: true },
                  },
                },
              },
            },
          },
        },
      },
      username: true,
      profileImg: true,
      buckets: {
        select: {
          title: true,
          completed: true,
          messages: {
            orderBy: { createdAt: "asc" },
            select: {
              content: true,
              likes: true,
              createdAt: true,
              comments: {
                select: { content: true, createdAt: true },
              },
            },
          },
        },
      },
    },
  });
  const outcome = {
    following: mainFeed.following.map((following) => {
      return {
        username: following.username,
        profileImg: following.profileImg,
        buckets: following.buckets,
      };
    }),
    user: {
      username: mainFeed.username,
      profileImg: mainFeed.profileImg,
      buckets: mainFeed.buckets,
    },
  };

  return outcome;
};

//👍: get user by user id
const getUserByUserId = async (user_id) => {
  const user = await prisma.user.findUnique({
    where: { id: user_id },
  });
  return user;
  // return users.find((user) => user.id == user_id);
};

//👍: creating new Bucket
const createNewBucket = async (dueDate, newBucket, userId, tagId) => {
  const newBucketlist = await prisma.bucket.create({
    data: {
      dueDate: new Date(dueDate),
      title: newBucket,
      user: {connect: {id: userId}},
      tag: {connect: {id: tagId}},
      completed: false,
    }
  })
  return newBucketlist;
  };

//👍: returning whole user information
const getUserByUsernameAndPassword = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: { username: username },
  });

  if (user) {
    if (user.password === password) {
      return user;
    }
  }
  return false;
};

//👍: Create new user. 
const createUser = async (user) => {
  const { email, username, password } = user;
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    return false;
  } else {
    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
        profileImg:
          "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg",
      },
    });
    return newUser;
  }
};

//👍: Get all messages of the user
const getAllMessage = async (user_id) => {
  const allMessage = await prisma.message.findMany({
    where: {
      bucket: {
        user: {
          id: user_id
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      content: true,
      createdAt: true,
      likes:true,
      comments:true,
      bucket: {
        select: {
          title: true,
          completed: true
        }
      }
    }
  })

  return allMessage;
}

//👍: Showing all the buckets on the list. 
const showBuckets = async (status, currentUser) => {
  let buckets = null;
  if (status === "all") {
    buckets = await prisma.bucket.findMany({ where: { userId: currentUser }, select: { id: true, title: true} });
  } else if (status === "completed") {
    buckets = await prisma.bucket.findMany({
      where: {
        AND: [{ userId: currentUser }, { completed: true }],
      },
      select: { id: true, title: true}
    });
  } else if (status === "inprogress") {
    buckets = await prisma.bucket.findMany({
      where: {
        AND: [{ userId: currentUser }, { completed: false }],
      },
      select: { id: true, title: true}
    });
  }
  return buckets;
};

//👍: Get all tags
const getAllTags = async () => {
  const tag = await prisma.tag.findMany();
  return tag;
}

const addNewMessage = async (content, bucket_id) => {
  const bucketId = Number(bucket_id);
  console.log(bucketId);
  const newMessage = await prisma.message.create({
    data: {
      content: content,
      bucket: {connect: {id: bucketId}},
      likes: 0
    },
  })
  return newMessage;
};


module.exports = {
  deleteBucketlist,
  createNewBucket,
  addNewMessage,
  getBucketTitleByBucketId,
  getMainFeed,
  getTasks,
  getUserByUsernameAndPassword,
  getUserByUserId,
  createUser,
  showBuckets,
  getAllTags,
  createNewTasks,
  getAllMessage,
  updateTask,
  completeBucketlist
};
