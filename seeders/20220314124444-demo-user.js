"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "John Doe",
          email: "wdadwawd@wadad.com",
          phone: "2423423525",
          password: "dawdawdaw",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cry me a river",
          email: "dawd@wadad.com",
          phone: "2423423525",
          password: "dawdawdaw",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
