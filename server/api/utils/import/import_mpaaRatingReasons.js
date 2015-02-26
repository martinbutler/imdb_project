var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/mpaaRatingReasons.json'

var instream = fs.createReadStream('../../../stage/mpaa-ratings-reasons.list', {encoding: 'binary'});
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false
});

var atData = false;
var newRecord = {};

rl.on('line', function(line) {
  if (atData) {
    // check for title identifier in line
    if(line.substring(0, 3) === "MV:") {
      if (newRecord._id) {
        newRecord.reason = newRecord.reason.trim().replace(/"/g, '\\"');
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
      newRecord = {};
      newRecord._id = line.substring(4).trim().replace(/"/g, '\\"');;
    // check for reason identifier in line
    } else if (line.substring(0, 3) === "RE:") {
      // address multi-line reasons
      newRecord.reason ? (newRecord.reason += line.substring(4)) : (newRecord.reason = line.substring(4));
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "MPAA RATINGS REASONS LIST") {
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
  newRecord.reason = newRecord.reason.trim().replace(/"/g, '\\"');
  fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
});

// mongoimport --db imdbproject-dev --collection mpaaRatingReasons --file mpaaRatingReasons.json
