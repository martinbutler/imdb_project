var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var outputFile = './importFiles/akaNames.json';

var instream = fs.createReadStream('../../../stage/aka-names.list', {encoding: 'binary'});
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
        // check if line is includes actor/actress name
        if (line.substring(0, 3) !== '   ') {
          newRecord.name = line.trim().replace(/"/g, '\\"');
        } else {
          newRecord.aka = line.substring(7, line.length - 1).trim().replace(/"/g, '\\"');
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "AKA NAMES LIST") {
    atTitle = true;
  } else if (atTitle && line === '=============='){
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

// mongoimport --db imdbproject-dev --collection akaNames --file akaNames.json
