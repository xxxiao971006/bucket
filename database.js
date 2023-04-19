let feeds = [
  {
    id: 1,
    title: "Eating Baguette at Eiffel Tower",
    timestamp: Date.now(),
    contents:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus blandit tempus ante, vitae ultricies lectus rhoncus dictum. Vivamus eu luctus orci, a accumsan dolor. Maecenas vel justo at felis elementum consectetur. Maecenas eget ornare eros. Pellentesque in faucibus enim, et tristique neque. Praesent suscipit commodo placerat.",
  },
  {
    id: 2,
    title: "Buy Macbook pro + iPad + Apple watch",
    timestamp: Date.now(),
    contents:
      "Duis sagittis quam felis, vel suscipit metus luctus luctus. Morbi at leo vel risus bibendum tincidunt. In odio nibh, eleifend quis metus non, imperdiet convallis enim. Curabitur ac metus convallis, maximus ligula eget, rutrum ex. Sed lacus dui, accumsan nec scelerisque ut, tempor quis magna.",
  },
];

function getFeeds() {
  return feeds;
}
exports.getFeeds = getFeeds;

function getFeed(id) {
  return feeds.find((feed) => feed.id === id);
}
exports.getFeed = getFeed;

function addFeed(feed) {
  feeds.push({
    ...feed,
    id: feeds.length + 1,
    timestamp: Date.now(),
  });
}
exports.addFeed = addFeed;

function deleteFeed(id) {
  feeds = feeds.filter(feed => feed.id !== id);
}
exports.deleteFeed = deleteFeed;
