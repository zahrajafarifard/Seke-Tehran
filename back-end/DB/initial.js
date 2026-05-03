// const Coin = require("./models/cointype");
const { tabloCointype, voipCointype } = require("./models/cointype");
const Coin = tabloCointype;
const VoipCoin = voipCointype;

// const CoinPriceStatic = require("./models/coinprice");
const { tabloCoinprice, voipCoinprice } = require("./models/coinprice");
const CoinPriceStatic = tabloCoinprice;
const VoipCoinPriceStatic = voipCoinprice;

const CoinPricePelatin = require("./models/coinprice_archivePelatin");
const CoinPriceStaticPelatin = require("./models/coinpricePelatin");

const CoinPriceBLV = require("./models/coinprice_archiveBLV");
const CoinPriceStaticBLV = require("./models/coinpriceBLV");

const CoinPricePasag = require("./models/coinprice_archivePasag");
const CoinPriceStaticPasag = require("./models/coinpricePasag");

module.exports.initialCoin = async () => {
  try {
    await Coin.create({ CoinName: "سکه تصویر امامی", BuySell: 0 });
    await Coin.create({ CoinName: "سکه تصویر امامی", BuySell: 1 });

    await Coin.create({ CoinName: "سکه تمام قدیم", BuySell: 0 });
    await Coin.create({ CoinName: "سکه تمام قدیم", BuySell: 1 });

    await Coin.create({ CoinName: "سکه نیم بهار", BuySell: 0 });
    await Coin.create({ CoinName: "سکه نیم بهار", BuySell: 1 });

    await Coin.create({ CoinName: "سکه ربع بهار", BuySell: 0 });
    await Coin.create({ CoinName: "سکه ربع بهار", BuySell: 1 });

    await Coin.create({ CoinName: "سکه یک گرمی", BuySell: 0 });
    await Coin.create({ CoinName: "سکه یک گرمی", BuySell: 1 });

    await Coin.create({ CoinName: "تمام امامی (زیر 86)", BuySell: 0 });
    await Coin.create({ CoinName: "تمام امامی (زیر 86)", BuySell: 1 });

    await Coin.create({ CoinName: "نیم بهار (زیر 86)", BuySell: 0 });
    await Coin.create({ CoinName: "نیم بهار (زیر 86)", BuySell: 1 });

    await Coin.create({ CoinName: "ربع بهار (زیر 86)", BuySell: 0 });
    await Coin.create({ CoinName: "ربع بهار (زیر 86)", BuySell: 1 });

    await Coin.create({ CoinName: "مثقال طلا", BuySell: 0 });
    await Coin.create({ CoinName: "مثقال طلا", BuySell: 1 });

    await Coin.create({ CoinName: "طلا 18 گرمی", BuySell: 0 });
    await Coin.create({ CoinName: "طلا 18 گرمی", BuySell: 1 });

    await Coin.create({ CoinName: "یک انسی", BuySell: 0 });
    await Coin.create({ CoinName: "یک انسی", BuySell: 1 });

    await Coin.create({ CoinName: "نیم انسی", BuySell: 0 });
    await Coin.create({ CoinName: "نیم انسی", BuySell: 1 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialVoipCoin = async () => {
  try {
    await VoipCoin.create({ CoinName: "سکه تصویر امامی", BuySell: 0 });
    await VoipCoin.create({ CoinName: "سکه تصویر امامی", BuySell: 1 });

    await VoipCoin.create({ CoinName: "سکه تمام قدیم", BuySell: 0 });
    await VoipCoin.create({ CoinName: "سکه تمام قدیم", BuySell: 1 });

    await VoipCoin.create({ CoinName: "سکه نیم بهار", BuySell: 0 });
    await VoipCoin.create({ CoinName: "سکه نیم بهار", BuySell: 1 });

    await VoipCoin.create({ CoinName: "سکه ربع بهار", BuySell: 0 });
    await VoipCoin.create({ CoinName: "سکه ربع بهار", BuySell: 1 });

    await VoipCoin.create({ CoinName: "سکه یک گرمی", BuySell: 0 });
    await VoipCoin.create({ CoinName: "سکه یک گرمی", BuySell: 1 });

    await VoipCoin.create({ CoinName: "تمام امامی (زیر 86)", BuySell: 0 });
    await VoipCoin.create({ CoinName: "تمام امامی (زیر 86)", BuySell: 1 });

    await VoipCoin.create({ CoinName: "نیم بهار (زیر 86)", BuySell: 0 });
    await VoipCoin.create({ CoinName: "نیم بهار (زیر 86)", BuySell: 1 });

    await VoipCoin.create({ CoinName: "ربع بهار (زیر 86)", BuySell: 0 });
    await VoipCoin.create({ CoinName: "ربع بهار (زیر 86)", BuySell: 1 });

    await VoipCoin.create({ CoinName: "مثقال طلا", BuySell: 0 });
    await VoipCoin.create({ CoinName: "مثقال طلا", BuySell: 1 });

    await VoipCoin.create({ CoinName: "طلا 18 گرمی", BuySell: 0 });
    await VoipCoin.create({ CoinName: "طلا 18 گرمی", BuySell: 1 });

    await VoipCoin.create({ CoinName: "یک انسی", BuySell: 0 });
    await VoipCoin.create({ CoinName: "یک انسی", BuySell: 1 });

    await VoipCoin.create({ CoinName: "نیم انسی", BuySell: 0 });
    await VoipCoin.create({ CoinName: "نیم انسی", BuySell: 1 });
  } catch (err) {
    //  console.log(err);
  }
};

module.exports.initialCoinPriceBLV = async () => {
  try {
    await CoinPriceBLV.create({ IdT: 1, BuySell: 0 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialCoinPriceStatic = async () => {
  try {
    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 1 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 2 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 3 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 4 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 5 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 6 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 7 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 8 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 9 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 10 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 11 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 12 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 13 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 14 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 15 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 16 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 17 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 18 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 19 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 20 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 21 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 22 });

    await CoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 23 });
    await CoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 24 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialVoipCoinPriceStatic = async () => {
  try {
    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 1 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 2 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 3 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 4 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 5 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 6 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 7 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 8 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 9 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 10 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 11 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 12 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 13 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 14 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 15 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 16 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 17 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 18 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 19 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 20 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 21 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 22 });

    await VoipCoinPriceStatic.create({ BuySell: 0, Status: 0, IdT: 23 });
    await VoipCoinPriceStatic.create({ BuySell: 1, Status: 0, IdT: 24 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialCoinPriceStaticBLV = async () => {
  try {
    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 1 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 2 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 3 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 4 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 5 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 6 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 7 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 8 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 9 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 10 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 11 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 12 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 13 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 14 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 15 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 16 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 17 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 18 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 19 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 20 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 21 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 22 });

    await CoinPriceStaticBLV.create({ BuySell: 0, Status: 0, IdT: 23 });
    await CoinPriceStaticBLV.create({ BuySell: 1, Status: 0, IdT: 24 });
  } catch (err) {
    //  console.log(err);
  }
};

module.exports.initialCoinPricePelatin = async () => {
  try {
    await CoinPricePelatin.create({ IdT: 1, BuySell: 0 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialCoinPriceStaticPelatin = async () => {
  try {
    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 1 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 1 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 2 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 2 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 3 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 3 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 4 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 4 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 5 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 5 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 6 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 6 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 7 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 7 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 8 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 8 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 9 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 9 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 10 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 10 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 11 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 11 });

    await CoinPriceStaticPelatin.create({ BuySell: 0, Status: 0, IdT: 12 });
    await CoinPriceStaticPelatin.create({ BuySell: 1, Status: 0, IdT: 12 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialCoinPricePasag = async () => {
  try {
    await CoinPricePasag.create({ IdT: 1, BuySell: 0 });
  } catch (err) {
    //  console.log(err);
  }
};
module.exports.initialCoinPriceStaticPasag = async () => {
  try {
    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 1 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 1 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 2 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 2 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 3 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 3 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 4 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 4 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 5 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 5 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 6 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 6 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 7 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 7 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 8 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 8 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 9 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 9 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 10 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 10 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 11 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 11 });

    await CoinPriceStaticPasag.create({ BuySell: 0, Status: 0, IdT: 12 });
    await CoinPriceStaticPasag.create({ BuySell: 1, Status: 0, IdT: 12 });
  } catch (err) {
    //  console.log(err);
  }
};
