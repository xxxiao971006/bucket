const prisma = require("./prisma/client");

const sortPosts = (posts) => {
  try {
    return posts.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } catch (error) {
    throw new Error("Method not implemented.");
  }
};

//PRISMA FUNCTIONS (below):

//👍
function exclude(user, keys) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}

const getBucketTitleByMessageId = async (messageId) => {
  const bucketTitle = await prisma.message.findUnique({
    where: { id: messageId },
    select: {
      bucket: {
        select: {
          title: true
        }
      }
    }
  }).then(message => message.bucket.title)

  return bucketTitle
}

//❗: need to work, incomplete (also talk about how likes going to work)
const likeOrUnlikeMessage = async (message_id, status) => {
  if(status === "like"){ 
    await prisma.message.update({
      where: { id: message_id },
      data: { likes: { increment: 1 } },
  })} else if(status === "unlike"){
    await prisma.message.update({ 
      where: { id: message_id }, 
      data: { likes: { decrement: 1 } }})
  }
};

const commentMessage = async(comment, message_id, user_id) => {
  const newComment = await prisma.comment.create({
    data: {
      content: comment,
      messageId: message_id,
      userId: user_id,
    },
  });
  return newComment;
};

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
          id: true,
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
      id: true,
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
        id: following.id,
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

const changeUsername = async (userId, newUsername) => {
  await prisma.user.update({ 
    where: { id: userId }, 
    data: { username: newUsername } });
}

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

const getAllComments = async (message_id) => {
  const comments = await prisma.comment.findMany({
    where: {
      messageId: message_id
    }
  })
  return comments;
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
      id: true,
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

const getMessagesByMessageId = async (messageId) => {
 const message =  await prisma.message.findUnique({ where: { id: messageId } })
 return message;
};

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
  changeUsername,
  deleteBucketlist,
  createNewBucket,
  likeOrUnlikeMessage,
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
  completeBucketlist,
  commentMessage,
  getAllComments,
  getMessagesByMessageId,
  getBucketTitleByMessageId,
};
