const mongoose = require('mongoose');

const IPAuthSchema = new mongoose.Schema({
    ip: String,
    dateTime: String,
    frequency: Number
});

module.exports = mongoose.model('IPAuth', IPAuthSchema);