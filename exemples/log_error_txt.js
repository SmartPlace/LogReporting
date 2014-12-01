var LogReporting = require('../lib/reporting.js');

LogReporting.logErrorTXT(__dirname + " Exemple log error txt", "this is an exemple for reporting an error in the default log file", function () {
    console.log("A new error has been add to the default log file.");
});
