const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const applicationSchema = new mongoose.Schema(
  {
    project: {
      type: ObjectId,
      ref: "Project"
    },
    condition: {
      type: String,
      default: "En Proceso",
      enum: ["En Proceso", "Aceptado", "Rechazado"]
    },
    date_application: {
      date_admission: {
        type: Date,
        require: true,
        default: Date.now
      },
      updated: Date,
    }
  },
  {
    timestamps: true
  }
);


module.exports = mongoose.model("Application", applicationSchema)