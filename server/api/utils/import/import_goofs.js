var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/goofs.json'

var instream = fs.createReadStream('../../../stage/goofs.list', {encoding: 'binary'});
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
var goof;
var goofs = [];

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for title identifier in line
      if(line.substring(0, 2) === "# ") {
        if (newRecord.title) {
          goofs.push(goof.trim().replace(/"/g, '\\"'));
          newRecord.goofs = goofs;
          fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        }
        newRecord = {};
        goofs = [];
        goof = '';
        newRecord.title = line.substring(2).trim().replace(/"/g, '\\"');
      // check for alternate start identifier in line
      } else if (line.substring(0, 2) === "- ") {
        if(goof) {
          goofs.push(goof.trim().replace(/"/g, '\\"'));
        }
        goof = line.substring(2);
      } else {
        goof += line.substring(1);
      }
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "GOOFS LIST") {
    atTitle = true;
  } else if (atTitle && line === '=========='){
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
  goofs.push(goof.trim().replace(/"/g, '\\"'));
  newRecord.goofs = goofs;
  fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
})

// mongoimport --db imdbproject-dev --collection goofs --file goofs.json
