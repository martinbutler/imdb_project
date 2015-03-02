/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var CostumeDesigner = require('./costumeDesigner.model');

exports.register = function(socket) {
  CostumeDesigner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  CostumeDesigner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('costumeDesigner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('costumeDesigner:remove', doc);
}