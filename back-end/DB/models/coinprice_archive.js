const { DataTypes } = require("sequelize");
const { db } = require("../db");

const coinprice_archive = db.define(
  "coinprice_archive",
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
module.exports = coinprice_archive;
