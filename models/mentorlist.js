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




















