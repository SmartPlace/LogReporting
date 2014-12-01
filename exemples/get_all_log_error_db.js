var LogReporting = require('../lib/reporting.js');

LogReporting.getLogErrorDB(function(err, listError) {
    if (err) throw err;
    console.log(listError);
    // Do something
});
