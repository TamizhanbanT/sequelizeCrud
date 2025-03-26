export default (sequelize, DataTypes) => {
  return sequelize.define(
    "MentorList",
    {
      mentorId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique:true

       // defaultValue: 1, // Setting a default value
      },
      mentorName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mentorPhone: {
        type: DataTypes.BIGINT,
        allowNull: false,
        unique: true,
      },
      mentorClass: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      tutionFee: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      tableName: "mentorlists",
    }
  );
};




















// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class MentorList extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   MentorList.init({
//     mentorId: DataTypes.INTEGER,
//     mentorName: DataTypes.STRING,
//     mentorPhone: DataTypes.INTEGER,
//     mentorClass: DataTypes.INTEGER,
//     tutionFee: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'MentorList',
//   });
//   return MentorList;
// };