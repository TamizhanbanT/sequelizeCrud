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
      mentorId: {  // Foreign key column
        type: DataTypes.INTEGER,
        allowNull: true,  // Student may not be assigned to a mentor initially
        references: {
          model: "mentorlists",
          key: "mentorId",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL", // If a mentor is deleted, set mentorId to NULL in students
      },
    },
    {
      timestamps: true,
      tableName: "studentlist",
    }
  );
};
