/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Editor = require('./editor.model');

exports.register = function(socket) {
  Editor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Editor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('editor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('editor:remove', doc);
}