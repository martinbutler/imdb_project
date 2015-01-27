var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var instream = fs.createReadStream('../../../stage/movies.list', {encoding: 'binary'});
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
var regExp = /\(([^)]+)\)/;

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of file
      if (line.substring(0, 4) === '----') {
        atData = false;
      } else {
        var parseArray = line.split('\t');
        newRecord.title = parseArray[0];
        newRecord.year = parseArray[parseArray.length-1];
        console.log('newRecord: ', newRecord);
        newRecord = {};
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "===========") {
    atData = true;
  }
});
