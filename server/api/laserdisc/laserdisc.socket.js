/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Laserdisc = require('./laserdisc.model');

exports.register = function(socket) {
  Laserdisc.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Laserdisc.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('laserdisc:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('laserdisc:remove', doc);
}