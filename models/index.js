import { Sequelize } from "sequelize";
import databaseConfig from "../config/config.json" assert { type: "json" };
import MentorListModel from "./mentorlist.js";
import StudentListModel from "./studentlist.js";

const sequelize = new Sequelize(databaseConfig.development);

const db = {};
db.sequelize = sequelize;
db.MentorList = MentorListModel(sequelize, Sequelize.DataTypes);
db.StudentList = StudentListModel(sequelize, Sequelize.DataTypes);

// ✅ Define Association: One Mentor has many Students
db.MentorList.hasMany(db.StudentList, {
  foreignKey: "mentorId", // Foreign key in the StudentList table
  as: "students", // Alias for easier query access
});

db.StudentList.belongsTo(db.MentorList, {
  foreignKey: "mentorId",
  as: "mentor", // Alias for easier query access
});

export default db;
