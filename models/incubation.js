const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const incubationSchema = new mongoose.Schema(
  {
    project: {
      type: ObjectId,
      ref: "Project"
    },
    application: {
      type: ObjectId,
      ref: "Application"
    },
    observations: {
      type: String,
      maxlength: 150
    },
    course: {
      budget: {
        type: Number,
        required: true
      },
      stage: {
        type: String,
        default: "desarrollo",
        enum: ["desarrollo", "Prototipo", "Escalamiento", "Distribución"]
      }
    },
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Incubation", incubationSchema)