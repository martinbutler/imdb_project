var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/quotes.json'

var instream = fs.createReadStream('../../../stage/quotes.list', {encoding: 'binary'});
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
var quote;
var quotes = [];

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      if (line.substring(0, 4) === '----') {
        atData = false;
      } else {
      // check for title identifier in line
        if(line.substring(0, 2) === "# ") {
          if (newRecord.title) {
            quotes.push(quote.trim().replace(/"/g, '\\"'));
            newRecord.quotes = quotes;
            fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
          }
          newRecord = {};
          quotes = [];
          quote = '';
          newRecord.title = line.substring(2).trim().replace(/"/g, '\\"');
        // check for alternate start identifier in line
        } else if (line.substring(0, 2) !== "  ") {
          if(quote) {
            quotes.push(quote.trim().replace(/"/g, '\\"'));
          }
          quote = line;
        } else {
          quote += line.substring(1);
        }
      }
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "QUOTES LIST") {
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
}).on('close', function() {
  quotes.push(quote.trim().replace(/"/g, '\\"'));
  newRecord.quotes = quotes;
  fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
})

// mongoimport --db imdbproject-dev --collection quotes --file quotes.json
