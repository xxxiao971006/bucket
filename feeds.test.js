const { getFeeds, getFeed, addFeed, deleteFeed } = require('./feeds');

describe('Feeds', () => {
  beforeEach(() => {
    // Reset the feeds array before each test
    global.feeds = [
      {
        id: 1,
        title: "Eating Baguette at Eiffel Tower",
        timestamp: Date.now(),
        contents: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        id: 2,
        title: "Buy Macbook pro + iPad + Apple watch",
        timestamp: Date.now(),
        contents: "Duis sagittis quam felis, vel suscipit metus luctus...",
      },
    ];
  });

  test('getFeeds returns all feeds', () => {
    const feeds = getFeeds();
    expect(feeds.length).toBe(2);
  });

  test('getFeed returns a specific feed by id', () => {
    const feed = getFeed(1);
    expect(feed).toMatchObject({
      id: 1,
      title: "Eating Baguette at Eiffel Tower",
    });
  });

  test('getFeed returns undefined for non-existing id', () => {
    const feed = getFeed(99);
    expect(feed).toBeUndefined();
  });

  test('addFeed adds a new feed', () => {
    const newFeed = {
      title: "New Feed",
      contents: "New feed contents...",
    };
    addFeed(newFeed);
    const feeds = getFeeds();
    expect(feeds.length).toBe(3);
    expect(feeds[2]).toMatchObject({
      id: 3,
      title: "New Feed",
    });
  });

  test('deleteFeed removes a feed by id', () => {
    deleteFeed(1);
    const feeds = getFeeds();
    expect(feeds.length).toBe(1);
    expect(feeds[0]).toMatchObject({
      id: 2,
      title: "Buy Macbook pro + iPad + Apple watch",
    });
  });

  test('deleteFeed does nothing for non-existing id', () => {
    deleteFeed(99);
    const feeds = getFeeds();
    expect(feeds.length).toBe(2);
  });
});
