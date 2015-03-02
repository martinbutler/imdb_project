/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Goof = require('./goof.model');

exports.register = function(socket) {
  Goof.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Goof.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('goof:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('goof:remove', doc);
}