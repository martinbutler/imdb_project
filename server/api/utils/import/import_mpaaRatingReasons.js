var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './tsvFiles/mpaaRatingReasons.tsv'

var instream = fs.createReadStream('../../../stage/mpaa-ratings-reasons.list', {encoding: 'binary'});
var outstream = new stream;
outstream.readable = true;
outstream.writable = true;

var rl = readline.createInterface({
   input: instream,
   output: outstream,
   terminal: false
});

var atData = false;
var newRecord = {};

rl.on('line', function(line) {
  if (atData) {
    // check for title identifier in line
    if(line.substring(0, 3) === "MV:") {
      if (newRecord.title) {
        fs2.appendFileSync(outputFile, "\n" + newRecord.title + "\t" + newRecord.reason);
      }
      newRecord = {};
      newRecord.title = line.substring(4);
    // check for reason identifier in line
    } else if (line.substring(0, 3) === "RE:") {
      // address multi-line reasons
      newRecord.reason ? (newRecord.reason += line.substring(4)) : (newRecord.reason = line.substring(4));
    }


  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "MPAA RATINGS REASONS LIST") {
    atData = true;
    // create/overwrite TSV file for buik copy
    fs2.writeFileSync(outputFile, "title" +"\t" + "reason");
  }
});
