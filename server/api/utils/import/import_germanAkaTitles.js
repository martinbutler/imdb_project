var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/germanAkaTitles.json';

var instream = fs.createReadStream('../../../stage/german-aka-titles.list', {encoding: 'binary'});
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
        // check if line is includes the title name
        if (parseArray[0].substring(0, 3) !== '   ') {
          newRecord.title = parseArray[0].trim().replace(/"/g, '\\"');
        } else {
          newRecord.aka = parseArray[0].substring(7, parseArray[0].length - 1).trim().replace(/"/g, '\\"');
          if(parseArray[1]) {
            newRecord.attributes = parseArray[1].trim().replace(/"/g, '\\"');
          }
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "AKA TITLES LIST GERMAN") {
    atTitle = true;
  } else if (atTitle && line === '======================'){
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

// mongoimport --db imdbproject-dev --collection germanAkaTitles --file germanAkaTitles.json
