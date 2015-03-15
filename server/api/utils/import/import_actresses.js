var fs = require('fs'),
   readline = require('readline'),
   stream = require('stream');

var outputFile = './importFiles/actresses.json';

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
var regExpSuspended =   /\{\{SUSPENDED\}\}/g;

rl.on('line', function(line) {
  if (atData) {
    // skip blank lines
    if (line.length > 0) {
      // check for end of data marker
      if (line.substring(0, 4) === '----') {
        atData = false;
        atTitle = false;
        // append last record to JSON file for bulk copy
        // fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
      } else {
        var parseArray = line.split('\t');
        // check if line is includes actress name
        if (parseArray[0] !== '') {
          // check if previous record has been written
          // if (newRecord._id) {
            // fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
            // prep for new record
            // newRecord = {};
            // newRecord._id = parseArray[0];
            // newRecord.titles = [];
          // } else {
            newRecord.name = parseArray[0];
            // newRecord.titles = [];
          // }
        }
        var fullTitleData = parseArray[parseArray.length-1];
        var parMatches = fullTitleData.match(regExpParentheses);
        // var i = 1, title, billing, role;
        // var fullCredit = {};
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
        // parse the titles marked as suspended
        if(suspendMatches = fullTitleData.match(regExpSuspended)) {
          newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(suspendMatches[0]) + suspendMatches[0].length).replace(/"/g, '\\"');
        }
        // parses the titles with TV or V or VG tags
        var i =1;
        if(!newRecord.title) {
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
          var episodeMatch = fullTitleData.match(regExpEpisode);

          if (episodeMatch){
            newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(episodeMatch[0])+ episodeMatch[0].length).replace(/"/g, '\\"');
          }
        }
        // parse titles with no episode, TV or V tags
        if (!newRecord.title) {
          newRecord.title = fullTitleData.substring(0, fullTitleData.indexOf(parMatches[0])+parMatches[0].length).replace(/"/g, '\\"');
        }
        // parse billing
        var billingMatch = fullTitleData.substring(newRecord.title.length-1).match(regExpBilling);
        if (billingMatch) {
          newRecord.billing = billingMatch[0].replace(/"/g, '\\"');
        }
        // parse role
        var roleMatch = fullTitleData.substring(newRecord.title.length-1).match(regExpSquare);
        if (roleMatch) {
          if (!newRecord.billing) {
            newRecord.role = fullTitleData.substring(newRecord.title.length).trim().replace(/"/g, '\\"');
          } else {
            newRecord.role = fullTitleData.substring(newRecord.title.length, fullTitleData.indexOf(newRecord.billing)).trim().replace(/"/g, '\\"');
          }
        }
        // save title and associated data in actress' title array
        // newRecord.titles.push({"title": title, "role": role, "billing": billing});
        fs.appendFileSync(outputFile, JSON.stringify(newRecord) + "\n");
        var actress = newRecord.name;
        newRecord = {};
        newRecord.name = actress;
      }
    }
  // logic to skip non movie data at the head of the file
  } else if(line === "THE ACTRESSES LIST") {
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

// mongoimport --db imdbproject-dev --collection actresses --file actresses.json
