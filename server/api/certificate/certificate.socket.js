/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Certificate = require('./certificate.model');

exports.register = function(socket) {
  Certificate.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Certificate.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('certificate:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('certificate:remove', doc);
}