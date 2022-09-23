const Image = require("../models/Image");

const imageData = [
  {
    filename: "1.jpg",
    post_id: 1,
    isAvatar: false,
  },
  {
    filename: "2.jpg",
    post_id: 2,
    isAvatar: false,
  },
  {
    filename: "3.jpg",
    post_id: 3,
    isAvatar: false,
  },
  {
    filename: "4.jpg",
    post_id: 4,
    isAvatar: true,
  },
  {
    filename: "5.jpg",
    post_id: 5,
    isAvatar: false,
  },
  {
    filename: "6.jpg",
    post_id: 6,
    isAvatar: false,
  },
  {
    filename: "7.jpg",
    post_id: 7,
    isAvatar: false,
  },
  {
    filename: "8.jpg",
    post_id: 8,
    isAvatar: true,
  },
  {
    filename: "9.jpg",
    post_id: 9,
    isAvatar: false,
  },
  {
    filename: "10.jpg",
    post_id: 10,
    isAvatar: false,
  },
];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;
