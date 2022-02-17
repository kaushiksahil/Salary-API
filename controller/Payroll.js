var PayrollRouter = require("express").Router();
const PayrollModal = require("../models/Payroll");

PayrollRouter.post("/add", async (req, res) => {
  PayrollModal.addPayroll(req.body)
    .then(function (userPayroll) {
      res.status(200).json({
        data: userPayroll,
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

PayrollRouter.get("/:id", async (req, res) => {
  // let name = req.params.name;
  let id = req.params.id;
  let condition = { enterpriseId: Number(id) };
  // let selectField = name + ".$";
  // let fieldCondition = { [selectField]: 1 };
  PayrollModal.getPayroll(condition)
    .then(function (employeeData) {
      res.status(200).json({
        data: employeeData,
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});
module.exports = PayrollRouter;
