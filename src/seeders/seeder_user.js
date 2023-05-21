'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [{
      email: "admin@gmail.com",
      password: "123",
      firstName: "admin",
      lastName: "admin",
      address: "Can Tho",
      gender: 1,
      typeRole: "ROLE",
      keyRole: "R1",
      createdAt: new Date(),
      updateAt: new Date(),
    }])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
