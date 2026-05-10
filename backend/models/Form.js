const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(
  {
    serialNumber: {
      type: Number,
      default: 0,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    Age: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    subject: {
      type: String,
      required: true,
      trim: true,
    },

    message: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Form", formSchema);