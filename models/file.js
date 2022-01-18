const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// Modelo file
const fileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    proyecto: {
      type: ObjectId,
      ref: "Project",
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("File", fileSchema)