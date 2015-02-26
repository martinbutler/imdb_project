/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Genre = require('./genre.model');

exports.register = function(socket) {
  Genre.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Genre.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('genre:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('genre:remove', doc);
}