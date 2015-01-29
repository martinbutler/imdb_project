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
var regExp = /\(([^)]+)\)/g;

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of file
      if (line.substring(0, 4) === '----') {
        // atData = false;
        atTitle = false;
        // (((((((((((((((((((()))))))))))))))))))
        // append to TSV file for bulk copy
        fs2.appendFileSync(outputFile, "\nactor: " + newRecord.actor + ", titles" + newRecord.titles);
        // (((((((((((((((((((()))))))))))))))))))
      } else {
        var parseArray = line.split('\t');
        if (parseArray[0] !== '') {
          // if (newRecord.actor) {
          if (newRecord.actor) {
            // (((((((((((((((((((()))))))))))))))))))
            // append to TSV file for bulk copy
            fs2.appendFileSync(outputFile, "\nactor: " + newRecord.actor + ", titles" + newRecord.titles);
            // (((((((((((((((((((()))))))))))))))))))
            newRecord = {};
            newRecord.actor = parseArray[0];
            newRecord.titles = [];
          } else {
            newRecord.actor = parseArray[0];
            newRecord.titles = [];
          }
        } else {
          // hand titles
          // fs2.appendFileSync(outputFile, "\n" + parseArray);
        }
        var matches = parseArray[parseArray.length-1].match(regExp);
        var i = 1;
        var matchLen = matches.length;
        // console.log('1 parse', parseArray);
        while (i < matchLen){
          // console.log('2 matches[i]', matches[i]);
          if (matches[i] === "(TV)" || matches[i] === "(V)"){
            var titleTemp = parseArray[parseArray.length-1].substring(0, parseArray[parseArray.length-1].indexOf(matches[i]) + matches[i].length);
            i = matchLen;
          }
          i++;
        }
        newRecord.titles.push(parseArray[parseArray.length-1]);
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
