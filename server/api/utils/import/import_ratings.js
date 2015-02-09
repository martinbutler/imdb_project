var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/ratings.json';

var instream = fs.createReadStream('../../../stage/ratings.list', {encoding: 'binary'});
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
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
        atTitle = false;
      } else {
        // each line of data contains one movie
        var newRecord = {};
        newRecord.newMovie = line.substring(0, 5).trim();
        newRecord.distribution = line.substring(6, 16).trim();
        // to address false positive on index of vote in the distribution field
        // we split the line
        var lineSplit = line.substring(18);
        newRecord.votes = parseInt(lineSplit);
        var rankAndTitle = lineSplit.substring(lineSplit.indexOf(newRecord.votes)+ newRecord.votes.toString().length +3);
        newRecord.rank = rankAndTitle.substring(0, rankAndTitle.indexOf(' ')).trim();
        newRecord.title = rankAndTitle.substring(rankAndTitle.indexOf(' ')).trim().replace(/"/g, '\\"');
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "MOVIE RATINGS REPORT") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 3) === 'New'){
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

// mongoimport --db imdbproject-dev --collection ratings --file ratings.json
