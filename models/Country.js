let mongoose = require("mongoose");

let Country = mongoose.Schema({
  country: [
    {
      country: { type: String, default: "" },
      alpha2Code: { type: String, default: "" },
      alpha3Code: { type: String, default: "" },
      numberCode: { type: String, default: "" },
      states: [
        {
          type: String,
        },
      ],
    },
  ],
});

Country.statics.getCountry = async function (condition) {
  let country = await this.find(condition).exec();
  return country;
};
Country.statics.getCountryByNumberCode = async function (condition) {
  let country = await this.findOne(condition, {
    "country.$": 1,
  }).exec();
  return country;
};

var CountryModal = mongoose.model("countries", Country);
module.exports = CountryModal;
