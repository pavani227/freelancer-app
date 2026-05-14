const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: String,
  projectTitle: String,
  total: Number,
  status: String,
  date: String
});

module.exports = mongoose.model("Invoice", invoiceSchema);