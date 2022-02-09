const express = require('express');
const app = express();

var moment = require('moment');

var ruta = express.Router();

ruta
  .route("/")
  .get(require("../v1/funcionando"))
  .post(require("../v1/funcionando"));

ruta
  .route('/tiempo')
  .get(async(req,res) => {
    res.send(moment(Date.now()).format('MM-DD-YYYY/HH:mm:ss'));
  });

ruta
  .route('/date')
  .get(async(req,res) => {
  
    res.send(Date.now()+"");
  });

ruta
  .route('/convertdate/:date')
  .get(async(req,res) => {
    res.send(moment(parseInt(req.params.date)).format('MM-DD-YYYY/HH:mm:ss')); 
});

ruta
  .route('/datefuture')
  .get(async(req,res) => {

    res.send( Date.now()+604800*1000+""); 
  });

module.exports = ruta;
   