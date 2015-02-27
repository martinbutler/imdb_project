/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Location = require('./location.model');

exports.register = function(socket) {
  Location.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Location.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('location:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('location:remove', doc);
}