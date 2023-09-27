const express = require("express");
const router = express.Router();
const Planet = require("../models/planet");

//如果要放middleware，改成router.use(...middleware)

//首頁
router.get("/", async (req, res) => {
  try {
    let basicData = await Planet.find({}).exec();
    // return res.send(basicData);
    return res.render("planetHome", { basicData });
  } catch (e) {
    return res.status(400).render("error");
  }
});

//新增的表格OK
router.get("/new", async (req, res) => {
  // let basicData = await Planet.find({}).exec();
  res.render("creat-new-planet");
});

//除錯找資料
router.get("/sss", async (req, res) => {
  let finded = await Planet.find({}).exec();
  res.send(finded);
});

//找特定的植物
router.get("/:_id", async (req, res, next) => {
  let { _id } = req.params;
  try {
    let foundPlanet = await Planet.findOne({ _id }).exec();
    if (foundPlanet != null) {
      res.render("specialPlanet", { foundPlanet });
    } else {
      return res.status(400).render("error");
    }
  } catch (e) {
    // return res.status(400).render("error");
    next(e);
  }
});

//修改特定植物的頁面
router.get("/:_id/edit", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundPlanet = await Planet.findOne({ _id }).exec();

    if (foundPlanet != null) {
      return res.render("edit-planet", { foundPlanet });
    } else {
      return res.status(400).render("error");
    }
  } catch (e) {
    return res.status(400).render("error");
  }
});

//刪除植物頁面
router.get("/:_id/delete", async (req, res) => {
  let { _id } = req.params;
  try {
    let foundPlanet = await Planet.findOne({ _id }).exec();

    if (foundPlanet != null) {
      return res.render("delete-planet", { foundPlanet });
    } else {
      return res.status(400).render("error");
    }
  } catch (e) {
    return res.status(400).render("error");
  }
});

//新增植物
router.post("/", async (req, res) => {
  try {
    let { name, detail_name, where, size, soil, fertilizer, water } = req.body;
    let newPlanet = new Planet({
      name,
      detail_name,
      where,
      size,
      soil,
      advanced: { fertilizer, water },
    });
    let saved = await newPlanet.save();
    return res.render("create-successed", { saved });
  } catch (e) {
    return res.render("create-failed", { e });
  }
});

//更新植物
router.put("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let { name, detail_name, where, size, soil, fertilizer, water } = req.body;
    let updated = await Planet.findOneAndUpdate(
      { _id },
      { name, detail_name, where, size, soil, advanced: { fertilizer, water } },
      {
        runValidators: true,
        new: true,
        overwrite: true,
      }
    );
    res.render("update-success", { updated });
  } catch (e) {
    let { _id } = req.params;
    return res.render("update-failed", { e, _id });
  }
});

//刪除植物
router.delete("/:_id", async (req, res) => {
  try {
    let { _id } = req.params;
    let deleted = await Planet.deleteOne({ _id }).exec();
    res.render("delete-success", { deleted });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
