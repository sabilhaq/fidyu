'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Videos",
          "description",
          {
            type: Sequelize.TEXT,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "Videos",
          "dislikes",
          {
            type: Sequelize.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("Videos", "description", {
          transaction: t,
        }),
        queryInterface.removeColumn("Videos", "dislikes", {
          transaction: t,
        }),
      ]);
    });
  }
};
