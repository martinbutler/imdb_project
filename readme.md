- # [IMDB Project](https://github.com/martinbutler/imdb_project)
MASTERS PROJECT PROPOSAL
SPRING 2015

## Interface for Querying and Data Mining for the IMDb Dataset
- by: Martin Butler
- Advisor: Dr. Stefan Robila
- Department of Computer Science
- Montclair State University
- Montclair, NJ 07043

# Objective:

The goal of the project is develop a web-based software system providing a user interface to query data from IMDb (Internet Movie Database) dataset. The system will be built on a free and open-source solution stack.  The completion of the the data analysis will determine the full architect, but I currently expect to use the following subset of technologies; AngularJS [1], ExpressJs [2], Javascript [3], and NodeJs [4].

# Background:

The IMDb is an online database of information related to films, television programs, and video games, taking in various information including, but not limited to, actors, production crew, fictional characters, biographies, plot summaries, and trivia [5].  The IMDb doesn’t currently provide an API (application programming interface) to allow for customized views and/or queries to their database, however they do provide alternative interfaces.  One of the provided alternatives is a subset of the IMDb in plain text data files for local access [6].

An internet search on the use of this dataset returns numerous references from academic sites and in a number of published papers.  Colleges and Universities have suggested the dataset as a research topic in areas of data mining [7][8].  Publications have shown various uses of the dataset including combining Collaborative Filtering and Content-based methods to improve recommendations [9] and building more robust search capabilities as compared to rudimentary search functionality by content providers such as Netflix [10].

The dataset [11] includes over 5.5 GB of plain text data in 45 files:
- Actors, ~933 MB
- Actresses, ~550 MB
- AKA-Names, ~30 MB
- AKA-Titles, ~31 MB
- Alternative Versions, ~7 MB
- Biographies, ~500 MB
- Business, ~54 MB
- Certificates, ~26 MB
- Cinematographers, ~52 MB
- Color Info, ~68 MB
- Complete Cast, ~4 MB
- Complete Crew, ~3 MB
- Composers, ~ 44 MB
- Costume Designers, ~ 15 MB
- Countries, ~ 63 MB
- Crazy Credits, ~ 3 MB
- Directors, ~ 96MB
- Distributors, ~ 132 MB
- Editors, ~ 67 MB
- Genres, ~ 72 MB
- Keywords, ~ 252 MB
- Language, ~ 68 MB
- Laserdisc, ~ 5 MB
- Literature, ~ 22 MB
- Locations, ~ 63 MB
- Miscellaneous Companies, ~ 74 MB
- Miscellaneous, ~ 74 MB
- Movie Links, ~ 48 MB
- Movies, ~ 147 MB
- MPAA Ratings Reasons, ~ 3 MB
- Plot, ~ 311 MB
- Producers, ~ 350 MB
- Production Companies, ~ 120 MB
- Production Designers, ~ 18 MB
- Quotes, ~ 170 MB
- Ratings, ~ 40 MB
- Release Dates, ~ 240 MB
- Running Times, ~ 40 MB
- Sound Mix, ~ 25 MB
- Soundtracks, ~ 71 MB
- Special Effects Companies, ~ 4 MB
- Taglines, ~ 13 MB
- Technical, ~ 79 MB
- Trivia, ~ 97 MB
- Writes, ~ 200 MB

# Proposed work:

Initialing I will analyze the dataset to determine and document its schema.  Based on this work, I will determine which type of DB to utilize and implement; SQL or NoSQL DB. In addition, the schema will help provide the query opportunities available, which will determine the comprehensive query features to be implemented.

Basic search options will be implemented on many, if not all tables.  Similar to the current search on the IMDb website [12], a simple autocompletion will be implemented utilizing some of fields from a few of the tables (i.e. actors, actresses, and movies).  More advance multi criteria queries across various tables will also be implemented based on documented schema from DB analysis. For example:
Search including any combination of the following fields:
Release Date (range)
Genre
Film Company
Language
Awards (i.e. Emmy, Oscars, etc)
MPAA rating

Finally, I would like provide users with the option to save their query history by leveraging OAuth.  OAuth is an open standard to authorization by providing client application a ‘secure delegated access’ to server resources on behalf of a resource owner [13]

In addition, some light data mining will be explored. For example, I plan to investigate the feasibility of clustering (such as k-means clustering) for the data or correlation between ratings and MPAA ratings, or investigate changes in ratings as dependent on the movie release year.

The completed work is intended to be an open-source software development effort in that codebase will be made available on the GitHub website [14] for free and unrestricted use.  This will allow others a framework to work with the IMDb dataset and augment and/or update the code by forking [15] their own copy of the repository.


# References:

- [1] AnuglarJS by Google, https://angularjs.org/
- [2] ExpressJS, http://expressjs.com/
- [3] Mozilla Developer Network, https://developer.mozilla.org/en-US/docs/Web/JavaScript
- [5] Internet Movie Database, http://en.wikipedia.org/wiki/Internet_Movie_Database
- [6] IMDb.com Alternative Interfaces, http://www.imdb.com/interfaces
- [7] Stanford University ,http://web.stanford.edu/class/cs341/data.html
- [8] University of Notre Dame, College of Engerineering http://www3.nd.edu/~rjohns15/cse40647.01/www/resources.php
- [9] Content-Boosted Collaborative Filtering for Improved Recommendations, http://www.aaai.org/Papers/AAAI/2002/AAAI02-029.pdf
- [10] A Conversational Movie Search System Based on Conditional Random Fields, https://groups.csail.mit.edu/sls/publications/2012/Liu-Interspeech12.pdf
- [11] FTP Mirror Site, IMDb dataset files, ftp.fu-berlin.de/pub/misc/movies/database/
- [12] IMDb.com, http://www.imdb.com/
- [13] OAuth, http://en.wikipedia.org/wiki/OAuth
- [14] GitHub.com, https://github.com/about
- [15] Forking, http://en.wikipedia.org/wiki/Fork_(software_development)

