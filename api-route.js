var router = require("express").Router();
router.get("/", function (req, res) {
  res.json({
    status: 200,
    message: "This is initial stage",
  });
});

module.exports = router;
