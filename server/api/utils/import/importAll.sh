gunzip -c ../../../stage/actors.list.gz > ../../../stage/actors.list
node import_actors.js
mongoimport --db imdbproject-dev --collection actors --file ./importFiles/actors.json

gunzip -c ../../../stage/actresses.list.gz > ../../../stage/actresses.list
node import_actresses.js
mongoimport --db imdbproject-dev --collection actresses --file ./importFiles/actresses.json

gunzip -c ../../../stage/aka-names.list.gz > ../../../stage/aka-names.list
node import_akaNames.js
mongoimport --db imdbproject-dev --collection akaNames --file ./importFiles/akaNames.json

gunzip -c ../../../stage/aka-titles.list.gz > ../../../stage/aka-titles.list
node import_akaTitles.js
mongoimport --db imdbproject-dev --collection akaTitles --file ./importFiles/akaTitles.json

gunzip -c ../../../stage/alternate-versions.list.gz > ../../../stage/alternate-versions.list
node import_alternateVersions.js
mongoimport --db imdbproject-dev --collection alternateversions --file ./importFiles/alternateVersions.json

gunzip -c ../../../stage/business.list.gz > ../../../stage/business.list
node import_business.js
mongoimport --db imdbproject-dev --collection business --file ./importFiles/business.json

gunzip -c ../../../stage/certificates.list.gz > ../../../stage/certificates.list
node import_certificates.js
mongoimport --db imdbproject-dev --collection certificates --file ./importFiles/certificates.json

gunzip -c ../../../stage/cinematographers.list.gz > ../../../stage/cinematographers.list
node import_cinematographers.js
mongoimport --db imdbproject-dev --collection cinematographers --file ./importFiles/cinematographers.json

gunzip -c ../../../stage/color-info.list.gz > ../../../stage/color-info.list
node import_color_info.js
mongoimport --db imdbproject-dev --collection colorinfo --file ./importFiles/colorInfo.json

gunzip -c ../../../stage/complete-cast.list.gz > ../../../stage/complete-cast.list
node import_completeCast.js
mongoimport --db imdbproject-dev --collection completecast --file ./importFiles/completeCast.json

gunzip -c ../../../stage/complete-crew.list.gz > ../../../stage/complete-crew.list
node import_completeCrew.js
mongoimport --db imdbproject-dev --collection completecrew --file ./importFiles/completeCrew.json

gunzip -c ../../../stage/composers.list.gz > ../../../stage/composers.list
node import_composers.js
mongoimport --db imdbproject-dev --collection composers --file ./importFiles/composers.json

gunzip -c ../../../stage/costume-designers.list.gz > ../../../stage/costume-designers.list
node import_costumeDesigners.js
mongoimport --db imdbproject-dev --collection costumedesigners --file ./importFiles/costumeDesigners.json

gunzip -c ../../../stage/countries.list.gz > ../../../stage/countries.list
node import_countries.js
mongoimport --db imdbproject-dev --collection countries --file ./importFiles/countries.json

gunzip -c ../../../stage/crazy-credits.list.gz > ../../../stage/crazy-credits.list
node import_crazyCredits.js
mongoimport --db imdbproject-dev --collection crazycredits --file ./importFiles/crazyCredits.json

gunzip -c ../../../stage/directors.list.gz > ../../../stage/directors.list
node import_directors.js
mongoimport --db imdbproject-dev --collection directors --file ./importFiles/directors.json

gunzip -c ../../../stage/distributors.list.gz > ../../../stage/distributors.list
node import_distributors.js
mongoimport --db imdbproject-dev --collection distributors --file ./importFiles/distributors.json

gunzip -c ../../../stage/editors.list.gz > ../../../stage/editors.list
node import_editors.js
mongoimport --db imdbproject-dev --collection editors --file ./importFiles/editors.json

gunzip -c ../../../stage/genres.list.gz > ../../../stage/genres.list
node import_genres.js
mongoimport --db imdbproject-dev --collection genres --file ./importFiles/genres.json

gunzip -c ../../../stage/german-aka-titles.list.gz > ../../../stage/german-aka-titles.list
node import_germanAkaTitles.js
mongoimport --db imdbproject-dev --collection germanakatitles --file ./importFiles/germanAkaTitles.json

gunzip -c ../../../stage/goofs.list.gz > ../../../stage/goofs.list
node import_goofs.js
mongoimport --db imdbproject-dev --collection goofs --file ./importFiles/goofs.json

gunzip -c ../../../stage/iso-aka-titles.list.gz > ../../../stage/iso-aka-titles.list
node import_isoAkaTitles.js
mongoimport --db imdbproject-dev --collection isoakatitles --file ./importFiles/isoAkaTitles.json

gunzip -c ../../../stage/italian-aka-titles.list.gz > ../../../stage/italian-aka-titles.list
node import_italianAkaTitles.js
mongoimport --db imdbproject-dev --collection italianakatitles --file ./importFiles/italianAkaTitles.json

