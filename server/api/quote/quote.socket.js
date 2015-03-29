/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Quote = require('./quote.model');

exports.register = function(socket) {
  Quote.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Quote.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('quote:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('quote:remove', doc);
}