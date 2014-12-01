// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var errorSchema = mongoose.Schema({
    location	: {type: String},
    stack	: {type: String},
    date	: {type: String, default: Date.now},
});

// create the model for videos and expose it to our app
//module.exports = mongoose.model('Error', errorSchema);
module.exports = errorSchema;
