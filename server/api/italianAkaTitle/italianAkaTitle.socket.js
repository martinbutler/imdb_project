/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ItalianAkaTitle = require('./italianAkaTitle.model');

exports.register = function(socket) {
  ItalianAkaTitle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ItalianAkaTitle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('italianAkaTitle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('italianAkaTitle:remove', doc);
}