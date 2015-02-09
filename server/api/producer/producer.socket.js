/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Producer = require('./producer.model');

exports.register = function(socket) {
  Producer.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Producer.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('producer:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('producer:remove', doc);
}