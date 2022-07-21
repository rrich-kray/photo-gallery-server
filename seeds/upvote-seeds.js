const Upvote = require('../models/Upvote');

const upvoteData = [
  {
    user_id: 1,
    comment_id: 1,
  },
  {
    user_id: 2,
    comment_id: 2,
  },
  {
    user_id: 3,
    comment_id: 3,
  },
  {
    user_id: 4,
    comment_id: 4,
  },
  {
    user_id: 5,
    comment_id: 5,
  },
  {
    user_id: 6,
    comment_id: 6,
  },
  {
    user_id: 7,
    comment_id: 7,
  },
  {
    user_id: 8,
    comment_id: 8,
  },
  {
    user_id: 9,
    comment_id: 9,
  },
  {
    user_id: 10,
    comment_id: 10,
  },
  {
    user_id: 1,
    comment_id: 1,
  },
  {
    user_id: 2,
    comment_id: 2,
  },
  {
    user_id: 3,
    comment_id: 3,
  },
  {
    user_id: 4,
    comment_id: 4,
  },
  {
    user_id: 5,
    comment_id: 5,
  },
  {
    user_id: 6,
    comment_id: 6,
  },
];

const seedUpvotes = () => Upvote.bulkCreate(upvoteData);

module.exports = seedUpvotes;
