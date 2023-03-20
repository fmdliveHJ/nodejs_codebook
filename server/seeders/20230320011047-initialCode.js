'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'codebooks',
      {
        id: 1,
        ko: '최근',
        en: 'recent',
      },
      {
        id: 2,
        ko: 'home',
        en: '집',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('codebooks', null, {});
  },
};
