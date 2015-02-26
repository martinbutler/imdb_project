/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Color = require('./color.model');

exports.register = function(socket) {
  Color.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Color.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('color:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('color:remove', doc);
}