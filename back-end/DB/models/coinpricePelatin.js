const { DataTypes } = require("sequelize");
const { db } = require("../db");

const coinpricePelatin = db.define(
  "coinpricePelatin",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    BuySell: {
      type: DataTypes.INTEGER,
      require: true,
    },
    Price: {
      type: DataTypes.INTEGER,
      require: true,
      defaultValue: 0,
    },
  },
  {
    freezeTableName: true,

    updatedAt: "Date",
  }
);
module.exports = coinpricePelatin;
