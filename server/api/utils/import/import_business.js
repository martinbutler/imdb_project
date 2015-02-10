var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/business.json';

var instream = fs.createReadStream('../../../stage/business.list', {encoding: 'binary'});
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
var endMarkerCount = 0;

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        endMarkerCount++;
        if(endMarkerCount === 2) {
          atData = false;
          atTitle = false;
          // append last record to JSON file for bulk copy
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }               
      } else {
        endMarkerCount = 0;
        
        // check for movie identifier in line
        if(line.substring(0, 3) === "MV:") {
          if (newRecord._id) {
            fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
          }
          newRecord = {};
          newRecord._id = line.substring(3).trim().replace(/"/g, '\\"');
        // append non movie fields to record
        } else {
          var key = line.substring(0, 2);
          if (newRecord[key]) {
            newRecord[key].push(line.substring(3).trim().replace(/"/g, '\\"'));
          } else {
            newRecord[key] = [line.substring(3).trim().replace(/"/g, '\\"')];
          }
        }
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "BUSINESS LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) === '====') {
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

// mongoimport --db imdbproject-dev --collection business --file business.json
