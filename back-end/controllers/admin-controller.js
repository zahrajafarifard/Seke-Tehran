const net = require("net");
const { converter } = require("javascript-binary-converter");

// const Coin = require("../DB/models/cointype");
const { tabloCointype, voipCointype } = require("../DB/models/cointype");
const Coin = tabloCointype;
const VoipCoin = voipCointype;

const CoinPriceBLV = require("../DB/models/coinprice_archiveBLV");
const CoinPricePasag = require("../DB/models/coinprice_archivePasag");
const CoinPricePelatin = require("../DB/models/coinprice_archivePelatin");
const CoinPrice = require("../DB/models/coinprice_archive");

// const CoinPriceStatic = require("../DB/models/coinprice");
const { tabloCoinprice, voipCoinprice } = require("../DB/models/coinprice");
const CoinPriceStatic = tabloCoinprice;
const VoipCoinPriceStatic = voipCoinprice;

const CoinPriceStaticBLV = require("../DB/models/coinpriceBLV");
const CoinPriceStaticPasag = require("../DB/models/coinpricePasag");
const CoinPriceStaticPelatin = require("../DB/models/coinpricePelatin");
const Config = require("../DB/models/config");
const Permission = require("../DB/models/permission");
const io = require("../socket");
const { Op } = require("sequelize");

var sharp = require("sharp");
var moment = require("moment-jalaali");
moment().format("jYYYY/jM/jD");
const path = require("path");

// exports.setLocation = async (req, res, next) => {
//   let _findedPermission;
//   const _location = req.params.location;

//   _findedPermission = await Permission.findOne({
//     where: {
//       location: _location,
//     },
//   });
//   if (_findedPermission === null || !_findedPermission) {
//     _findedPermission = await Permission.create({
//       location: _location,
//     });

//     return res.status(201).json({ data: _findedPermission });
//   }

//   return res.status(200).json({ data: _findedPermission });
// };
exports.getConfig = async (req, res, next) => {
  const _location = req.params.location;
  // console.log("__________loc", _location);
  let _config = await Config.findOne({
    where: {
      permissionLocation: _location,
    },
  });
  // console.log("cccccccccc", _config);
  return res.status(200).json({ data: _config });
};

exports.updateVoipByBLV = async (req, res) => {
  const coin = await req.body.coin;
  const coinPrice = await req.body.coinPrice;
  await updateVoip(coin, coinPrice, res);
};
exports.updateVoipByPelatin = async (req, res) => {
  const coin = await req.body.coin;
  const coinPrice = await req.body.coinPrice;
  await updateVoip(coin, coinPrice, res);
};
exports.updateVoipByPasag = async (req, res) => {
  const coin = await req.body.coin;
  const coinPrice = await req.body.coinPrice;
  await updateVoip(coin, coinPrice, res);
};

