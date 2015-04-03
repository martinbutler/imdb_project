
node import_actors.js
mongoimport --db imdbproject-dev --collection actors --file ./importFiles/actors.json

node import_actresses.js
mongoimport --db imdbproject-dev --collection actresses --file ./importFiles/actresses.json

node import_akaNames.js
mongoimport --db imdbproject-dev --collection akaNames --file ./importFiles/akaNames.json

node import_akaTitles.js
mongoimport --db imdbproject-dev --collection akaTitles --file ./importFiles/akaTitles.json

node import_alternateVersions.js
mongoimport --db imdbproject-dev --collection alternateversions --file ./importFiles/alternateVersions.json

node import_business.js
mongoimport --db imdbproject-dev --collection business --file ./importFiles/business.json

node import_certificates.js
mongoimport --db imdbproject-dev --collection certificates --file ./importFiles/certificates.json

node import_cinematographers.js
mongoimport --db imdbproject-dev --collection cinematographers --file ./importFiles/cinematographers.json

node import_color_info.js
mongoimport --db imdbproject-dev --collection colorinfo --file ./importFiles/colorInfo.json

node import_completeCast.js
mongoimport --db imdbproject-dev --collection completecast --file ./importFiles/completeCast.json

node import_completeCrew.js
mongoimport --db imdbproject-dev --collection completecrew --file ./importFiles/completeCrew.json

node import_composers.js
mongoimport --db imdbproject-dev --collection composers --file ./importFiles/composers.json

node import_costumeDesigners.js
mongoimport --db imdbproject-dev --collection costumedesigners --file ./importFiles/costumeDesigners.json

node import_countries.js
mongoimport --db imdbproject-dev --collection countries --file ./importFiles/countries.json

node import_crazyCredits.js
mongoimport --db imdbproject-dev --collection crazycredits --file ./importFiles/crazyCredits.json

node import_directors.js
mongoimport --db imdbproject-dev --collection directors --file ./importFiles/directors.json

node import_distributors.js
mongoimport --db imdbproject-dev --collection distributors --file ./importFiles/distributors.json

node import_editors.js
mongoimport --db imdbproject-dev --collection editors --file ./importFiles/editors.json

node import_genres.js
mongoimport --db imdbproject-dev --collection genres --file ./importFiles/genres.json

node import_germanAkaTitles.js
mongoimport --db imdbproject-dev --collection germanakatitles --file ./importFiles/germanAkaTitles.json

node import_goofs.js
mongoimport --db imdbproject-dev --collection goofs --file ./importFiles/goofs.json

node import_isoAkaTitles.js
mongoimport --db imdbproject-dev --collection isoakatitles --file ./importFiles/isoAkaTitles.json

node import_italianAkaTitles.js
mongoimport --db imdbproject-dev --collection italianakatitles --file ./importFiles/italianAkaTitles.json

node import_keywords.js
mongoimport --db imdbproject-dev --collection keywords --file ./importFiles/keywords.json

node import_languages.js
mongoimport --db imdbproject-dev --collection language --file ./importFiles/language.json

node import_laserdiscs.js
mongoimport --db imdbproject-dev --collection laserdisc --file ./importFiles/laserdiscs.json

node import_literature.js
mongoimport --db imdbproject-dev --collection literature --file ./importFiles/literature.json

node import_locations.js
mongoimport --db imdbproject-dev --collection locations --file ./importFiles/locations.json

node import_miscellaneous.js
mongoimport --db imdbproject-dev --collection miscellaneous --file ./importFiles/miscellaneous.json

node import_movieLinks.js
mongoimport --db imdbproject-dev --collection movielinks --file ./importFiles/movieLinks.json

node import_movies.js
mongoimport --db imdbproject-dev --collection movies --file ./importFiles/movies.json

node import_mpaaRatingReasons.js
mongoimport --db imdbproject-dev --collection mpaaratingreasons --file ./importFiles/mpaaRatingReasons.json

node import_plots.js
mongoimport --db imdbproject-dev --collection plot --file ./importFiles/plots.json

node import_producers.js
mongoimport --db imdbproject-dev --collection producers --file ./importFiles/producers.json

node import_productionCompanies.js
mongoimport --db imdbproject-dev --collection productioncompanies --file ./importFiles/productionCompanies.json

node import_productionDesigners.js
mongoimport --db imdbproject-dev --collection productiondesigners --file ./importFiles/productionDesigners.json

node import_quotes.js
mongoimport --db imdbproject-dev --collection quotes --file ./importFiles/quotes.json

node import_ratings.js
mongoimport --db imdbproject-dev --collection ratings --file ./importFiles/ratings.json

node import_releaseDates.js
mongoimport --db imdbproject-dev --collection releasedates --file ./importFiles/releaseDates.json

node import_runningTimes.js
mongoimport --db imdbproject-dev --collection runningtimes --file ./importFiles/runningTimes.json

node import_soundMix.js
mongoimport --db imdbproject-dev --collection soundmixes --file ./importFiles/soundMixes.json

node import_soundtracks.js
mongoimport --db imdbproject-dev --collection soundtracks --file ./importFiles/soundtracks.json

node import_specialEffectsCompanies.js
mongoimport --db imdbproject-dev --collection specialeffectscompanies --file ./importFiles/specialEffectsCompanies.json

node import_taglines.js
mongoimport --db imdbproject-dev --collection taglines --file ./importFiles/taglines.json

node import_techincal.js
mongoimport --db imdbproject-dev --collection technical --file ./importFiles/technical.json

node import_trivia.js
mongoimport --db imdbproject-dev --collection trivia --file ./importFiles/trivia.json

node import_writers.js
mongoimport --db imdbproject-dev --collection writers --file ./importFiles/writers.json
