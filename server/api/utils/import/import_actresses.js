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
var regExpParentheses = /\((.*?)\)/g;
var regExpEpisode =     /\{(.*?)\}/g;
var regExpSquare =      /\[(.*?)\]/g;
var regExpBilling =     /<(.*?)>/g;


rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
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
        var fullCredit = {};
        // address inconsistency with data dump
        //   most records will have the no actor name data
        //    in the last field in the tab delimitation
        //    however there were a few records that contained
        //    additional tab.  This will will verify and
        //    concatenate the last two fields to correct
        //    data.
        if (parMatches) {
          var parMatchLen = parMatches.length;
        } else {
          fullTitleData = line.substring(line.indexOf(parseArray[parseArray.length-2]));
          parMatches = fullTitleData.match(regExpParentheses);
        }
        // parses the titles with TV or V tags
        while (i < parMatchLen){
          if (parMatches[i] === "(TV)" || parMatches[i] === "(V)"){
            title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[i]) + parMatches[i].length).replace(/"/g, '\\"');
            i = parMatchLen;
          }
          i++;
        }
        // parse the titles with episode information in the record
        if (!title) {
          var episodeMatch = fullTitleData.match(regExpEpisode);

          if (episodeMatch){
            title = fullTitleData.substring(0, fullTitleData.indexOf(episodeMatch[0])+ episodeMatch[0].length).replace(/"/g, '\\"');
          }
        }
        // parse titles with no episode, TV or V tags
        if (!title) {
          title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[0])+parMatches[0].length).replace(/"/g, '\\"');
        }
        // parse billing
        var billingMatch = fullTitleData.substring(title.length-1).match(regExpBilling);
        if (billingMatch) {
          billing = billingMatch[0].replace(/"/g, '\\"');
          console.log(billing);
        }
        // parse role
        var roleMatch = fullTitleData.substring(title.length-1).match(regExpSquare);
        if (roleMatch) {
          if (!billing) {
            role = fullTitleData.substring(title.length).trim().replace(/"/g, '\\"');
            // console.log(fullTitleData.substring(title.length+2));
          } else {
            role = fullTitleData.substring(title.length, fullTitleData.indexOf(billing)).trim().replace(/"/g, '\\"');
            // console.log(fullTitleData.substring(title.length+2, fullTitleData.indexOf(billing)).trim()
              // );
          }
        }
        newRecord.titles.push({"title": title, "role": role, "billing": billing});
        // console.log(newRecord);
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE ACTRESSES LIST") {
    atTitle = true;
  } else if (atTitle && line.substring(0, 4) === '----'){
    atData = true;
    // create/overwrite TSV file for buik copy
    // fs2.writeFileSync(outputFile, "title" +"\t" + "year");
  }
});
