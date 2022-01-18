// Project & area
const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

// Modelo Project
const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 30,
      trim: true
    },
    description: {
      type: String,
      maxlength: 500
    },
    project_manager: {
      type: ObjectId,
      ref: "User"
    },
    area: {
      type: ObjectId,
      ref: "Area"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Project", projectSchema);