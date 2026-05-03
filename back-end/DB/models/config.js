const { DataTypes } = require("sequelize");
const { db } = require("../db");

const config = db.define(
  "config",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
      require: true,
    },
    blvUpdateSite: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pelatinUpdateSite: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pasagUpdateSite: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    blvUpdateTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pelatinUpdateTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pasagUpdateTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },

    blvTurnONOFFTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pelatinTurnONOFFTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
    },
    pasagTurnONOFFTablo: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },

    blvUpdateVoip: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pelatinUpdateVoip: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
    pasagUpdateVoip: {
      type: DataTypes.BOOLEAN,
      require: true,
      defaultValue: false,
    },
  },
  {
    freezeTableName: true,
  }
);
module.exports = config;
