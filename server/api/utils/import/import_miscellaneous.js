var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');


var outputFile = './importFiles/miscellaneous.json';

var instream = fs.createReadStream('../../../stage/miscellaneous.list', {encoding: 'binary'});
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
var regExpParentheses = /\((.*?)\)/g;
var regExpEpisode =     /\{(.*?)\}/g;
var regExpSquare =      /\[(.*?)\]/g;
var regExpSuspended =      /\{\{SUSPENDED\}\}/g;
var regExpYear = /\((.*?)\)/g;


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
        // check if line includes miscellaneous's name
        if (parseArray[0] !== '') {
          newRecord.name = parseArray[0];
        }
        var fullTitleData = parseArray[parseArray.length-1];
        // parse the titles marked as suspended
        if(suspendMatches = fullTitleData.match(regExpSuspended)) {
          newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(suspendMatches[0]) + suspendMatches[0].length).replace(/"/g, '\\"');
        }
        // parses the titles with TV or V tags
        if (!newRecord.title) {
          var parMatches = fullTitleData.match(regExpParentheses);
          var i = 1;
          var parMatchLen = parMatches.length;
          while (i < parMatchLen){
            if (parMatches[i] === "(TV)" || parMatches[i] === "(V)" || parMatches[i] === "(VG)"){
              newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[i]) + parMatches[i].length).replace(/"/g, '\\"');
              i = parMatchLen;
            }
            i++;
          }
        }
        // parse the titles with episode information in the record
        if (!newRecord.title) {
          if (episodeMatch = fullTitleData.match(regExpEpisode)){
            newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(episodeMatch[0])+ episodeMatch[0].length).replace(/"/g, '\\"');
          }
        }
        // Parse title addressing multi-parentheses find
        // based on expeted year formats in data
        // Based on data dump, parMatches assignment will have
        // executed if title has not be defined
        if (!newRecord.title) {
          for (var i = 0; i < parMatchLen; i++) {
            if (parMatches[i] === '(????)' || parMatches[i].substring(0, 6) === '(????/' || parseInt(parMatches[i].substring(1)) >= 1870) {
              newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[i])  + parMatches[i].length).replace(/"/g, '\\"');
            }
          }
        }
        // parse titles with no previous matching criteria, including
        // episodes, TV tag, V tag, VG tag, and year formats
        // if no other match for title is found, use the full title data
        if (!newRecord.title) {
          newRecord.title = fullTitleData.split("  ")[0].replace(/"/g, '\\"');
        }
        // parse attributes, if it exists
        if (attributesMatch = fullTitleData.substring(newRecord.title.length).trim()) {
            newRecord.attributes = fullTitleData.substring(newRecord.title.length).trim().replace(/"/g, '\\"');
        }
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        delete newRecord.title;
        delete newRecord.attributes;
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE MISCELLANEOUS FILMOGRAPHY LIST") {
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

// mongoimport --db imdbproject-dev --collection miscellaneous --file miscellaneous.json
