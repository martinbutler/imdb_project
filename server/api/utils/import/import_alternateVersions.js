var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './importFiles/alternateVersions.json'

var instream = fs.createReadStream('../../../stage/alternate-versions.list', {encoding: 'binary'});
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
var altItem;
var altItems = [];

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
        atTitle = false;
        altItems.push(altItem.trim().replace(/"/g, '\\"'));
        newRecord.alternates = altItems;
        fs.appendFileSync(outputFile, JSON.stringify(newRecord));
      } else {
        // check for title identifier in line
        if(line.substring(0, 2) === "# ") {
          if (newRecord.title) {
            altItems.push(altItem.trim().replace(/"/g, '\\"'));
            newRecord.alternates = altItems;
            fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
          }
          newRecord = {};
          altItems = [];
          altItem = '';
          newRecord.title = line.substring(2).trim().replace(/"/g, '\\"');
        // check for alternate start identifier in line
        } else if (line.substring(0, 2) === "- ") {
          if(altItem) {
            altItems.push(altItem.trim().replace(/"/g, '\\"'));
          }
          altItem = line.substring(2);
        } else {
          altItem += "\n" + line.substring(1);
        }
      }
    }
  // logic to skip non mpaa rating reason data at the head of the file
  } else if(line === "ALTERNATE VERSIONS LIST") {
    atTitle = true;
  } else if (atTitle && line === '======================='){
    atData = true;
    // delete output file if exists
    fs.unlink(outputFile, function(err) {
      if(err) {
      // file doesn't exist
      // continue processing
        }
    });
  }
})

// mongoimport --db imdbproject-dev --collection alternateversions --file alternateVersions.json
