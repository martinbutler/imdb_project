/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ProductionCompany = require('./productionCompany.model');

exports.register = function(socket) {
  ProductionCompany.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ProductionCompany.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('productionCompany:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('productionCompany:remove', doc);
}