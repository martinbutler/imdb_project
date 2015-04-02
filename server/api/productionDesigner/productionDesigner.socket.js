/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var ProductionDesigner = require('./productionDesigner.model');

exports.register = function(socket) {
  ProductionDesigner.schema.post('save', function (doc) {
    onSave(socket, doc);
  });
  ProductionDesigner.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

function onSave(socket, doc, cb) {
  socket.emit('productionDesigner:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('productionDesigner:remove', doc);
}