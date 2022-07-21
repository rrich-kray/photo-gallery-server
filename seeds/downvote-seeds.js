const Downvote = require('../models/Downvote');

const downvoteData = [
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
    user_id: 1,
    comment_id: 6,
  },
  {
    user_id: 2,
    comment_id: 7,
  },
  {
    user_id: 3,
    comment_id: 8,
  },
  {
    user_id: 4,
    comment_id: 9,
  },
  {
    user_id: 5,
    comment_id: 10,
  },
  {
    user_id: 1,
    comment_id: 11,
  },
  {
    user_id: 2,
    comment_id: 12,
  },
  {
    user_id: 3,
    comment_id: 13,
  },
  {
    user_id: 4,
    comment_id: 14,
  },
  {
    user_id: 5,
    comment_id: 15,
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
];

const seedDownvotes = () => Downvote.bulkCreate(downvoteData);

module.exports = seedDownvotes;
