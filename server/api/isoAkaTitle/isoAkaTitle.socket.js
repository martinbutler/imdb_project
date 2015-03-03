/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var IsoAkaTitle = require('./isoAkaTitle.model');

exports.register = function(socket) {
  IsoAkaTitle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  IsoAkaTitle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('isoAkaTitle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('isoAkaTitle:remove', doc);
}