//* update voip DB (192.168.40.244)
const updateVoipDb = async (coin, coinPrice, res) => {
  [coinPrice[0], coinPrice[1]] = [coinPrice[1], coinPrice[0]];
  [coin[0], coin[1]] = [coin[1], coin[0]];

  // Get the current date and time
  const now = new Date();
  // Subtract 5 minutes from the current date
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60000);

  try {
    for (let index = 0; index < coin.length; index++) {
      const finded = await VoipCoinPriceStatic.findOne({
        where: {
          IdT: index * 2 + 1,
          BuySell: 0,
          Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          Date: {
            [Op.between]: [fiveMinutesAgo, now],
          },
        },
      });
      if (!finded) {
        await VoipCoinPriceStatic.create({
          IdT: index * 2 + 1,
          BuySell: 0,
          Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
        });
      }

      const finded2 = await VoipCoinPriceStatic.findOne({
        where: {
          IdT: index * 2 + 2,
          BuySell: 1,
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          Date: {
            [Op.between]: [fiveMinutesAgo, now],
          },
        },
      });
      if (!finded2) {
        await VoipCoinPriceStatic.create({
          IdT: index * 2 + 2,
          BuySell: 1,
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
        });
      }

      await VoipCoin.update(
        {
          Status: coin[index].BuyStatus,
        },
        {
          where: {
            Id: index * 2 + 1,
            BuySell: 0,
          },
        }
      );

      await VoipCoin.update(
        {
          Status: coin[index].SellStatus,
        },
        {
          where: {
            Id: index * 2 + 2,
            BuySell: 1,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  // return res.status(200).json({ data: "ok" });
};

const updateVoip = async (coin, coinPrice, res) => {
  try {
    for (let index = 0; index < coin.length; index++) {
      const finded = await CoinPriceStatic.findOne({
        where: {
          id: index * 2 + 1,
        },
      });

      if (
        +finded.Price !== +String(coinPrice[index].buyPrice).replace(/,/g, "")
      ) {
        await CoinPrice.create({
          Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          IdT: index * 2 + 1,
          BuySell: 0,
        });
        await CoinPriceStatic.update(
          {
            Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 1,
              BuySell: 0,
            },
          }
        );
      }

      const finded2 = await CoinPriceStatic.findOne({
        where: {
          id: index * 2 + 2,
        },
      });

      if (
        +finded2.Price !== +String(coinPrice[index].sellPrice).replace(/,/g, "")
      ) {
        await CoinPrice.create({
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          IdT: index * 2 + 2,
          BuySell: 1,
        });
        await CoinPriceStatic.update(
          {
            Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 2,
              BuySell: 1,
            },
          }
        );
      }

      await Coin.update(
        {
          Status: coin[index].BuyStatus,
        },
        {
          where: {
            id: index * 2 + 1,
            BuySell: 0,
          },
        }
      );

      await Coin.update(
        {
          Status: coin[index].SellStatus,
        },
        {
          where: {
            id: index * 2 + 2,
            BuySell: 1,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
  //* update Voip DB
  await updateVoipDb(coin, coinPrice, res);
  return res.status(200).json({ data: "ok" });
};

exports.registerConfig = async (req, res) => {
  // let _config;
  const {
    blvUpdateSite,
    pelatinUpdateSite,
    pasagUpdateSite,

    blvUpdateTablo,
    pasagUpdateTablo,
    pelatinUpdateTablo,

    blvTurnONOFFTablo,
    pasagTurnONOFFTablo,
    pelatinTurnONOFFTablo,

    blvUpdateVoip,
    pasagUpdateVoip,
    pelatinUpdateVoip,
    location,
  } = req.body;

  // console.log("bbbbbbbbbbbbbbbbbbb", location);

  ///////////////////////////////////////////////////////////////
  let _findedPermission = await Permission.findOne({
    where: {
      location: location,
    },
  });

  if (!_findedPermission) {
    _findedPermission = await Permission.create({
      location: location,
      blv:
        blvUpdateSite || blvUpdateTablo || blvTurnONOFFTablo || blvUpdateVoip
          ? 1
          : 0,
      pelatin:
        pelatinUpdateSite ||
        pelatinUpdateTablo ||
        pelatinTurnONOFFTablo ||
        pelatinUpdateVoip
          ? 1
          : 0,
      pasag:
        pasagUpdateSite ||
        pasagUpdateTablo ||
        pasagTurnONOFFTablo ||
        pasagUpdateVoip
          ? 1
          : 0,
    });
  } else {
    (_findedPermission.pelatin =
      pelatinUpdateSite ||
      pelatinUpdateTablo ||
      pelatinTurnONOFFTablo ||
      pelatinUpdateVoip
        ? 1
        : 0),
      (_findedPermission.pasag =
        pasagUpdateSite ||
        pasagUpdateTablo ||
        pasagTurnONOFFTablo ||
        pasagUpdateVoip
          ? 1
          : 0),
      (_findedPermission.blv =
        blvUpdateSite || blvUpdateTablo || blvTurnONOFFTablo || blvUpdateVoip
          ? 1
          : 0),
      (_findedPermission.location = location),
      await _findedPermission.save();
  }
  ///////////////////////////////////////////////////////////////

  let _findedConfig = await Config.findOne({
    where: {
      permissionLocation: location,
    },
  });

  if (!_findedConfig) {
    _findedConfig = await Config.create({
      blvUpdateSite,
      pelatinUpdateSite,
      pasagUpdateSite,

      blvUpdateTablo,
      pasagUpdateTablo,
      pelatinUpdateTablo,

      blvTurnONOFFTablo,
      pasagTurnONOFFTablo,
      pelatinTurnONOFFTablo,

      blvUpdateVoip,
      pasagUpdateVoip,
      pelatinUpdateVoip,
      permissionLocation: _findedPermission.location,
    });
  } else {
    (_findedConfig.blvUpdateSite = blvUpdateSite),
      (_findedConfig.pelatinUpdateSite = pelatinUpdateSite),
      (_findedConfig.pasagUpdateSite = pasagUpdateSite),
      (_findedConfig.blvUpdateTablo = blvUpdateTablo),
      (_findedConfig.pasagUpdateTablo = pasagUpdateTablo),
      (_findedConfig.pelatinUpdateTablo = pelatinUpdateTablo),
      (_findedConfig.blvTurnONOFFTablo = blvTurnONOFFTablo),
      (_findedConfig.pasagTurnONOFFTablo = pasagTurnONOFFTablo),
      (_findedConfig.pelatinTurnONOFFTablo = pelatinTurnONOFFTablo),
      (_findedConfig.blvUpdateVoip = blvUpdateVoip),
      (_findedConfig.pasagUpdateVoip = pasagUpdateVoip),
      (_findedConfig.pelatinUpdateVoip = pelatinUpdateVoip),
      (_findedConfig.permissionLocation = _findedPermission.location),
      await _findedConfig.save();
  }

  // console.log("_config", _config);
  // console.log("created", created);

  return res.status(200).json({ data: _findedConfig });
};

exports.getCoins = async (req, res) => {
  const table = req.body.table;
  let _coins;

  try {
    if (table.trim() === "bolvaar") {
      _coins = await CoinPriceStaticBLV.findAll({});
    }
    if (table.trim() === "pasaage") {
      _coins = await CoinPriceStaticPasag.findAll({});
    }
    if (table.trim() === "pelatin") {
      _coins = await CoinPriceStaticPelatin.findAll({});
    }
    return res.status(200).json({ data: _coins });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
};

const createCoinImagePasag = async (coins, coinName) => {
  try {
    let metadata;
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-1.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
      <svg width="${width}" height="${height}" fill='yellow'>
      <text x="440" y="45" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">سکه</text>
      <text x="250" y="45" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">خرید</text>
      <text x="75" y="45" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">فروش</text>
      </svg>
      `;

    const elements = [
      {
        input: Buffer.from(svgImage),
        gravity: "northwest",
      },
    ];
    for (let index = 0; index < coins.length; index++) {
      const element = {
        input: Buffer.from(
          `
        <svg width="${width}" height="${height}" >
        <style>
        .txt { fill:yellow; font-size:28px; font-weight: bold; font-family:"B Titr"; }
        .price { fill:#fff; font-size: 35px; font-weight: bold; }
        </style>

        <text x="508" y="${
          100 + index * 61
        }"  text-anchor="end"  class="txt">${String(
            coinName[index].CoinName
          )}</text>
          
        <text x="338" y="${
          100 + index * 61
        }" text-anchor="end"  class="price">${coins[
            index
          ].buyPrice.toLocaleString()}</text>
        <text x="165" y="${
          100 + index * 61
        }" text-anchor="end"   class="price">${coins[
            index
          ].sellPrice.toLocaleString()}</text>
          </svg>        `
        ),
        gravity: "northwest",
      };
      elements.push(element);
    }

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "blue",
      },
    })
      .composite(elements)
      .toFile(path.join(__dirname, "..", "pic", "pasage.png"));
  } catch (error) {
    console.log(error);
  }
};
const createCoinImageBLV = async (coins, coinName) => {
  try {
    let metadata;
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-2.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
      <svg width="${width}" height="${height}" fill='yellow'  >
      <text x="400" y="20" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">سکه</text>
      <text x="230" y="20" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">خرید</text>
      <text x="75" y="20" text-anchor="middle" font-size="22" font-weight="bold" font-family="B Titr">فروش</text>
      </svg>
      `;

    const elements = [
      {
        input: Buffer.from(svgImage),
        gravity: "northwest",
      },
    ];
    for (let index = 0; index < coins.length; index++) {
      const element = {
        input: Buffer.from(
          `
        <svg width="${width}" height="${height}" >
        <style >
        .txt { fill:yellow; font-size:28px; font-weight: bold;  font-family:"B Titr";}
        .price { fill:#fff; font-size: 32px; font-weight: bold;}
        </style>

        <text x="475" y="${
          58 + index * 43
        }"  text-anchor="end"  class="txt">${String(
            coinName[index].CoinName
          )}</text>
          
        <text x="305" y="${
          58 + index * 43
        }" text-anchor="end"  class="price">${coins[
            index
          ].buyPrice.toLocaleString()}</text>
        <text x="152" y="${
          58 + index * 43
        }" text-anchor="end"   class="price">${coins[
            index
          ].sellPrice.toLocaleString()}</text>
          </svg>        `
        ),
        gravity: "northwest",
      };
      elements.push(element);
    }

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "blue",
      },
    })
      .composite(elements)
      .toFile(path.join(__dirname, "..", "pic", "boulvar.png"));
  } catch (error) {
    console.log(error);
  }
};
const createCoinImagePelatin = async (coins, coinName) => {
  try {
    let metadata;
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-3.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    console.log(width, height);

    const svgImage = `
      <svg width="${width}" height="${height}" fill='yellow' >
      <text x="620" y="20" text-anchor="middle" font-size="21" font-weight="bold" font-family="B Titr">سکه</text>
      <text x="340" y="20" text-anchor="middle" font-size="21" font-weight="bold" font-family="B Titr">خرید</text>
      <text x="110" y="20" text-anchor="middle" font-size="21" font-weight="bold" font-family="B Titr">فروش</text>
      </svg>
      `;

    const elements = [
      {
        input: Buffer.from(svgImage),
        gravity: "northwest",
      },
    ];
    for (let index = 0; index < coins.length; index++) {
      const element = {
        input: Buffer.from(
          `
        <svg width="${width}" height="${height}">
        <style >
        .txt { fill:yellow; font-size:34px; font-weight: bold; font-family:"B Titr"; }
        .price { fill:#fff; font-size: 40px; font-weight: bold; }
        </style>

        <text x="700" y="${
          60 + index * 41
        }"  text-anchor="end"  class="txt">${String(
            coinName[index].CoinName
          )}</text>
          
        <text x="440" y="${
          60 + index * 41
        }" text-anchor="end"  class="price">${coins[
            index
          ].buyPrice.toLocaleString()}</text>
        <text x="210" y="${
          60 + index * 41
        }" text-anchor="end"   class="price">${coins[
            index
          ].sellPrice.toLocaleString()}</text>
          </svg>        `
        ),
        gravity: "northwest",
      };
      elements.push(element);
    }

    await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "blue",
      },
    })
      .composite(elements)
      .toFile(path.join(__dirname, "..", "pic", "pelatin.png"));
  } catch (error) {
    console.log(error);
  }
};

