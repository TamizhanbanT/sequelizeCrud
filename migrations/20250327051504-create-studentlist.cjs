'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('studentlist', { 
      studentId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentorId: {  // Foreign key column
        type: Sequelize.INTEGER,
        allowNull: true,  // Student may not be assigned to a mentor initially
        references: {
          model: "mentorlists",
          key: "mentorId",
        }},
      studentName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      studentClass: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      parentPhone: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('studentlist');
  }
};
