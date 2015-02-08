/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Actor = require('./actor.model');

exports.register = function(socket) {
  Actor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Actor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('actor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('actor:remove', doc);
}