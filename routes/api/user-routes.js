const router = require("express").Router();
const { checkForToken } = require("../../utils/middleware");
const { Validator } = require("../../utils/middleware");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login,
  register,
} = require("../../controllers/user-controllers");

router.route("/").get(getAllUsers);
router
  .route("/:userId")
  .get(checkForToken, getUserById)
  .put(updateUser)
  .delete(deleteUser);
router
  .route("/login")
  .post(
    new Validator("email").validateEmail,
    new Validator("email").trim,
    login
  );
router
  .route("/register")
  .post(
    new Validator("email").validateEmail,
    new Validator("email").trim,
    register
  );

module.exports = router;
