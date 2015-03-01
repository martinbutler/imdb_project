/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AkaName = require('./akaName.model');

exports.register = function(socket) {
  AkaName.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AkaName.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('akaName:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('akaName:remove', doc);
}