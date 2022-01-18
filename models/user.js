const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      maxlength: 15,
      trim: true
    },
    lastname: {
      type: String,
      require: true,
      maxlength: 15,
      trim: true
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashedpass: {             //Encriptar pwd en DB
      type: String,
      required: true
    },
    rut: {
      type: String,
      require: true,
      unique: true
    },
    profession: {
      type: String,
      trim: true,
      maxlength: 15
    },
    company: {
      type: String,
      trim: true,
      maxlength: 15
    },
    salt: String,
    role: {
      type: String,
      index: true,
      default: 'usuario',
      enum: {
        values: [
          'usuario',
          'admin'
        ]
      }
    }
  },
  {
    timestamps: true
  }
);

// Encriptación de hashedpass
userSchema.pre("save", function (next) {
  bcrypt.genSalt(10)
    .then(salts => {
      bcrypt.hash(this.hashedpass, salts).then(hash => {
        this.hashedpass = hash;
        next();
      }).catch(
        error => next(error)
      );
    }).catch(
      error => next(error)
    );
});


module.exports = mongoose.model("User", userSchema)
