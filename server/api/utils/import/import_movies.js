var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/movies.json'

var instream = fs.createReadStream('../../../stage/movies.list', {encoding: 'binary'});
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false
});

var atData = false;

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of file
      if (line.substring(0, 4) === '----') {
        atData = false;
      } else {
        var newRecord = {}
        var parseArray = line.split('\t');
        newRecord.title = parseArray[0].trim().replace(/"/g, '\\"');
        newRecord.year = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "===========") {
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

// mongoimport --db imdbproject-dev --collection movies --file movies.json
