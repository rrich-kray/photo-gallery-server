const UserFollower = require("../models/UserFollower.js");

const UserFollowerData = [
  {
    user_id: 1,
    follower_id: 2,
  },
  {
    user_id: 2,
    follower_id: 1,
  },
  {
    user_id: 3,
    follower_id: 4,
  },
  {
    user_id: 2,
    follower_id: 5,
  },
  {
    user_id: 7,
    follower_id: 5,
  },
  {
    user_id: 6,
    follower_id: 5,
  },
  {
    user_id: 6,
    follower_id: 10,
  },
  {
    user_id: 10,
    follower_id: 5,
  },
  {
    user_id: 2,
    follower_id: 8,
  },
  {
    user_id: 4,
    follower_id: 5,
  },
];

const seedUserFollowers = UserFollower.bulkCreate(UserFollowerData);

module.exports = seedUserFollowers;
