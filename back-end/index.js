const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const { db, voipDb } = require("./DB/db.js");

// const Coin = require("./models/cointype");
const { tabloCointype, voipCointype } = require("./DB/models/cointype.js");
const Coin = tabloCointype;
const VoipCoin = voipCointype;

const CoinPricePelatin = require("./DB/models/coinprice_archivePelatin.js");
const CoinPriceStaticPelatin = require("./DB/models/coinpricePelatin.js");
// const CoinPriceStaticVoip = require("./DB/models/coinprice.js");
const { tabloCoinprice, voipCoinprice } = require("./DB/models/coinprice.js");
const CoinPriceStatic = tabloCoinprice;
const VoipCoinPriceStatic = voipCoinprice;

const CoinPriceVoip = require("./DB/models/coinprice_archive");

const CoinPricePasag = require("./DB/models/coinprice_archivePasag.js");
const CoinPriceStaticPasag = require("./DB/models/coinpricePasag.js");

const CoinPriceBLV = require("./DB/models/coinprice_archiveBLV.js");
const CoinPriceStaticBLV = require("./DB/models/coinpriceBLV.js");
const Config = require("./DB/models/config.js");
const Permission = require("./DB/models/permission.js");

const adminRoutes = require("./routes/admin-routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  return next();
});

app.use("/api", adminRoutes);

const {
  initialCoin,
  initialVoipCoin,
  initialCoinPriceBLV,
  initialCoinPricePasag,
  initialCoinPricePelatin,
  initialCoinPriceStatic,
  initialVoipCoinPriceStatic,
  initialCoinPriceStaticBLV,
  initialCoinPriceStaticPasag,
  initialCoinPriceStaticPelatin,
} = require("./DB/initial");

app.use(bodyParser.json());

CoinPriceVoip.belongsTo(Coin, { foreignKey: "IdT" });
CoinPriceStatic.belongsTo(Coin, { foreignKey: "IdT" });
VoipCoinPriceStatic.belongsTo(VoipCoin, { foreignKey: "IdT" });

CoinPriceBLV.belongsTo(Coin, { foreignKey: "IdT" });
CoinPriceStaticBLV.belongsTo(Coin, { foreignKey: "IdT" });

CoinPricePelatin.belongsTo(Coin, { foreignKey: "IdT" });
CoinPriceStaticPelatin.belongsTo(Coin, { foreignKey: "IdT" });

CoinPricePasag.belongsTo(Coin, { foreignKey: "IdT" });
CoinPriceStaticPasag.belongsTo(Coin, { foreignKey: "IdT" });
Config.belongsTo(Permission);

db.sync()
  //.sync({ force: true })
  .then((result) => {
    voipDb.sync().then((result) => {
      const server = app.listen(5000, () => {
        console.log(`Now listening on port ${5000}`);
      });

      const io = require("./socket.js").init(server);
      io.on("connection", (socket) => {
        console.log("socket connected ...");
      });
    });
  })
  .catch((err) => {
    console.log(err);
  });

Coin.sync()
  .then(async () => {
    try {
      const finded = await Coin.findAll();
      if (finded.length == 0) {
        await initialCoin();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });
VoipCoin.sync()
  .then(async () => {
    try {
      const finded = await VoipCoin.findAll();
      if (finded.length == 0) {
        await initialVoipCoin();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPriceStatic.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceStaticBLV.findAll();
      if (finded.length == 0) {
        await initialCoinPriceStaticBLV();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

VoipCoinPriceStatic.sync()
  .then(async () => {
    try {
      const finded = await VoipCoinPriceStatic.findAll();
      if (finded.length == 0) {
        await initialVoipCoinPriceStatic();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPriceStaticBLV.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceStaticBLV.findAll();
      if (finded.length == 0) {
        await initialCoinPriceStaticBLV();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPriceBLV.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceBLV.findAll();
      if (finded.length == 0) {
        await initialCoinPriceBLV();
      }
    } catch (Err) {
      // console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPriceStaticPasag.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceStaticPasag.findAll();
      if (finded.length == 0) {
        await initialCoinPriceStaticPasag();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPricePasag.sync()
  .then(async () => {
    try {
      const finded = await CoinPricePasag.findAll();
      if (finded.length == 0) {
        await initialCoinPricePasag();
      }
    } catch (Err) {
      // console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPriceStaticPelatin.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceStaticPelatin.findAll();
      if (finded.length == 0) {
        await initialCoinPriceStaticPelatin();
      }
    } catch (Err) {
      //  console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });

CoinPricePelatin.sync()
  .then(async () => {
    try {
      const finded = await CoinPriceBLV.findAll();
      if (finded.length == 0) {
        await initialCoinPricePelatin();
      }
    } catch (Err) {
      // console.log(Err);
    }
  })
  .catch((err) => {
    //  console.log(err);
  });
