'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MarkerEntity', {
      markerId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Markers', key: 'id' },
        onDelete: 'CASCADE',
      },
      entityId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: { model: 'Entities', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MarkerEntity');
  },
};