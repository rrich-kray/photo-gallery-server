const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

// Every time somebody is followed, a new entry will be created that will contain IDs of the follower and followed
class UserFollower extends Model {}

UserFollower.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    follower: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },

    following: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: "user_follower",
  }
);

module.exports = UserFollower;
