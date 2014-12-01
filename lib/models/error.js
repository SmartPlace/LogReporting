var mongoose = require('mongoose');

var errorSchema = mongoose.Schema({
    location	: {type: String},
    stack	: {type: String},
    date	: {type: String, default: Date.now},
});

module.exports = mongoose.model('Error', errorSchema);
