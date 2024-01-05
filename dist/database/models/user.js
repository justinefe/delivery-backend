"use strict";

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    profilePic: DataTypes.STRING,
    type: DataTypes.STRING,
    status: DataTypes.STRING,
    subscriptionStatus: DataTypes.STRING,
    isAdult: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: async user => {
        user.password = await _bcryptjs.default.hash(user.password, 6);
      }
    }
  });
  User.associate = models => {
    // associations can be defined here
    User.hasMany(models.Post, {
      foreignKey: "ownerId"
    });
  };
  User.prototype.userResponse = function userResponse() {
    const userData = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      role: this.role,
      phoneNumber: this.phoneNumber,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      profilePic: this.profilePic,
      status: this.status,
      type: this.type,
      subscriptionStatus: this.subscriptionStatus,
      isAdult: this.isAdult
    };
    return userData;
  };
  return User;
};