const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    userId: {type: String, required: true },
    title: {type: String},
    data:{type: String}
});

module.exports = mongoose.model("Task", DataSchema);