/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Technical = require('./technical.model');

exports.register = function(socket) {
  Technical.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Technical.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('technical:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('technical:remove', doc);
}