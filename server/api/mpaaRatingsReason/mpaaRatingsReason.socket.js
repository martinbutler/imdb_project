/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var MpaaRatingsReason = require('./mpaaRatingsReason.model');

exports.register = function(socket) {
  MpaaRatingsReason.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  MpaaRatingsReason.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('mpaaRatingsReason:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('mpaaRatingsReason:remove', doc);
}