"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      title: DataTypes.STRING,
      desc: DataTypes.TEXT,
      ownerId: DataTypes.UUID
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, {
      foreignKey: "ownerId",
      as: "owner"
    });
  };
  return Post;
};
