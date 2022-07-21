const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bio: {
      type: DataTypes.TEXT,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    freezeTableName: true,
    modelName: 'user',
  }
);

// User.addHook('beforeCreate', async (newUserData) => {
//   newUserData.password = await bcrypt.hash(newUserData.password, 10);
//   return newUserData;
// });

// User.addHook('beforeUpdate', async (updatedUserData) => {
//   updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
//   return updatedUserData;
// });

module.exports = User;
