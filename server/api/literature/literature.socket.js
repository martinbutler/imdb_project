/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Literature = require('./literature.model');

exports.register = function(socket) {
  Literature.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Literature.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('literature:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('literature:remove', doc);
}