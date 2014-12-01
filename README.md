LogReporting
==============

**LogReporting** is lite log reporting module for [node.js](http://nodejs.org) using MongoDB and files.

Installation
------------

    git clone https://github.com/smartmarchah/LogReporting
    
Usage
-----

Require LogReporting module

```javascript
var LogReporting = require("LogReporting");
```

Examples
========

* Logging an error in the database

```javascript
var LogReporting = require("LogReporting");

LogReporting.logErrorDB(__dirname + " Exemple log error db", "this is an exemple for reporting an error in the default log database", function (idError) \
{
    console.log("A new error has been add to the default log database with the id: " + idError);
});
```

* Logging an error in the database

```javascript
var LogReporting = require("LogReporting");

LogReporting.getLogErrorDB(function(err, listError) {
    if (err) throw err;
    console.log(listError);
    // Do something         
});
```

* Logging an error in a file

```javascript
var LogReporting = require('LogReporting');

LogReporting.logErrorTXT(__dirname + " Exemple log error txt", "this is an exemple for reporting an error in the default log file", function \
() {
    console.log("A new error has been add to the default log file.");
});
```

API
===

Log Erreur Database functions
-----------------------------

* **getDatabaseURL**() - < _string_ > - Return the database url using for logging the report.

* **setDatabaseURL**(< _string_ >databaseURL) - _(void)_ - Set the database url using for logging the report.

* **logErrorDB**(< _string_ >errorLocation, < _string_ >errorMsg, < _function_ >callback) - _(void)_ - Log the error in the database setted with `setDatabaseURL` or in the default one. If an error occure, the error will be log in the reporting file setted with `setPathFileErrorReporting`. or in the default one. `callback` return the errorId in the database or nothing if the function failed.

* **getLogErrorDB**(< _function_ >callback) - _(void)_ - Return all the error logged in the database selected. `callback` has 2 parameters: < _Error_ >err, < _Object_ >listErrors. `listErrors` is an Object which contains all the errors logged in the selected database.


Log Erreur File functions
-----------------------------


* **getPathFileErrorReporting**() - < _string_ > - Return the file path using for logging the report.

* **setPathFileErrorReporting**(< _string_ >pathFile) - _(void)_ - Set the file path using for logging the report.

* **logErrorTXT**(< _string_ >errorLocation, < _string_ >errorMsg, < _function_ >callback) - _(void)_ - Log the error in the database setted with `setDatabaseURL` or in the default one. `callback` has no parameter.
 
Configuration File
------------------

```javascript
{
    PathFileErrorReporting: 'reporting.log',
    DataBase: {url: '127.0.0.1:27017/LogReporting'}
}
```
