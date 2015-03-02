/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Cinematographer = require('./cinematographer.model');

exports.register = function(socket) {
  Cinematographer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Cinematographer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('cinematographer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('cinematographer:remove', doc);
}