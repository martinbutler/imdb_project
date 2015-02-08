/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Actress = require('./actress.model');

exports.register = function(socket) {
  Actress.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Actress.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('actress:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('actress:remove', doc);
}