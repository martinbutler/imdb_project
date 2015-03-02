var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/certificates.json';

var instream = fs.createReadStream('../../../stage/certificates.list', {encoding: 'binary'});
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
        newRecord.title = line.substring(0, line.indexOf('\t')).trim().replace(/"/g, '\\"');
        newRecord.certificate = line.substring(newRecord.title.length).trim().replace(/"/g, '\\"');;
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "CERTIFICATES LIST") {
    atTitle = true;
  } else if (atTitle && line === '================='){
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

// mongoimport --db imdbproject-dev --collection certificates --file certificates.json
