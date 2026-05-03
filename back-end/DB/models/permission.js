const { DataTypes } = require("sequelize");
const { db } = require("../db");

const permission = db.define(
  "permission",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      //   primaryKey: true,
      require: true,
    },
    location: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
    },
    blv: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pelatin: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    pasag: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = permission;
