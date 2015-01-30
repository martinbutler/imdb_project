var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var fs2 = require('fs');
var outputFile = './tsvFiles/actresses.tsv'

var instream = fs.createReadStream('../../../stage/actresses.list', {encoding: 'binary'});
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
var regExpParentheses = /\(([^)]+)\)/g;
var regExpEpisode =     /\{([^)]+)\}/g;
var regExpSquare =      /\[([^)]+)\]/g;
var regExpBilling =     /\<([^)]+)\>/g;


rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        // atData = false;
        atTitle = false;
        // append last record to TSV file for bulk copy
        fs2.appendFileSync(outputFile, "\nactor: " + newRecord.actor + ", titles" + newRecord.titles);
      } else {
        var parseArray = line.split('\t');
        // check if line is includes actress name
        if (parseArray[0] !== '') {
          // check if previous record has been written
          if (newRecord.actor) {
            fs2.appendFileSync(outputFile, "\nactor: " + newRecord.actor + ", titles" + newRecord.titles);
            // prep for new record
            newRecord = {};
            newRecord.actor = parseArray[0];
            newRecord.titles = [];
          } else {
            newRecord.actor = parseArray[0];
            newRecord.titles = [];
          }
        }
        var fullTitleData = parseArray[parseArray.length-1];
        var parMatches = fullTitleData.match(regExpParentheses);
        var i = 1, title, billing, role;
        var parMatchLen = parMatches.length;
        while (i < parMatchLen){
          if (parMatches[i] === "(TV)" || parMatches[i] === "(V)"){
            title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[i]) + parMatches[i].length);
            i = parMatchLen;
            console.log(title);
          }
          i++;
        }
        // if(!title) {
        //   curlyMatch = parseArray[parseArray.length-1].match(regExpEpisode);

        //   if (curlyMatch) {
        //     console.log(curlyMatch);
        //     // title = parseArray[parseArray.length-1].substring(0, parseArray[parseArray.length-1].indexOf(curlyMatch) + curlyMatch.length);
        //     // console.log(title);
        //   }
        // }

        newRecord.titles.push(title);
        // newRecord.titles.push(parseArray[parseArray.length-1]);
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE ACTRESSES LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) === '----'){
    atData = true;
    // create/overwrite TSV file for buik copy
    fs2.writeFileSync(outputFile, "title" +"\t" + "year");
  }
});
