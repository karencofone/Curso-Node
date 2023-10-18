'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Tasks', [
        {
          titulo: 'Tarea 1',
          descripcion: 'Es una tarea 1',
          completada: true,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          titulo: 'Tarea 2',
          descripcion: 'Es una tarea 2',
          completada: false,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
        {
          titulo: 'Tarea 3',
          descripcion: 'Es una tarea 3',
          completada: false,
          createdAt: new Date().toDateString(),
          updatedAt: new Date().toDateString()
        },
    
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};