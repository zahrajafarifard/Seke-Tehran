const { DataTypes } = require("sequelize");
const { db } = require("../db");
const { voipDb } = require("../db");

// const coinprice = db.define(
//   "coinprice",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       unique: true,
//       primaryKey: true,
//       require: true,
//     },
//     BuySell: {
//       type: DataTypes.INTEGER,
//       require: true,
//     },
//     Price: {
//       type: DataTypes.INTEGER,
//       require: true,
//       defaultValue: 0,
//     },
//   },
//   {
//     freezeTableName: true,

//     updatedAt: "Date",
//   }
// );
// module.exports = coinprice;

exports.tabloCoinprice = db.define(
  "coinprice",
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

exports.voipCoinprice = voipDb.define(
  "CoinPrice",
  {
    Id: {
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
    createdAt: false,
    updatedAt: "Date",
  }
);