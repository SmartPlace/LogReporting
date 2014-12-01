var LogReporting = require('../lib/reporting.js');

LogReporting.logErrorDB(__dirname + " Exemple log error db", "this is an exemple for reporting an error in the default log database", function (idError) {
    console.log("A new error has been add to the default log database with the id: " + idError);
});
