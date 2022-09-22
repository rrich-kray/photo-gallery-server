const { Post, Image, Comment, Upvote, Downvote } = require("../models");
const { Op } = require("sequelize");
const uniqid = require("uniqid");
const path = require("path");
const fs = require("fs");

const postController = {
  // Query all posts
  getAllPosts(req, res) {
    Post.findAll({
      include: [
        {
          model: Comment,
        },
        {
          model: Image,
        },
      ],
    })
      .then((postData) => {
        console.log(postData);
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Query a single post by ID
  getPostsById(req, res) {
    Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Image,
        },
        {
          model: Comment,
        },
      ],
    })
      .then((postData) => {
        if (!postData) {
          res.json("No posts found with this ID!");
          return;
        }
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  //Create post
  createPost(req, res) {
    Post.create(req.body)
      .then((postData) => {
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Search posts by title
  searchPostsByTitle(req, res) {
    Post.findAll({
      where: {
        title: {
          [Op.like]: req.body.search,
        },
      },
    })
      .then((postData) => {
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Search post by content
  searchPostsByContent(req, res) {
    Post.findAll({
      where: {
        content: {
          [Op.like]: req.params.search,
        },
      },
    });
  },

  // Search posts by title or content
  searchPostsByTitleOrContent(req, res) {
    Post.findAll({
      where: {
        [Op.or]: {
          title: {
            [Op.like]: req.body.search,
          },
          content: {
            [Op.like]: req.body.search,
          },
        },
      },
    })
      .then((postData) => {
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // delete post
  async deletePost(req, res) {
    const comments = await Comment.findAll({
      where: {
        post_id: req.params.postId,
      },
    });

    comments.map((comment) => {
      Upvote.destroy({
        where: {
          comment_id: comment.id,
        },
      });

      Downvote.destroy({
        where: {
          comment_id: comment.id,
        },
      });
    });

    await Comment.destroy({
      where: {
        post_id: req.params.postId,
      },
    });
    const image = await Image.findOne({
      where: {
        post_id: req.params.postId,
      },
    });
    fs.unlinkSync(path.join(__dirname, "../uploads", image.filename));
    await Image.destroy({
      where: {
        post_id: req.params.postId,
      },
    });

    const response = await Post.destroy({
      where: {
        id: req.params.postId,
      },
    });

    if (!response) {
      res.json({ errorMessage: "Error deleteing post" });
      return;
    }

    res.json(response);
  },

  // Update post
  async updatePost(req, res) {
    await Post.update(
      { title: req.body.title },
      { content: req.body.content },
      { where: { id: req.params.id } }
    )
      .then((postData) => {
        res.json(postData);
      })
      .catch((err) => {
        res.json(err);
      });

    await Image.update(
      { filename: req.body.filename },
      { where: { post_id: req.params.id } }
    )
      .then((response) => {
        res.json(response);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Upload files
  // Check if image files are attached. If not, send message in response object
  // Otherwise, assign file to variable, and generate a unique file name with uniqid
  // Move file to uploads folder using .mv()
  // Create entry in Image model with unique filename and user id.

  // Want to consolidate routes that create the post, upload the image, and create the image entry in the Image table
  uploadFile(req, res) {
    if (!req.files) {
      res.send({
        status: "failed",
        message: "No file uploaded",
      });
      return;
    }
    const file = req.files.file;
    const originalFilenameArr = file.name.split(".");
    const extension = originalFilenameArr[originalFilenameArr.length - 1];
    const filename = uniqid();
    const filenameExt = filename + "." + extension;
    // The problem uploading images may be associated with the file path
    file.mv(path.join(__dirname, "../uploads", filenameExt));
    res.send(filenameExt);
  },
};

module.exports = postController;
