/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/productionDesigner/productionDesigner.socket').register(socket);
  require('../api/laserdisc/laserdisc.socket').register(socket);
  require('../api/literature/literature.socket').register(socket);
  require('../api/quote/quote.socket').register(socket);
  require('../api/releaseDate/releaseDate.socket').register(socket);
  require('../api/productionCompany/productionCompany.socket').register(socket);
  require('../api/plot/plot.socket').register(socket);
  require('../api/movieLink/movieLink.socket').register(socket);
  require('../api/miscellaneous/miscellaneous.socket').register(socket);
  require('../api/soundMix/soundMix.socket').register(socket);
  require('../api/soundtrack/soundtrack.socket').register(socket);
  require('../api/specialEffectsCompany/specialEffectsCompany.socket').register(socket);
  require('../api/trivia/trivia.socket').register(socket);
  require('../api/tagline/tagline.socket').register(socket);
  require('../api/italianAkaTitle/italianAkaTitle.socket').register(socket);
  require('../api/isoAkaTitle/isoAkaTitle.socket').register(socket);
  require('../api/germanAkaTitle/germanAkaTitle.socket').register(socket);
  require('../api/goof/goof.socket').register(socket);
  require('../api/editor/editor.socket').register(socket);
  require('../api/distributor/distributor.socket').register(socket);
  require('../api/crazyCredit/crazyCredit.socket').register(socket);
  require('../api/costumeDesigner/costumeDesigner.socket').register(socket);
  require('../api/composer/composer.socket').register(socket);
  require('../api/completeCrew/completeCrew.socket').register(socket);
  require('../api/completeCast/completeCast.socket').register(socket);
  require('../api/cinematographer/cinematographer.socket').register(socket);
  require('../api/certificate/certificate.socket').register(socket);
  require('../api/alternateVersion/alternateVersion.socket').register(socket);
  require('../api/akaName/akaName.socket').register(socket);
  require('../api/akaTitle/akaTitle.socket').register(socket);
  require('../api/writer/writer.socket').register(socket);
  require('../api/location/location.socket').register(socket);
  require('../api/runningTime/runningTime.socket').register(socket);
  require('../api/technical/technical.socket').register(socket);
  require('../api/language/language.socket').register(socket);
  require('../api/color/color.socket').register(socket);
  require('../api/genre/genre.socket').register(socket);
  require('../api/country/country.socket').register(socket);
  require('../api/business/business.socket').register(socket);
  require('../api/keyword/keyword.socket').register(socket);
  require('../api/producer/producer.socket').register(socket);
  require('../api/rating/rating.socket').register(socket);
  require('../api/director/director.socket').register(socket);
  require('../api/actor/actor.socket').register(socket);
  require('../api/actress/actress.socket').register(socket);
  require('../api/mpaaRatingsReason/mpaaRatingsReason.socket').register(socket);
  require('../api/movie/movie.socket').register(socket);
  require('../api/thing/thing.socket').register(socket);
}

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket);
    console.info('[%s] CONNECTED', socket.address);
  });
};