/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Keyword = require('./keyword.model');

exports.register = function(socket) {
  Keyword.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Keyword.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('keyword:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('keyword:remove', doc);
}