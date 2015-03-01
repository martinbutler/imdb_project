/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var AkaTitle = require('./akaTitle.model');

exports.register = function(socket) {
  AkaTitle.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  AkaTitle.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('akaTitle:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('akaTitle:remove', doc);
}