"use strict";

// const { sequelize } = require('../models');

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable("Users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true
    },
    profilePic: {
      type: Sequelize.STRING,
      allowNull: true
    },
    type: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      type: Sequelize.STRING,
      allowNull: true
    },
    subscriptionStatus: {
      type: Sequelize.STRING,
      allowNull: true
    },
    isAdult: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: queryInterface => queryInterface.dropTable("Users")
};