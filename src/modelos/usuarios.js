const mongoose = require('mongoose');

module.exports = mongoose.model('usuarios', {
    wallet: String,
    email: String,
    password: String,
    username: String,
    active: Boolean,
    payAt: Number,
    checkpoint: Number,
    reclamado: Boolean,
    balance: Number,
    ingresado: Number,
    retirado: Number,
    deposit: [{
      amount: Number,
      date: Number,
      finalized: Boolean,
      txhash: String

    }],
    retiro: [{
      amount: Number,
      date: Number,
      done: Boolean,
      dateSend: Number,
      txhash: String

    }],
    txs: [String],
    pais: String,
    imagen: String,
    wcscExchange: Number

});