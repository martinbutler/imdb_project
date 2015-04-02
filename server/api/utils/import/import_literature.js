var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/literature.json';

var instream = fs.createReadStream('../../../stage/literature.list', {encoding: 'binary'});
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
// newRecord.literatures = [];
// var literature = '';

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0 && line.substring(0, 4) !=='----') {
      if(line.substring(0, 5) === "MOVI:") {
        if (newRecord.title) {
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }
        newRecord = {};
        newRecord.title = line.substring(5).trim().replace(/"/g, '\\"');
      // append non movie fields to record
      } else {
        if (!newRecord[line.substring(0, 4)]) {
          newRecord[line.substring(0, 4)] = [];
        }
        newRecord[line.substring(0, 4)].push(line.substring(5).trim().replace(/"/g, '\\"'));
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "LITERATURE LIST") {
    atTitle = true;
  } else if (atTitle && line === '===============') {
    atData = true;
    // delete output file if exists
    fs.unlink(outputFile, function(err) {
      if(err) {
        // file doesn't exist
        // continue processing
      }
    });
  }
}).on('close', function() {
  fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
});

// mongoimport --db imdbproject-dev --collection literature --file literature.json
