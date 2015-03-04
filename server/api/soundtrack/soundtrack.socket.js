/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Soundtrack = require('./soundtrack.model');

exports.register = function(socket) {
  Soundtrack.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Soundtrack.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('soundtrack:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('soundtrack:remove', doc);
}