var fs = require('fs');
var should = require('chai').should();
var mongoose = require('mongoose');

var ErrorReporting = require('../lib/reporting.js');
var Error = require('../lib/models/error');
var Constantes = require('../lib/Constantes.js');


describe('General', function() {
    it('get default databaseURL', function() {
	ErrorReporting.getDatabaseURL().should.equal(Constantes.DataBase.url);
    });

    it('get default path file error reporting', function() {
	ErrorReporting.getPathFileErrorReporting().should.equal(Constantes.PathFileErrorReporting);
    });

    it('set databaseURL', function() {
	var databaseURL = '127.0.0.1:27017/TestSetDataBaseURL';
	ErrorReporting.setDatabaseURL(databaseURL);
	ErrorReporting.getDatabaseURL().should.equal(databaseURL);
    });

    it('set path file error reporting', function() {
	var pathFileErrorReporting = 'testReporting.log';
	ErrorReporting.setPathFileErrorReporting(pathFileErrorReporting);
	ErrorReporting.getPathFileErrorReporting().should.equal(pathFileErrorReporting);
    });
    //TODO:  checkConnection
});

describe('LogErrorDB', function() {

    var idErrorArray = [];

    it('log new error db String', function(done) {
	var location = __dirname + " Unit Test logErrorDB()";
	var stack = "Stack String Error";
	ErrorReporting.setDatabaseURL('127.0.0.1:27017/UnitTestLogErrorDB');
	ErrorReporting.logErrorDB(location, stack, function(idError) {
	    Error.findOne({'_id' : idError}, function(err, error) {
		should.not.exist(err);
		should.exist(error);
		error.location.should.equal(location);
		error.stack.should.equal(JSON.stringify(stack));
		idErrorArray.push(idError);
		done();
	    });
	});
    });

    it('log new error db JSON', function(done) {
	var location = __dirname + " Unit Test logErrorDB()";
	var stack = {'error': {'name': 'name error'}};
	ErrorReporting.logErrorDB(location, stack, function(idError) {
	    Error.findOne({'_id' : idError}, function(err, error) {
		should.not.exist(err);
		should.exist(error);
		error.location.should.equal(location);
		error.stack.should.equal(JSON.stringify(stack));
		idErrorArray.push(idError);
		done();
	    });
	});
    });

    it('get all log error db', function(done) {
	ErrorReporting.getLogErrorDB(function(err, listError) {
	    should.not.exist(err);
	    should.exist(listError);
	    done();
	});
    });

    it('log new error db dropdatabase', function(done) {
	Error.find({}).sort('date').exec(function(err, listError) {
	    should.not.exist(err);
	    should.exist(listError);
	    listError.should.be.an('array');
	    listError.should.have.length(idErrorArray.length);
	    for (index in listError) {
		listError[index]._id.equals(idErrorArray[index]).should.equal(true);
	    }
	    mongoose.connection.db.dropDatabase();
	    done();
	});
    });
})

describe('LogErrorTXT', function() {

    var pathFileError = 'UnitTestLogErrorTXT.log';

    it('log new error txt String', function(done) {
	var location = __dirname + " Unit Test logErrorTXT() String";
	var stack = "Stack String Error";
	ErrorReporting.setPathFileErrorReporting(pathFileError);
	ErrorReporting.logErrorTXT(location, stack, function() {
	    fs.exists(pathFileError, function(exists) {
		exists.should.equal(true);
		done();
	    });
	});
    });

    it('log new error txt JSON', function(done) {
	var location = __dirname + " Unit Test logErrorTXT() JSON";
	var stack = {'error': {'name': 'name error'}};
	ErrorReporting.setPathFileErrorReporting(pathFileError);
	ErrorReporting.logErrorTXT(location, stack, function() {
	    fs.exists(pathFileError, function(exists) {
		exists.should.equal(true);
		done();
	    });
	});
    });

    it('log new error txt drop log file', function(done) {
	fs.readFile(pathFileError, 'utf8', function (err, data) {
	    should.not.exist(err);
	    should.exist(data);
	    var lines = data.trim().split("\n");
	    lines.should.be.an('array');
	    lines.should.have.length(2);
	    lines[0].should.equal("Error: " + __dirname + " Unit Test logErrorTXT() String" + " " + JSON.stringify("Stack String Error"));
	    lines[1].should.equal("Error: " + __dirname + " Unit Test logErrorTXT() JSON" + " " + JSON.stringify({'error': {'name': 'name error'}}));
	    fs.unlink(pathFileError, function (err) {
		should.not.exist(err);
		done();
	    });
	});
    });


});
