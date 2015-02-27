/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var RunningTime = require('./runningTime.model');

exports.register = function(socket) {
  RunningTime.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  RunningTime.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('runningTime:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('runningTime:remove', doc);
}