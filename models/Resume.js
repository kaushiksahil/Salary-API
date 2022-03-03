let mongoose = require("mongoose");
var Binary = require("mongodb").Binary;

let Resume = mongoose.Schema({
  fileName: String,
  enterpriseId: Number,
  type: String,
  file: { type: Object },
});

Resume.statics.saveResume = async (file, fileDetails) => {
  var insert_data = Binary(fileDetails.resumePath);
  let fileObject = {
    fileName: file.originalname,
    enterpriseId: fileDetails.eid,
    type: file.mimetype,
    file: insert_data,
  };
  let userResume = new ResumeModal(fileObject);
  console.log("Going to save Resume...");
  let savedResume = await userResume.save();
  console.log("Resume saved successfully!!");
  return savedResume;
};

Resume.statics.getResume = async (condition) => {
  console.log("in getResume", condition);
  let resume = await ResumeModal.findOne(condition).exec();
  return resume;
};

var ResumeModal = mongoose.model("resumes", Resume);
module.exports = ResumeModal;
