var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/soundMixes.json';

var instream = fs.createReadStream('../../../stage/sound-mix.list', {encoding: 'binary'});
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
        var arrLen = parseArray.length;
        newRecord.title = parseArray[0].trim().replace(/"/g, '\\"');
        if( arrLen > 2 && parseArray[arrLen - 2]) {
          newRecord.mix = parseArray[parseArray.length-2].trim().replace(/"/g, '\\"');
          newRecord.attributes = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
        } else {
          newRecord.mix = parseArray[parseArray.length-1].trim().replace(/"/g, '\\"');
          delete newRecord.attributes;
        }

        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "SOUND-MIX LIST") {
    atTitle = true;
  } else if (atTitle && line === '=============='){
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

// mongoimport --db imdbproject-dev --collection soundmixes --file soundMixes.json
