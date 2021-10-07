"use strict";

const bcrypt = require("bcrypt");
const salt = 10;

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Video, { onDelete: 'CASCADE', hooks: true });
      User.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      picture: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    return (user.password = bcrypt.hashSync(user.password, salt));
  });
  User.prototype.verify = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  return User;
};
