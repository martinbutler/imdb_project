/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var GermanAkaTitle = require('./germanAkaTitle.model');

exports.register = function(socket) {
  GermanAkaTitle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  GermanAkaTitle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('germanAkaTitle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('germanAkaTitle:remove', doc);
}