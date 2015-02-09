var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/keywords.json';

var instream = fs.createReadStream('../../../stage/keywords.list', {encoding: 'binary'});
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

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // each line of data contains one movie
      var newRecord = {};
      var parseArray = line.split('\t');
      newRecord.title = parseArray[0].trim().replace(/"/g, '\\"');
      newRecord.keyword = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
      fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "8: THE KEYWORDS LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) === '===='){
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

// mongoimport --db imdbproject-dev --collection keywords --file keywords.json
