/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Miscellaneous = require('./miscellaneous.model');

exports.register = function(socket) {
  Miscellaneous.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Miscellaneous.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('miscellaneous:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('miscellaneous:remove', doc);
}