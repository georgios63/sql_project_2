"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     *
     */
    await queryInterface.bulkInsert(
      "todoItems",
      [
        {
          task: "Make the app work",
          todolistId: 1,
          deadline: "today",
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          task: "Make the relations work",
          todolistId: 2,
          deadline: "today",
          important: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await console.log(Sequelize);
    await queryInterface.bulkDelete("todoItems", null, {});
  },
};
