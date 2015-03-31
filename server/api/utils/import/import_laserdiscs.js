var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/laserdiscs.json';

var instream = fs.createReadStream('../../../stage/laserdisc.list', {encoding: 'binary'});
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
    if (line.length > 0 && line.substring(0, 4) !=='----') {
      if (newRecord.OT) {
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        newRecord = {};
      } else {
        if (!newRecord[line.substring(0, 2)]) {
          newRecord[line.substring(0, 2)] = [];
        } 
        newRecord[line.substring(0, 2)].push(line.substring(3).trim().replace(/"/g, '\\"'));
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "LASERDISC LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) ==='----') {
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

// mongoimport --db imdbproject-dev --collection laserdisc --file laserdiscs.json
