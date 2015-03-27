/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MovieLink = require('./movieLink.model');

exports.register = function(socket) {
  MovieLink.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  MovieLink.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('movieLink:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('movieLink:remove', doc);
}