var EmployeeRouter = require("express").Router();
const Employee = require("../models/Employee");
const Resume = require("../models/Resume");
const multer = require("multer");
const fs = require("fs");

var upload = multer({ dest: "../public/uploads/" });

EmployeeRouter.post("/add", async (req, res) => {
  let user = req.body;
  user.enterpriseEmail = `${user.firstName}.${user.lastName}@affluence.com`;
  Employee.createEmployee(req.body)
    .then(function (newUser) {
      res.status(200).json({
        data: newUser,
      });
    })
    .catch(function (err) {
      console.log(err);
      let response = {
        type: "ValidationError",
      };
      let errorResponse = {};
      if (err.name == "ValidationError") {
        Object.keys(err.errors).forEach((key) => {
          errorResponse[key] = err.errors[key].message;
        });
        response.errorFields = errorResponse;
        res.status(422).json(response);
      }
      if (err.keyPattern.email) {
        errorResponse = {
          email: "Email is already available",
        };
        response.errorFields = errorResponse;
        res.status(422).json(response);
      } else {
        res.status(500).json(err);
      }
    });
});

EmployeeRouter.get("/:id/employee", async (req, res) => {
  let id = req.params.id;
  let condition = { enterpriseId: id };
  Employee.getEmployeeByEnterpriseId(condition)
    .then(function (employeeData) {
      res.status(200).json({
        data: employeeData,
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

EmployeeRouter.get("/name", async (req, res) => {
  Employee.getEmployeeName()
    .then(function (employeeData) {
      res.status(200).json({
        data: employeeData,
      });
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

EmployeeRouter.post("/resume", upload.array("resume"), async (req, res) => {
  console.log("API resume begins");
  try {
    let resumeDetails = {
      resumePath: fs.readFileSync(req.files[0].path),
      eid: req.body.eid,
    };
    Resume.saveResume(req.files[0], resumeDetails)
      .then(function (resume) {
        res.status(200).json({
          data: resume,
        });
      })
      .catch(function (err) {
        console.log(err);
        res.status(500).json(err);
      });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  } finally {
    console.log("API resume ends");
  }
});

EmployeeRouter.get("/resume/:id", async (req, res) => {
  const condition = {
    enterpriseId: req.params.id,
  };
  Resume.getResume(condition)
    .then(function (resume) {
      console.log("Sending Resume!");
      res.status(200).json(resume);
      console.log("Done");
    })
    .catch(function (err) {
      res.status(500).json(err);
    });
});

module.exports = EmployeeRouter;
