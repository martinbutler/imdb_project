var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/composers.json';

var instream = fs.createReadStream('../../../stage/composers.list', {encoding: 'binary'});
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
        // check if line is includes composers name
        if (parseArray[0] !== '') {
          newRecord.name = parseArray[0].trim().replace(/"/g, '\\"');
        }
        var hasAttribute = parseArray[parseArray.length-1].indexOf("  ");
        if(hasAttribute > 1) {
          newRecord.title = parseArray[parseArray.length-1].substring(0, hasAttribute).trim().replace(/"/g, '\\"');
          newRecord.attribute = parseArray[parseArray.length-1].substring(hasAttribute).trim().replace(/"/g, '\\"');
        } else {
          newRecord.title = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
          newRecord.attribute = undefined;
        }
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE COMPOSERS LIST") {
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

// mongoimport --db imdbproject-dev --collection composers --file composers.json
