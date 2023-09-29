const mongoose = require("mongoose");
const { Schema } = mongoose;

// "等主人幫我想個名字"，當輸入空白時，name="name"就會是空白但抓不到default值
const planetSchema = new Schema({
  name: {
    type: String,
    required: [true, "名字為必填"],
    default: "等主人幫我想個名字",
  },
  detail_name: {
    type: String,
    minlength: 1,
    required: [true, "品種為必填"],
  },
  where: { type: String, maxlength: 30 },
  size: { type: Number, min: 1, max: 1000 },
  soil: { type: String },
  advanced: {
    fertilizer: { type: String },
    water: { type: Boolean },
  },
});

const Planet = mongoose.model("Planet", planetSchema);
module.exports = Planet;
