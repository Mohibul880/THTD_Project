
const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  Age: String,
  phone: String,
  subject: String,
  message: String,
});

module.exports = mongoose.model("Form", formSchema);
