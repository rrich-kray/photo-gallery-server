const { Post } = require("../../models/Post");
const { checkForToken } = require("../../utils/middleware");
const router = require("express").Router();
const {
  getAllPosts,
  getPostsById,
  createPost,
  searchPostsByTitle,
  searchPostsByContent,
  searchPostsByTitleOrContent,
  deletePost,
  updatePost,
  uploadFile,
} = require("../../controllers/post-controllers");

router.route("/").get(getAllPosts).post(checkForToken, createPost);
router.route("/:title").get(searchPostsByTitle);
router.route("/:content").get(searchPostsByContent);
router.route("/:titleOrContent").get(searchPostsByTitleOrContent);
router.route("/upload").post(checkForToken, uploadFile);
router.route("/:postId").get(getPostsById).put(updatePost).delete(deletePost);

module.exports = router;
