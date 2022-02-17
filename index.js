const express = require("express");
let API = require("./api-route");
let employeeAPI = require("./controller/Employee");
let masterAPI = require("./controller/Masters");
let payrollAPI = require("./controller/Payroll");
const app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
mongoose.connect("mongodb://localhost/SalarySlip", { useNewUrlParser: true });
var db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");
app.use(bodyParser.json());
var port = process.env.PORT || 4000;
// app.get("/", (req, res) => res.send("Its Working!!"));
// app.use("/init", API);
app.use("/employee", employeeAPI);
app.use("/master", masterAPI);
app.use("/pay", payrollAPI);

app.listen(port, function () {
  console.log("Server Started Now!!");
});
