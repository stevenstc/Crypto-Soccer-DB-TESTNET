const mongoose = require('mongoose');

module.exports = mongoose.model('appdatos', {

  entregado: Number,
  ganado: Number, 
  ganadoliga: Number,
  misiondiaria: Boolean,
  finliga: Number

});