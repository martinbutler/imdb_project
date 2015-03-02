/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AlternateVersion = require('./alternateVersion.model');

exports.register = function(socket) {
  AlternateVersion.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AlternateVersion.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('alternateVersion:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('alternateVersion:remove', doc);
}