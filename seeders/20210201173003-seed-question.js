'use strict';

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
    let dateNow = new Date()
    DATA.map(item => {
      item.created_at = dateNow
      item.updated_at = dateNow
    })
    await queryInterface.bulkInsert(TABLE, DATA, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(TABLE, null, {});
  }
};

const TABLE = "Questions"

const DATA = [
  {
    "question": "Cryptocurrentcy",
    "answers": "Bitcoin,Price,Trading,Ethereum,PI"
  },
  {
    "question": "Android Developer",
    "answers": "Kotlin,JAVA,XML,Flutter"
  }
]
