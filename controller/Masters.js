const MasterRoute = require("express").Router();
const Country = require("../models/Country");

MasterRoute.get("/country", async (req, res) => {
  let condition = req.body || {};
  Country.getCountry(condition)
    .then((countryList) => {
      res.status(200).json({
        data: countryList[0].country,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

module.exports = MasterRoute;
