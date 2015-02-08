/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Director = require('./director.model');

exports.register = function(socket) {
  Director.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Director.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('director:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('director:remove', doc);
}