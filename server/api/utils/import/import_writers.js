var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/writers.json';

var instream = fs.createReadStream('../../../stage/writers.list', {encoding: 'binary'});
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
        var parseArray = line.split('\t');
        // check if line is includes writers name
        if (parseArray[0] !== '') {
          newRecord._id = parseArray[0].trim().replace(/"/g, '\\"');
        }
        var fullTitleData = parseArray[parseArray.length-1];
        var splitIt = fullTitleData.split("  ");
        newRecord.title = splitIt[0].trim().replace(/"/g, '\\"');
        newRecord.attributes = splitIt.slice(1);
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE WRITERS LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) === '----'){
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

// mongoimport --db imdbproject-dev --collection writers --file writers.json
