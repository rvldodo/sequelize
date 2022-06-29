"use strict";
const { v4: uuid } = require("uuid");

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
          email: "john.doe@gmail.com",
          uuid: uuid(),
          password: "12334sldjf",
          role: "admin",
          createdAt: "2022-06-29T12:30:34.180Z",
          updatedAt: "2022-09-29T12:30:34.180Z",
        },
        {
          name: "Jane Doe",
          email: "jane.doe@gmail.com",
          uuid: uuid(),
          password: "adfsiwer",
          role: "admin",
          createdAt: "2022-01-29T12:30:34.180Z",
          updatedAt: "2022-03-29T12:30:34.180Z",
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
    await queryInterface.bulkDelete("users", null, {});
  },
};
