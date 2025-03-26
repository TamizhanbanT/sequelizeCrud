export default (sequelize, DataTypes) => {
  return sequelize.define(
    "StudentList",
    {
      studentId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      studentName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      studentClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      parentPhone: {
        type: DataTypes.BIGINT,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "studentlist",
    }
  );
};











// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class StudentList extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   StudentList.init({
//     studentId: DataTypes.INTEGER,
//     studentName: DataTypes.STRING,
//     studentClass: DataTypes.INTEGER,
//     parentPhone: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'StudentList',
//   });
//   return StudentList;
// };