const { DataTypes } = require("sequelize");
const { db } = require("../db");
const { voipDb } = require("../db");

// const cointype = db.define(
//   "cointype",
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
//     CoinName: {
//       type: DataTypes.STRING,
//       require: true,
//     },
//     Status: {
//       type: DataTypes.INTEGER,
//       require: true,
//       defaultValue: 1,
//     },
//     Kanoon_ID: {
//       type: DataTypes.INTEGER,
//       defaultValue: 0,
//       // require: true,
//     },
//   },
//   {
//     freezeTableName: true,
//   }
// );
// module.exports = cointype;

exports.tabloCointype = db.define(
  "cointype",
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
    CoinName: {
      type: DataTypes.STRING,
      require: true,
    },
    Status: {
      type: DataTypes.INTEGER,
      require: true,
      defaultValue: 1,
    },
    Kanoon_ID: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      // require: true,
    },
  },
  {
    freezeTableName: true,
  }
);
exports.voipCointype = voipDb.define(
  "CoinType",
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
    CoinName: {
      type: DataTypes.STRING,
      require: true,
    },
    Status: {
      type: DataTypes.INTEGER,
      require: true,
      defaultValue: 1,
    },
    Kanoon_ID: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      // require: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);
