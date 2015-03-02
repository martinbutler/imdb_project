/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Composer = require('./composer.model');

exports.register = function(socket) {
  Composer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Composer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('composer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('composer:remove', doc);
}