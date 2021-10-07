"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Video extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Video.hasMany(models.Comment, { onDelete: 'CASCADE', hooks: true });
      Video.belongsTo(models.User);
    }
  }
  Video.init(
    {
      title: DataTypes.STRING,
      url: DataTypes.STRING,
      description: DataTypes.TEXT,
      likes: { type: DataTypes.INTEGER, defaultValue: 0 },
      dislikes: { type: DataTypes.INTEGER, defaultValue: 0 },
      views: { type: DataTypes.INTEGER, defaultValue: 0 },
      thumbnail: DataTypes.STRING,
      isPrivate: { type: DataTypes.BOOLEAN, defaultValue: false },
      category: DataTypes.STRING,
      voters: DataTypes.ARRAY(DataTypes.STRING),
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Video",
    }
  );
  return Video;
};
