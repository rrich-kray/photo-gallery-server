const { User, Post, Comment, Image } = require("../models/");
const jwt = require("jsonwebtoken");
require("dotenv").config;
const secret = process.env.SECRET;

const userController = {
  getAllUsers(req, res) {
    User.findAll({})
      .then((response) => res.json(response))
      .catch((err) => res.json(err));
  },

  getUserById(req, res) {
    User.findOne({
      where: {
        id: req.params.userId,
      },

      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
            },
            {
              model: Image,
            },
          ],
        },
      ],
    })
      .then((userData) => {
        res.json(userData);
      })
      .catch((err) => {
        res.json(err);
      });
  },

  // Register
  async register(req, res) {
    const user1 = await User.findOne({ where: { email: req.body.email } });
    if (user1) {
      res.json({
        errorMessage: "A user is already registered with this email account.",
      });
      return;
    }
    const user = await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        data: [user.id, user.email],
      },
      secret,
      { expiresIn: "2h" }
    );
    res.json({ user: user, token: token });
  },

  // login
  async login(req, res) {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    console.log(user.password);

    if (!user) {
      res.json({ errorMessage: "Invalid user credentials provided." });
      return;
    }

    if (user && user.password !== req.body.password) {
      res.json({ errorMessage: "Invalid user credentials provided." });
      return;
    }

    const token = jwt.sign({ data: [user.id, user.email] }, secret, {
      expiresIn: "2h",
    });

    res.json({ user: user, token: token });
  },

  // Update User
  updateUser(req, res) {
    User.update(
      { firstName: req.body.firstName },
      { lastName: req.body.lastName },
      { password: req.body.password },
      { email: req.body.email },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then((userData) => {
        res.json({ data: userData, message: "User successfully updated." });
      })
      .catch((err) => {
        res.json({ error: err, message: err.message });
      });
  },

  // Delete User
  deleteUser(req, res) {
    User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((response) => {
        res.json({ data: response, message: "User successfully deleted" });
      })
      .catch((err) => {
        res.json({ data: err, message: err.message });
      });
  },
};

module.exports = userController;
