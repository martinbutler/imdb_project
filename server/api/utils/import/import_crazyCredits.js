var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/crazyCredits.json'

var instream = fs.createReadStream('../../../stage/crazy-credits.list', {encoding: 'binary'});
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
var crazyCredit;
var crazyCredits = [];

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
        atTitle = false;
        crazyCredits.push(crazyCredit.trim().replace(/"/g, '\\"'));
        newRecord.credit = crazyCredits;
        fs.appendFileSync(outputFile, JSON.stringify(newRecord));
      } else {
        // check for title identifier in line
        if(line.substring(0, 2) === "# ") {
          if (newRecord._id) {
            crazyCredits.push(crazyCredit.trim().replace(/"/g, '\\"'));
            newRecord.credit = crazyCredits;
            fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
          }
          newRecord = {};
          crazyCredits = [];
          crazyCredit = '';
          newRecord._id = line.substring(2).trim().replace(/"/g, '\\"');
        // check for alternate start identifier in line
        } else if (line.substring(0, 2) === "- ") {
          if(crazyCredit) {
            crazyCredits.push(crazyCredit.trim().replace(/"/g, '\\"'));
          }
          crazyCredit = line.substring(2);
        } else {
          crazyCredit += line.substring(1);
        }
      }
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "CRAZY CREDITS") {
    atTitle = true;
  } else if (atTitle && line === '============='){
    atData = true;
    // delete output file if exists
    fs.unlink(outputFile, function(err) {
      if(err) {
      // file doesn't exist
      // continue processing
        }
    });
  }
})

// mongoimport --db imdbproject-dev --collection crazyCredits --file crazyCredits.json
