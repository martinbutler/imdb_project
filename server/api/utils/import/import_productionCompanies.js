var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/productionCompanies.json';

var instream = fs.createReadStream('../../../stage/production-companies.list', {encoding: 'binary'});
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false
});

var atTitle = false;
var atData = false;
var newRecord = {};

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
        atTitle = false;
      } else {
        var parseArray = line.split('\t');


        newRecord.title = parseArray[0].trim().replace(/"/g, '\\"');
        if(parseArray.length > 3 && parseArray[parseArray.length-2] !== "") {
          newRecord.name = parseArray[parseArray.length-2].trim().replace(/"/g, '\\"');
          newRecord.attributes = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
        } else {
          // newRecord.name = parseArray[parseArray.length-2].trim().replace(/"/g, '\\"');
          newRecord.name = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
        }
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        delete newRecord.attributes;
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "PRODUCTION COMPANIES LIST") {
    atTitle = true;
  } else if (atTitle && line === '========================='){
    atData = true;
    // delete output file if exists
    fs.unlink(outputFile, function(err) {
      if(err) {
        // file doesn't exist
        // continue processing
      }
    });
  }
});

// mongoimport --db imdbproject-dev --collection productioncompanies --file productionCompanies.json
