const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    budget: Number
});

module.exports = mongoose.model("Project", projectSchema);