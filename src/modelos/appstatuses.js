const mongoose = require('mongoose');

module.exports = mongoose.model('appstatuses', {
  version: String,
  torneo: String,
  duelo: String,
  liga: String,
  mantenimiento: String,
  link: String,
  entregado: Number,
  ganado: Number, 
  ganadoliga: Number,
  linea: [Number],
  updates: [String],
  misiondiaria: Boolean,
  apuestas:[Boolean]
  
});