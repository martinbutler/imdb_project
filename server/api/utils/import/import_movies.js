var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './tsvFiles/movies.tsv'

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
        var parseArray = line.split('\t');
        // newRecord.title = parseArray[0];
        // newRecord.year = parseArray[parseArray.length-1];
        // append to TSV file for bulk copy
        fs2.appendFileSync(outputFile, "\n" + parseArray[0] +"\t" + parseArray[parseArray.length-1]);
        // newRecord = {};
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "===========") {
    atData = true;
    // create/overwrite TSV file for buik copy
    fs2.writeFileSync(outputFile, "title" +"\t" + "year");
  }
});