gunzip -c ../../../stage/keywords.list.gz > ../../../stage/keywords.list
node import_keywords.js
mongoimport --db imdbproject-dev --collection keywords --file ./importFiles/keywords.json

gunzip -c ../../../stage/language.list.gz > ../../../stage/language.list
node import_languages.js
mongoimport --db imdbproject-dev --collection language --file ./importFiles/language.json

gunzip -c ../../../stage/laserdisc.list.gz > ../../../stage/laserdisc.list
node import_laserdiscs.js
mongoimport --db imdbproject-dev --collection laserdisc --file ./importFiles/laserdiscs.json

gunzip -c ../../../stage/literature.list.gz > ../../../stage/literature.list
node import_literature.js
mongoimport --db imdbproject-dev --collection literature --file ./importFiles/literature.json

gunzip -c ../../../stage/locations.list.gz > ../../../stage/locations.list
node import_locations.js
mongoimport --db imdbproject-dev --collection locations --file ./importFiles/locations.json

gunzip -c ../../../stage/miscellaneous.list.gz > ../../../stage/miscellaneous.list
node import_miscellaneous.js
mongoimport --db imdbproject-dev --collection miscellaneous --file ./importFiles/miscellaneous.json

gunzip -c ../../../stage/movie-links.list.gz > ../../../stage/movie-links.list
node import_movieLinks.js
mongoimport --db imdbproject-dev --collection movielinks --file ./importFiles/movieLinks.json

gunzip -c ../../../stage/movies.list.gz > ../../../stage/movies.list
node import_movies.js
mongoimport --db imdbproject-dev --collection movies --file ./importFiles/movies.json

gunzip -c ../../../stage/mpaa-ratings-reasons.list.gz > ../../../stage/mpaa-ratings-reasons.list
node import_mpaaRatingReasons.js
mongoimport --db imdbproject-dev --collection mpaaratingreasons --file ./importFiles/mpaaRatingReasons.json

gunzip -c ../../../stage/plot.list.gz > ../../../stage/plot.list
node import_plots.js
mongoimport --db imdbproject-dev --collection plot --file ./importFiles/plot.json

gunzip -c ../../../stage/producers.list.gz > ../../../stage/producers.list
node import_producers.js
mongoimport --db imdbproject-dev --collection producers --file ./importFiles/producers.json

gunzip -c ../../../stage/production-companies.list.gz > ../../../stage/production-companies.list
node import_productionCompanies.js
mongoimport --db imdbproject-dev --collection productioncompanies --file ./importFiles/productionCompanies.json

gunzip -c ../../../stage/production-designers.list.gz > ../../../stage/production-designers.list
node import_productionDesigners.js
mongoimport --db imdbproject-dev --collection productiondesigners --file ./importFiles/productionDesigners.json

gunzip -c ../../../stage/quotes.list.gz > ../../../stage/quotes.list
node import_quotes.js
mongoimport --db imdbproject-dev --collection quotes --file ./importFiles/quotes.json

gunzip -c ../../../stage/ratings.list.gz > ../../../stage/ratings.list
node import_ratings.js
mongoimport --db imdbproject-dev --collection ratings --file ./importFiles/ratings.json

gunzip -c ../../../stage/release-dates.list.gz > ../../../stage/release-dates.list
node import_releaseDates.js
mongoimport --db imdbproject-dev --collection releasedates --file ./importFiles/releaseDates.json

gunzip -c ../../../stage/running-times.list.gz > ../../../stage/running-times.list
node import_runningTimes.js
mongoimport --db imdbproject-dev --collection runningtimes --file ./importFiles/runningTimes.json

gunzip -c ../../../stage/sound-mix.list.gz > ../../../stage/sound-mix.list
node import_soundMix.js
mongoimport --db imdbproject-dev --collection soundmixes --file ./importFiles/soundMixes.json

gunzip -c ../../../stage/soundtracks.list.gz > ../../../stage/soundtracks.list
node import_soundtracks.js
mongoimport --db imdbproject-dev --collection soundtracks --file ./importFiles/soundtracks.json

gunzip -c ../../../stage/special-effects-companies.list.gz > ../../../stage/special-effects-companies.list
node import_specialEffectsCompanies.js
mongoimport --db imdbproject-dev --collection specialeffectscompanies --file ./importFiles/specialEffectsCompanies.json

gunzip -c ../../../stage/taglines.list.gz > ../../../stage/taglines.list
node import_taglines.js
mongoimport --db imdbproject-dev --collection taglines --file ./importFiles/taglines.json

gunzip -c ../../../stage/technical.list.gz > ../../../stage/technical.list
node import_techincal.js
mongoimport --db imdbproject-dev --collection technical --file ./importFiles/technical.json

gunzip -c ../../../stage/trivia.list.gz > ../../../stage/trivia.list
node import_trivia.js
mongoimport --db imdbproject-dev --collection trivia --file ./importFiles/trivia.json

gunzip -c ../../../stage/writers.list.gz > ../../../stage/writers.list
node import_writers.js
mongoimport --db imdbproject-dev --collection writers --file ./importFiles/writers.json
