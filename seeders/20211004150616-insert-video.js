"use strict";

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
    await queryInterface.bulkInsert("Videos", [
      {
        title: "Video 1",
        likeCount: 0,
        views: 0,
        isPrivate: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Video 2",
        likeCount: 0,
        views: 0,
        isPrivate: false,
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
    await queryInterface.bulkDelete("Videos", null, {});
  },
};