exports.turnOFFTabloPasage = async (req, res, next) => {
  let metadata;
  try {
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-1.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
    <svg width="${width}" height="${height}"  >
    
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "black",
      },
    })
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(path.join(__dirname, "..", "pic", "pasage.png"));
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ msg: "Turn Off pannel 1" });
};

exports.turnOFFTabloPelatin = async (req, res, next) => {
  let metadata;
  try {
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-3.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
    <svg width="${width}" height="${height}"  >
    
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "black",
      },
    })
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(path.join(__dirname, "..", "pic", "pelatin.png"));
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ msg: "Turn Off pannel 3" });
};
exports.turnOFFTabloBLV = async (req, res, next) => {
  let metadata;
  try {
    metadata = await sharp(
      path.join(__dirname, "..", "pic", "coin-2.png")
    ).metadata();

    const width = metadata.width;
    const height = metadata.height;

    const svgImage = `
    <svg width="${width}" height="${height}" >
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp({
      create: {
        width,
        height,
        channels: 4,
        background: "black",
      },
    })
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(path.join(__dirname, "..", "pic", "boulvar.png"));
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({ msg: "Turn Off pannel 2" });
};

exports.getUpdateAtCoin = async (req, res) => {
  const updatedAt = await CoinPriceBLV.findOne({
    order: [["Date", "DESC"]],
  });
  // console.log("uuuuu");
  res.send(updatedAt);
};

exports.updateBLV = async (req, res) => {
  try {
    const _coins = await req.body.coin;
    const _coinPrice = await req.body.coinPrice;

    console.log("_coinPrice", _coinPrice);

    await updateCoinTableBLV(_coins, _coinPrice, res);

    const coins = _coinPrice.slice(0, 5);
    const coins2 = _coins.slice(0, 5);

    await createCoinImageBLV(coins, coins2);

    return res.status(200).json({ data: "pannel is updated ..." });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
exports.updatePelatin = async (req, res) => {
  try {
    const _coins = await req.body.coin;
    const _coinPrice = await req.body.coinPrice;

    await updateCoinTablePelatin(_coins, _coinPrice, res);

    //---------------------------------------

    const coinsPelatin = _coinPrice.slice(0, 8);

    coinsPelatin.map((coinPlatin) => {
      coinPlatin.buyPrice = +String(coinPlatin.buyPrice).replace(/,/g, "");
      coinPlatin.sellPrice = +String(coinPlatin.sellPrice).replace(/,/g, "");
    });

    //you should send 24 items
    let coinPricePelatin = [...coinsPelatin, ...coinsPelatin, ...coinsPelatin];

    await updateTabloPelatin(coinPricePelatin, res); //vaghari pelatin
    //---------------------------------------

    const coins = _coinPrice.slice(0, 4);
    const coins2 = _coins.slice(0, 4);

    await createCoinImagePelatin(coins, coins2);

    return res.status(200).json({ data: "pannel is updated ..." });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};
exports.updatePasag = async (req, res) => {
  try {
    const _coins = await req.body.coin;
    const _coinPrice = await req.body.coinPrice;

    await updateCoinTablePasag(_coins, _coinPrice, res);

    const coins = _coinPrice.slice(0, 5);
    const coins2 = _coins.slice(0, 5);

    await createCoinImagePasag(coins, coins2);

    let _coinsTablo1 = [...coins];

    _coinsTablo1.map((coin) => {
      coin.buyPrice = +String(coin.buyPrice).replace(/,/g, "") / 1000;
      coin.sellPrice = +String(coin.sellPrice).replace(/,/g, "") / 1000;
    });

    // console.log("CCCCCCCCCCCCCCcoinPrice", _coinsTablo1);

    //you should send 24 items , the 16 first items do not matter ==> 17 to 21 are the right prices in pannel :)
    let coinPrice = [
      ..._coinsTablo1,
      ..._coinsTablo1,
      ..._coinsTablo1,
      ..._coinsTablo1.slice(0, 1),
      ..._coinsTablo1, // these are important
      ..._coinsTablo1.slice(0, 3),
    ];

    await updateTabloPasag(coinPrice, res); //vaghari pasag

    return res.status(200).json({ data: "pannel is updated ..." });
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateTabloPelatin = async (req, res) => {
  var HOST = "192.168.164.90";
  var PORT = 8080;

  var client = new net.Socket();

  let CRC = 0;
  let send = new Buffer.alloc(1);
  try {
    client.connect(PORT, HOST, async function () {
      console.log("CONNECTED TO :  " + HOST + ":" + PORT);

      send[0] = 127;
      client.write(send);

      CRC = send[0];

      send[0] = 1;
      client.write(send);
      CRC = CRC + send[0];

      send[0] = 13;

      CRC = CRC + send[0];
      client.write(send);

      for (let index = 0; index < 24; index++) {
        for (let indexT = 0; indexT < 2; indexT++) {
          // two cols --- buy and sell
          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000000) / 10000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000000) / 10000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 10000000) / 1000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 10000000) / 1000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 1000000) / 100000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 1000000) / 100000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000) / 10000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000) / 10000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10000) / 1000 + 48).toInteger()
              : converter(
                  (req[index].sellPrice % 10000) / 1000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 1000) / 100 + 48).toInteger()
              : converter((req[index].sellPrice % 1000) / 100 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 100) / 10 + 48).toInteger()
              : converter((req[index].sellPrice % 100) / 10 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10) + 48).toInteger()
              : converter((req[index].sellPrice % 10) + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
        }
      }

      send[0] = converter(CRC % 256).toInteger();

      client.write(send);

      send[0] = converter(CRC / 256).toInteger();

      client.write(send);
    });

    client.on("data", (data) => {
      //  console.log("data...");
    });
    client.on("error", () => {
      console.log("Connection error to : 192.168.164.90");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Failed..." });
  }
};
const updateTabloPasag = async (req, res) => {
  var HOST = "192.168.40.78";
  var PORT = 8080;

  var client = new net.Socket();
  let CRC = 0;
  let send = new Buffer.alloc(1);

  try {
    client.connect(PORT, HOST, async function () {
      console.log("CONNECTED TO: " + HOST + ":" + PORT);

      send[0] = 127;
      client.write(send);
      CRC = send[0];

      send[0] = 1;
      client.write(send);
      CRC = CRC + send[0];

      send[0] = 13;
      CRC = CRC + send[0];
      client.write(send);

      for (let index = 0; index < 24; index++) {
        for (let indexT = 0; indexT < 2; indexT++) {
          // two cols --- buy and sell
          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000000) / 10000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000000) / 10000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);

          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 10000000) / 1000000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 10000000) / 1000000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 1000000) / 100000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 1000000) / 100000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter(
                  (req[index].buyPrice % 100000) / 10000 + 48
                ).toInteger()
              : converter(
                  (req[index].sellPrice % 100000) / 10000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);

          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10000) / 1000 + 48).toInteger()
              : converter(
                  (req[index].sellPrice % 10000) / 1000 + 48
                ).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 1000) / 100 + 48).toInteger()
              : converter((req[index].sellPrice % 1000) / 100 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 100) / 10 + 48).toInteger()
              : converter((req[index].sellPrice % 100) / 10 + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);

          send[0] =
            indexT === 1
              ? converter((req[index].buyPrice % 10) + 48).toInteger()
              : converter((req[index].sellPrice % 10) + 48).toInteger();

          CRC = CRC + send[0];
          client.write(send);
          send[0] = 0;
          CRC = CRC + send[0];
          client.write(send);
        }
      }

      send[0] = converter(CRC % 256).toInteger();

      client.write(send);

      send[0] = converter(CRC / 256).toInteger();

      client.write(send);
    });

    client.on("data", (data) => {
      // console.log("data...");
    });
    client.on("error", () => {
      console.log("Connection error to : 192.168.40.78");
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ data: "Failed..." });
  }
};

const updateCoinTablePelatin = async (coin, coinPrice) => {
  try {
    for (let index = 0; index < coin.length; index++) {
      const finded = await CoinPriceStaticPelatin.findOne({
        where: {
          id: index * 2 + 1,
        },
      });

      if (
        +finded.Price !== +String(coinPrice[index]?.buyPrice).replace(/,/g, "")
      ) {
        await CoinPricePelatin.create({
          Price: +String(coinPrice[index]?.buyPrice).replace(/,/g, ""),
          IdT: index * 2 + 1,
          BuySell: 0,
        });
        await CoinPriceStaticPelatin.update(
          {
            Price: +String(coinPrice[index]?.buyPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 1,
              BuySell: 0,
            },
          }
        );
      }

      const finded2 = await CoinPriceStaticPelatin.findOne({
        where: {
          id: index * 2 + 2,
        },
      });

      if (
        +finded2.Price !== +String(coinPrice[index].sellPrice).replace(/,/g, "")
      ) {
        await CoinPricePelatin.create({
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          IdT: index * 2 + 2,
          BuySell: 1,
        });
        await CoinPriceStaticPelatin.update(
          {
            Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 2,
              BuySell: 1,
            },
          }
        );
      }

      // await Coin.update(
      //   {
      //     Status: coin[index].BuyStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 1,
      //       BuySell: 0,
      //     },
      //   }
      // );

      // await Coin.update(
      //   {
      //     Status: coin[index].SellStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 2,
      //       BuySell: 1,
      //     },
      //   }
      // );
    }
  } catch (error) {
    console.log(error);
  }
};
const updateCoinTableBLV = async (coin, coinPrice) => {
  console.log("coinPrice", coinPrice);
  try {
    for (let index = 0; index < coin.length; index++) {
      const finded = await CoinPriceStaticBLV.findOne({
        where: {
          id: index * 2 + 1,
        },
      });

      if (
        +finded.Price !== +String(coinPrice[index].buyPrice).replace(/,/g, "")
      ) {
        await CoinPriceBLV.create({
          Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          IdT: index * 2 + 1,
          BuySell: 0,
        });
        await CoinPriceStaticBLV.update(
          {
            Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 1,
              BuySell: 0,
            },
          }
        );
      }

      const finded2 = await CoinPriceStaticBLV.findOne({
        where: {
          id: index * 2 + 2,
        },
      });

      if (
        +finded2.Price !== +String(coinPrice[index].sellPrice).replace(/,/g, "")
      ) {
        await CoinPriceBLV.create({
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          IdT: index * 2 + 2,
          BuySell: 1,
        });
        await CoinPriceStaticBLV.update(
          {
            Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 2,
              BuySell: 1,
            },
          }
        );
      }

      // await Coin.update(
      //   {
      //     Status: coin[index].BuyStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 1,
      //       BuySell: 0,
      //     },
      //   }
      // );

      // await Coin.update(
      //   {
      //     Status: coin[index].SellStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 2,
      //       BuySell: 1,
      //     },
      //   }
      // );
    }

    const _coins = await CoinPriceStaticBLV.findAll({
      include: [
        {
          model: Coin,
        },
      ],
    });
    let arr = [];

    _coins.forEach((element) => {
      if (element.dataValues.id % 2 === 1) {
        arr = [...arr, { id: element.dataValues.id }];
      }

      if (element.dataValues.cointype.BuySell == 0) {
        arr = [...arr, { name: element.dataValues.cointype.CoinName }];
      }

      arr.forEach((el) => {
        if (Number(element.dataValues.id % 2) == el.id) {
          if (element.dataValues.BuySell == 0) {
            arr = [...arr, { buyPrice: element.dataValues.Price }];
          }
        }
        if (Number(element.dataValues.id) == Number(el.id) + 1) {
          if (element.dataValues.BuySell == 1) {
            arr = [...arr, { sellPrice: element.dataValues.Price }];
          }
        }
      });
    });
    const a1 = arr.slice(0, 4);
    const a2 = arr.slice(4, 8);
    const a3 = arr.slice(8, 12);
    const a4 = arr.slice(12, 16);
    const a5 = arr.slice(16, 20);

    await io.getio().emit("getCoinsSocket", [a1, a2, a3, a4, a5]);

    const updatedAt = await CoinPriceBLV.findOne({
      order: [["Date", "DESC"]],
    });
    await io.getio().emit("getUpdateAtCoin", updatedAt);
  } catch (error) {
    console.log(error);
  }
};

const updateCoinTablePasag = async (coin, coinPrice) => {
  try {
    for (let index = 0; index < coin.length; index++) {
      const finded = await CoinPriceStaticPasag.findOne({
        where: {
          id: index * 2 + 1,
        },
      });

      if (
        +finded.Price !== +String(coinPrice[index].buyPrice).replace(/,/g, "")
      ) {
        await CoinPricePasag.create({
          Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          IdT: index * 2 + 1,
          BuySell: 0,
        });
        await CoinPriceStaticPasag.update(
          {
            Price: +String(coinPrice[index].buyPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 1,
              BuySell: 0,
            },
          }
        );
      }

      const finded2 = await CoinPriceStaticPasag.findOne({
        where: {
          id: index * 2 + 2,
        },
      });

      if (
        +finded2.Price !== +String(coinPrice[index].sellPrice).replace(/,/g, "")
      ) {
        await CoinPricePasag.create({
          Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          IdT: index * 2 + 2,
          BuySell: 1,
        });
        await CoinPriceStaticPasag.update(
          {
            Price: +String(coinPrice[index].sellPrice).replace(/,/g, ""),
          },
          {
            where: {
              id: index * 2 + 2,
              BuySell: 1,
            },
          }
        );
      }

      // await Coin.update(
      //   {
      //     Status: coin[index].BuyStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 1,
      //       BuySell: 0,
      //     },
      //   }
      // );

      // await Coin.update(
      //   {
      //     Status: coin[index].SellStatus,
      //   },
      //   {
      //     where: {
      //       id: index * 2 + 2,
      //       BuySell: 1,
      //     },
      //   }
      // );
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getCoinNames = async (req, res) => {
  try {
    const _coins = await Coin.findAll({});
    return res.status(200).json({ data: _coins });
  } catch (error) {
    return res.status(500).json({ data: error });
  }
};
exports.getAllCoins = async (req, res) => {
  const _coins = await CoinPriceStaticBLV.findAll({
    include: [
      {
        model: Coin,
      },
    ],
  });

  let arr = [];

  _coins.forEach((element) => {
    if (element.dataValues.id % 2 === 1) {
      arr = [...arr, { id: element.dataValues.id }];
    }

    if (element.dataValues.cointype.BuySell == 0) {
      arr = [...arr, { name: element.dataValues.cointype.CoinName }];
    }

    arr.forEach((el) => {
      if (Number(element.dataValues.id % 2) == el.id) {
        if (element.dataValues.BuySell == 0) {
          arr = [...arr, { buyPrice: element.dataValues.Price }];
        }
      }
      if (Number(element.dataValues.id) == Number(el.id) + 1) {
        if (element.dataValues.BuySell == 1) {
          arr = [...arr, { sellPrice: element.dataValues.Price }];
        }
      }
    });
  });

  const a1 = arr.slice(0, 4);
  const a2 = arr.slice(4, 8);
  const a3 = arr.slice(8, 12);
  const a4 = arr.slice(12, 16);
  const a5 = arr.slice(16, 20);

  res.status(201).send([a1, a2, a3, a4, a5]);
};
