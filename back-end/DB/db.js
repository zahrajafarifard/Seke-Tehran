const { Sequelize } = require("sequelize");
exports.db = new Sequelize("seketehran-tablo-db", "root", "12345", {
// exports.db = new Sequelize("sarafi", "root", "", {
  dialect: "mysql",
  // host: "192.168.40.2",
  host: "localhost",
  port: "3306",
});

exports.voipDb = new Sequelize("seketehran-voip-db", "root", "12345", {
// exports.voipDb = new Sequelize("Sarafi", "root", "", {
  dialect: "mysql",
  // host: "192.168.40.244",
  host: "localhost",
  port: "3306",
});

// module.exports = tabloDB;
// module.exports = voipDB;
