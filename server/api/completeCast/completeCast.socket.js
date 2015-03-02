/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CompleteCast = require('./completeCast.model');

exports.register = function(socket) {
  CompleteCast.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CompleteCast.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('completeCast:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('completeCast:remove', doc);
}