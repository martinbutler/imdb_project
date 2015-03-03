/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var SpecialEffectsCompany = require('./specialEffectsCompany.model');

exports.register = function(socket) {
  SpecialEffectsCompany.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  SpecialEffectsCompany.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('specialEffectsCompany:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('specialEffectsCompany:remove', doc);
}