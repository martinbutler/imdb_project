/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ReleaseDate = require('./releaseDate.model');

exports.register = function(socket) {
  ReleaseDate.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ReleaseDate.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('releaseDate:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('releaseDate:remove', doc);
}