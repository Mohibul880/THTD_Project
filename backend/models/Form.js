const mongoose = require("mongoose");

const formSchema = new mongoose.Schema(

  {

    serialNumber: {
      type: Number,
      unique: true,
    },

    name: {
      type: String,
      required: true,
    },

    Age: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model("Form", formSchema);