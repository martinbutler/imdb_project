/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var Plot = require('./plot.model');

exports.register = function(socket) {
  Plot.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  Plot.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('plot:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('plot:remove', doc);
}