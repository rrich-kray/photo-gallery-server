const UserFollower = require("../models/UserFollower.js");

const UserFollowerData = [
  {
    follower: 1,
    following: 2,
  },
  {
    follower: 2,
    following: 3,
  },
  {
    follower: 3,
    following: 4,
  },
  {
    follower: 4,
    following: 5,
  },
  {
    follower: 6,
    following: 7,
  },
  {
    follower: 7,
    following: 8,
  },
  {
    follower: 7,
    following: 6,
  },
  {
    follower: 9,
    following: 10,
  },
  {
    follower: 10,
    following: 5,
  },
  {
    follower: 2,
    following: 8,
  },
];

const seedUserFollowers = UserFollower.bulkCreate(UserFollowerData);

module.exports = seedUserFollowers;
