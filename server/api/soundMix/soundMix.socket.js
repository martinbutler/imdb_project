/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var SoundMix = require('./soundMix.model');

exports.register = function(socket) {
  SoundMix.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  SoundMix.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('soundMix:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('soundMix:remove', doc);
}