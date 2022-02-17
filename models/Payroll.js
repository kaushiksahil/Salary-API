let mongoose = require("mongoose");

let Payroll = mongoose.Schema({
  ctc: { type: Object },
  bank: { type: Object },
  compansationPlan: { type: Object },
  enterpriseId: Number,
  createdDate: { type: Date, default: new Date() },
});

Payroll.statics.addPayroll = async (_payroll) => {
  let userPayroll = new PayrollModal(_payroll);
  console.log("Going to save userPayroll...");
  let savedPayroll = await userPayroll.save();
  console.log("Used saved successfully!!");
  return savedPayroll;
};

Payroll.statics.getPayroll = async function (condition) {
  let payrollComponent = await this.find(condition).exec();
  return payrollComponent;
};

var PayrollModal = mongoose.model("payrolls", Payroll);
module.exports = PayrollModal;
