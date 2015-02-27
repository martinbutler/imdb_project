/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Writer = require('./writer.model');

exports.register = function(socket) {
  Writer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Writer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('writer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('writer:remove', doc);
}