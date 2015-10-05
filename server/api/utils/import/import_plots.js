var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/plot.json';

var instream = fs.createReadStream('../../../stage/plot.list', {encoding: 'binary'});
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
newRecord.plots = [];
var plot = '';

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0 && line.substring(0, 4) !=='----') {
      if(line.substring(0, 3) === "MV:") {
        if (newRecord.title) {
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }
        newRecord = {};
        newRecord.title = line.substring(3).trim().replace(/"/g, '\\"');
        newRecord.plots = [];
      // append non movie fields to record
      } else {
        if (line.substring(0, 3) === "PL:") {
          plot += line.substring(3)
        } else {
          newRecord.plots.push({plot: plot.trim(), by: line.substring(3)})
          plot = '';
        }
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "PLOT SUMMARIES LIST") {
    atTitle = true;
  } else if (atTitle && line === '===================') {
    atData = true;
    // delete output file if exists
    fs.unlink(outputFile, function(err) {
      if(err) {
        // file doesn't exist
        // continue processing
      }
    });
  }
}).on('close', function() {
  fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
});

// mongoimport --db imdbproject-dev --collection plot --file plots.json
