const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin-controller");

router.post("/updateTabloBLV", adminController.updateBLV);
router.post("/updateTabloPelatin", adminController.updatePelatin);
router.post("/updateTabloPasag", adminController.updatePasag);

router.get("/getCoinNames", adminController.getCoinNames);

router.post("/getCoins", adminController.getCoins);

router.get("/getUpdateAtCoin", adminController.getUpdateAtCoin);
router.get("/getAllCoins", adminController.getAllCoins);

// router.get("/turnOFFTablo", adminController.turnOFFTablo);
router.get("/turnOFFTabloPasage", adminController.turnOFFTabloPasage);
router.get("/turnOFFTabloBLV", adminController.turnOFFTabloBLV);
router.get("/turnOFFTabloPelatin", adminController.turnOFFTabloPelatin);

// router.get("/locationExist/:location", adminController.setLocation);
// router.get("/setLocation/:location", adminController.setLocation);
router.get("/getConfig/:location", adminController.getConfig);
router.post("/registerConfig", adminController.registerConfig);

router.post("/updateVoipByBLV", adminController.updateVoipByBLV);
router.post("/updateVoipByPelatin", adminController.updateVoipByPelatin);
router.post("/updateVoipByPasag", adminController.updateVoipByPasag);

module.exports = router;
