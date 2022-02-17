let mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const Country = require("./Country");

autoIncrement.initialize(mongoose.connection);

let Employee = mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name must be provided"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name must be provided"],
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  experience: String,
  doj: { type: Date },
  designation: String,
  enterpriseEmail: String,
  enterpriseId: Number,
  address: {
    address1: {
      type: String,
      required: [true, "Address1 must be provided"],
    },
    address2: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "City must be provided"],
    },
    state: {
      type: String,
      required: [true, "State must be provided"],
    },
    country: {
      type: String,
      required: [true, "Country must be provided"],
    },
    zipcode: {
      type: String,
      required: [true, "ZipCode must be provided"],
    },
  },
});

Employee.plugin(autoIncrement.plugin, {
  model: "employee",
  field: "enterpriseId",
  startAt: 10001,
  incrementBy: 1,
});

Employee.statics.createEmployee = async (user) => {
  let _user;
  let employee = new EmployeeModal(user);
  console.log("Going to save user...");
  let savedUser = await employee.save();
  _user = savedUser.toJSON();
  if (savedUser) {
    let countryCondition = {
      "country.numberCode": savedUser.address.country,
    };
    let country = await Country.getCountryByNumberCode(countryCondition);
    console.log("asas", country.country[0].country);
    _user.address.country = country.country[0].country;
  }
  console.log("Used saved successfully!!");
  return _user;
};

Employee.statics.getEmployeeByEnterpriseId = async function (condition) {
  let employee = await this.find(condition).exec();
  return employee;
};

Employee.statics.getEmployeeName = async function (condition) {
  let employeeName = [];
  let employee = await this.find(condition).exec();
  employee.forEach((element) => {
    employeeName.push({
      id: element.enterpriseId,
      name: `${element.firstName} ${element.lastName} - ${element.enterpriseEmail}`,
    });
  });
  // console.log("opoppoo", employeeName);
  return employeeName;
};

var EmployeeModal = mongoose.model("employee", Employee);
module.exports = EmployeeModal;
