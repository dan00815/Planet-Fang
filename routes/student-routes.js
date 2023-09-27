const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("歡迎來到學生首頁");
});
router.get("/new", (req, res) => {
  res.send("歡迎來到新增學生的頁面");
});

module.exports = router;
