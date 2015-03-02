/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Distributor = require('./distributor.model');

exports.register = function(socket) {
  Distributor.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Distributor.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('distributor:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('distributor:remove', doc);
}