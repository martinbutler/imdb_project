/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Tagline = require('./tagline.model');

exports.register = function(socket) {
  Tagline.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Tagline.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('tagline:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('tagline:remove', doc);
}