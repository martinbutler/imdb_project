/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CrazyCredit = require('./crazyCredit.model');

exports.register = function(socket) {
  CrazyCredit.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CrazyCredit.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('crazyCredit:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('crazyCredit:remove', doc);
}