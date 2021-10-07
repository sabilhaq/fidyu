"use strict";

const bcrypt = require("bcrypt");
const salt = 10;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        email: "sabil@smail.com",
        password: bcrypt.hashSync("1234", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "rasyid@smail.com",
        password: bcrypt.hashSync("1234", salt),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
