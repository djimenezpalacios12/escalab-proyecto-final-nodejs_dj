const mongoose = require("mongoose");

// Modelo Area
const areaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Area", areaSchema)