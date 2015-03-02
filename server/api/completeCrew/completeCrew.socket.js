/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CompleteCrew = require('./completeCrew.model');

exports.register = function(socket) {
  CompleteCrew.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CompleteCrew.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('completeCrew:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('completeCrew:remove', doc);
}