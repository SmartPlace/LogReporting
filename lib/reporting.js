var Constantes = require('./Constantes.js');
//var ErrorSchemaSwitchDB = require('./models/errorSwitchDB');
var Error = require('./models/error.js');
var mongoose = require('mongoose');
var fs = require('fs');

var dataBaseURL = Constantes.DataBase.url;
var PathFileErrorReporting = Constantes.PathFileErrorReporting;

function Reporting() {}

Reporting.prototype.getDatabaseURL = function() {
    return dataBaseURL;
};

Reporting.prototype.getPathFileErrorReporting = function() {
    return PathFileErrorReporting;
};

Reporting.prototype.setDatabaseURL = function(dbURL) {
    if (dbURL !== undefined)
	dataBaseURL = dbURL;
};

Reporting.prototype.setPathFileErrorReporting = function(pathFileErrorReporting) {
    if (pathFileErrorReporting !== undefined)
	PathFileErrorReporting = pathFileErrorReporting;
};

Reporting.prototype.checkConnection = function(cb) {
    if (mongoose.connection.readyState === 0) {
	mongoose.connect(dataBaseURL, function (err) {
	    if (err) throw err;
	    cb();
	});
    }
    else
	cb();
};

Reporting.prototype.logErrorTXT = function(location, error, callback) {
    fs.appendFile(PathFileErrorReporting, "Error: " + location + " " + JSON.stringify(error) + "\n", function(err) {
	if(err) throw err;
	if (typeof(callback) == "function")
	    callback();
    });
};

Reporting.prototype.logErrorDB = function(location, stack, callback) {
    var self = this;
    this.checkConnection(function() {
	var newError = new Error();
	newError.location = location;
	newError.stack = JSON.stringify(stack);
	newError.save(function(err) {
	    if (err) {
	    	self.logErrorTXT(location, stack, stringify, callback);
	    	self.logErrorTXT(__dirname + ": saveError .save()", err, callback);
	    }
	    else if (typeof(callback) == "function")
		callback(newError._id);
	});
    });
}

Reporting.prototype.getLogErrorDB = function(callback) {
    Error.findOne({}, function(err, listError) {
	callback(err, listError);
    });
}

module.exports = new Reporting();
