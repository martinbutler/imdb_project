var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/movieLinks.json'

var instream = fs.createReadStream('../../../stage/movie-links.list', {encoding: 'binary'});
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
        // append last record to JSON file for bulk copy
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      } else {
        // check for title identifier in line
        if(line.substring(0, 2) !== "  ") {
          if (newRecord.title) {
            fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
          }
          newRecord.title = line.trim().replace(/"/g, '\\"');
          newRecord.links = [];
        } else {
          newRecord.links.push(line.trim().replace(/"/g, '\\"'));
        }
      }
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "MOVIE LINKS LIST") {
    atTitle = true;
  } else if (atTitle && line === '================'){
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

// mongoimport --db imdbproject-dev --collection movielinks --file movieLinks.json
