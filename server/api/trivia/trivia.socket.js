/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Trivia = require('./trivia.model');

exports.register = function(socket) {
  Trivia.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Trivia.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('trivia:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('trivia:remove', doc);
}