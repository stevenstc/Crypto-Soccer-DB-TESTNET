const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Web3 = require('web3');
var cors = require('cors');
require('dotenv').config();
var moment = require('moment');
const BigNumber = require('bignumber.js');
const uc = require('upper-case');

const abiMarket = require("./abiMarket.js");

//console.log(("HolA Que Haze").toUpperCase())
//console.log(("HolA Que Haze").toLowerCase())

//var cosa = {cosita: "1,23456"}
//console.log(cosa["cosita"].replace(",","."))

var aleatorio = 1;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

var superUser = require("./superUser");

var testers = require("./betaTesters")

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.text());

const port = process.env.PORT || 3004;
const PEKEY = process.env.APP_PRIVATEKEY;
const TOKEN = process.env.APP_TOKEN;

const TokenEmail = "nuevo123";
const uri = process.env.APP_URI;

const DaylyTime = process.env.APP_DAYTIME || 86400;

const TimeToMarket = process.env.APP_TIMEMARKET || 86400 * 7;

const quitarLegandarios = process.env.APP_QUIT_LEGENDARIOS || "false";
const quitarEpicos = process.env.APP_QUIT_EPICOS || "true";
const quitarComunes = process.env.APP_QUIT_COMUNES || "true";

const testNet = false; //quita todos los equipos y formaciones comprados deja solo los equpos testnet

const COMISION = process.env.APP_COMISION || 60000;

const explorador = process.env.APP_EXPLORER || "https://bscscan.com/tx/";

const RED = process.env.APP_RED || "https://bsc-dataseed.binance.org/";
const addressContract = process.env.APP_CONTRACT || "0xfF7009EF7eF85447F6A5b3f835C81ADd60a321C9";

const imgDefault = "https://cryptosoccermarket.com/assets/img/default-user-csg.png";

let web3 = new Web3(RED);
let cuenta = web3.eth.accounts.privateKeyToAccount(PEKEY); 

const contractMarket = new web3.eth.Contract(abiMarket,addressContract);
//const contractToken = new web3.eth.Contract(abiToken,addressContractToken);

web3.eth.accounts.wallet.add(PEKEY);

//console.log(web3.eth.accounts.wallet[0].address);

//console.log(await web3.eth.accounts.wallet);
//tx web3.eth.accounts.signTransaction(tx, privateKey);
/*web3.eth.sendTransaction({
    from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
    gasPrice: "20000000000",
    gas: "21000",
    to: '0x3535353535353535353535353535353535353535',
    value: "1000000000000000000",
    data: ""
}, 'MyPassword!').then(console.log);*/
//console.log(web3.eth.accounts.wallet);
const options = { useNewUrlParser: true, useUnifiedTopology: true };

var formatoliga = 'MDYYYY';

mongoose.connect(uri, options)
    .then(async() => { console.log("Conectado Exitodamente!");})
    .catch(err => { console.log(err); });

const user = require("./modelos/usuarios");
const appstatuses = require("./modelos/appstatuses");
const appdatos = require("./modelos/appdatos");
const playerData = require("./modelos/playerdatas");
const userplayonline = require("./modelos/userplayonline");
const playerdatas = require('./modelos/playerdatas');

app.get('/', require("./v1/funcionando"));

app.get('/api', require("./v1/funcionando"));

app.get('/api/v1', require("./v1/funcionando"));

app.use('/api/v2', require("./v2"));

app.get('api/v1/tiempo', async(req,res) => {
    res.send(moment(Date.now()).format('MM-DD-YYYY/HH:mm:ss'));
});

app.get('/api/v1/date',async(req,res) => {
    res.send(Date.now()+"");
});

app.get('/api/v1/convertdate/:date',async(req,res) => {

    res.send(moment(parseInt(req.params.date)).format('MM-DD-YYYY/HH:mm:ss')); 
});

app.get('/api/v1/datefuture',async(req,res) => {

	var data = Date.now()+604800*1000;
    res.send(data+""); 
});

app.get('/api/v1/sesion/consultar/',async(req,res) => {

    if( req.query.sesionID ){

        var sesion = await userplayonline.find({ sesionID: req.query.sesionID },{_id:0}).sort({identificador: 1});
        if(sesion.length > 0){
            res.send(sesion[sesion.length-1]);
        }else{
            res.send("null");

        }
    }else{

        var sesion = await userplayonline.find({ },{_id:0, soporte1:0,soporte2:0}).sort({identificador: 1});
        //console.log(sesion[0].identificador);
        //console.log(sesion[sesion.length-1].identificador);
        if(sesion.length > 0){
            res.send(sesion[sesion.length-1]);
        }else{
            res.send("null");

        }

    }

});

app.get('/api/v1/sesion/consultar/saque',async(req,res) => {

    if( req.query.sesionID ){

        var sesion = await userplayonline.find({sesionID: req.query.sesionID },{_id:0}).sort({identificador: 1});

        if(sesion.length > 0){
            res.send(sesion[sesion.length-1].saqueInicial+"");
        }else{
            res.send("null");
        }
        
    }else{
        res.send("null");
    }

});

app.get('/api/v1/sesion/consultar/turno',async(req,res) => {

    if( req.query.sesionID ){

        var sesion = await userplayonline.find({sesionID: req.query.sesionID },{_id:0}).sort({identificador: 1});

        if(sesion.length > 0){
            res.send(sesion[sesion.length-1].turno+"");
        }else{
            res.send("null");
        }
        
    }else{
        res.send("null");
    }

});

app.post('/api/v1/sesion/actualizar/turno',async(req,res) => {

    if( req.body.sesionID && req.body.token == TOKEN){

        var sesion = await userplayonline.find({sesionID: req.body.sesionID }).sort({identificador: 1});

        if(sesion.length > 0){
            if(sesion[sesion.length-1].turno === "1"){
                sesion[sesion.length-1].turno = "2";
            }else{
                sesion[sesion.length-1].turno = "1";
            }

            var userPlay = new userplayonline(sesion[sesion.length-1]);
            await userPlay.save();

            res.send(sesion[sesion.length-1].turno+"");
        }else{
            res.send("null");
        }
        
    }else{
        res.send("null");
    }

});

app.get('/api/v1/sesion/consultar/id',async(req,res) => {

    if( req.query.sesionID ){
 
        var sesion = await userplayonline.find({ sesionID: req.query.sesionID },{_id:0}).sort({identificador: 1});
        console.log(req.query.sesionID);
        //console.log(sesion[sesion.length-1].identificador);
        if(sesion.length > 0){
            res.send(sesion[sesion.length-1].identificador+"");
        }else{
            res.send("null");
        }
        
    }else{
        res.send("null");
    }

});

app.get('/api/v1/sesion/consultar/porid',async(req,res) => {

    if( req.query.id ){
        var soporte = 0;
        if(req.query.soporte){
            soporte = 1;
        }
 
        var sesion = await userplayonline.find({identificador: req.query.id},{__v:0,_id:0,soporte1:soporte,soporte2:soporte});
        //console.log(sesion);
        //console.log(sesion[sesion.length-1].identificador);
        if(sesion.length > 0){
            res.send(sesion[sesion.length-1]);
        }else{
            res.send("null");
        }
        
    }else{
        res.send("null");
    }

});

app.post('/api/v1/sesion/crear/',async(req,res) => {

    if(req.body.sesionID && req.body.token == TOKEN ){

        var ids = await userplayonline.find({});

        usuario1 = await user.find({ username: req.body.u1 });
        usuario1 = await playerdatas.find({ wallet: usuario1[0].wallet });
        usuario1 = usuario1[0];

        usuario2 = await user.find({ username: req.body.u2 });
        usuario2 = await playerdatas.find({ wallet: usuario2[0].wallet });
        usuario2 = usuario2[0];

        var playOnline = new userplayonline({
            identificador: ids.length,
            sesionID: req.body.sesionID,
            incio: Date.now(),
            fin: 0,
            finalizada: false,
            ganador: "",
            tipo: req.body.tipo,
            saqueInicial: aleatorio,
            turno: aleatorio,
            csc: req.body.csc,
            u1: req.body.u1,
            u2: req.body.u2,
            soporte1: usuario1.Soporte,
            soporte2: usuario2.Soporte
            
        });

        if(aleatorio === 2){
            aleatorio = 1;

        }else{
            aleatorio = 1;

        }
        

        if(req.body.u1 === req.body.u2){
            var datos = {}
            datos.active = false;
            update = await user.updateOne({ username: req.body.u1 }, datos);
            res.send("false");
        }else{
            await playOnline.save();

            res.send("true");
        }

        

    }else{
        res.send("false")
    }
    
});

app.post('/api/v1/sesion/actualizar/',async(req,res) => {

    if(req.body.sesionID && req.body.token == TOKEN ){

        var sesionPlay = await userplayonline.find({$and: [{ sesionID: req.body.sesionID }, { finalizada: false }]}).sort([['identificador', 1]]);

        if(sesionPlay.length > 0){
            //console.log(sesionPlay.length-1)
            //console.log(sesionPlay[sesionPlay.length-1]);

            sesionPlay = sesionPlay[sesionPlay.length-1];

            if(!sesionPlay.finalizada){

                sesionPlay.fin = Date.now();
                sesionPlay.finalizada = true
                sesionPlay.ganador = req.body.ganador;

                if(req.body.soporte1 === ""){
                    usuario1 = await user.find({ username: sesionPlay.u1 });
                    usuario1 = await playerdatas.find({ wallet: usuario1[0].wallet });
                    usuario1 = usuario1[0];

                    sesionPlay.soporte1 = usuario1.Soporte;
                }else{
                    sesionPlay.soporte1 = req.body.soporte1;
                }

                if(req.body.soporte2 === ""){
                    usuario2 = await user.find({ username: sesionPlay.u2 });
                    usuario2 = await playerdatas.find({ wallet: usuario2[0].wallet });
                    usuario2 = usuario2[0];

                    sesionPlay.soporte2 = usuario2.Soporte;
                }else{
                    sesionPlay.soporte2 = req.body.soporte2;
                }

                
                var userPlay = new userplayonline(sesionPlay);
                await userPlay.save();

                //await userplayonline.updateOne({ sesionID: req.body.sesionID }, datos);

                await userplayonline.updateMany({ $and: [{ sesionID: req.body.sesionID }, { finalizada: false }]}, { finalizada: true, fin: Date.now()});

                res.send("true");
            }else{
                res.send("false");
            }
        }else{
            res.send("false");
        }

    }else{
        res.send("false")
    }

    
});

app.get('/api/v1/user/teams/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address })
        .catch(err => {console.log(err); return 0})

    console.log(result);
  
    var inventario = [];

    var cantidad = 43;

    for (let index = 0; index < cantidad; index++) {
        inventario[index] = 0;
    }
        
    if (!testNet) {
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
            .inventario(wallet, index)
            .call({ from: cuenta.address })
            .catch(err => {console.log(err); return {nombre: "ninguno"}})

    
            if(item.nombre.indexOf("t") === 0){
    
                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("t")+1,item.nombre.indexOf("-")))-1] =  1;
    
            }
    
        }

    }

    if (quitarLegandarios === "true") { // quitar legendarios
        for (let index = 0; index < 3; index++) {

            inventario[index] = 0;

        }

    }

    if (quitarEpicos === "true") { // quitar epicos

        for (let index = 3; index < 10; index++) {

            inventario[index] = 0;

        }
        
    }

    if (quitarComunes === "true") { // quitar Comunes

        for (let index = 10; index < cantidad; index++) {

            inventario[index] = 0;

        }
        
    }

    for (let t = 0; t < testers.length; t++) {
            
        if(testers[t].toLowerCase() == wallet){
            inventario[cantidad] = 1;
        }
    }

    for (let t = 0; t < superUser.length; t++) {
        if(superUser[t].toLowerCase() == wallet){
            for (let index = 0; index < cantidad; index++) {
                inventario[index] = 1;
            }
        }
        
    }

    //console.log(inventario);

    res.send(inventario.toString());
});

app.get('/api/v1/formations/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address })
        .catch(err => {console.log(err); return 0})
  
    var inventario = [];

    for (let index = 0; index < 4; index++) {
        inventario[index] = 0;
    }

    if (!testNet) {
  
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
                .inventario(wallet, index)
                .call({ from: cuenta.address })
                .catch(err => {console.log(err); return 0})


            if(item.nombre.indexOf("f") === 0){

                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("f")+1,item.nombre.indexOf("-")))-1] =  1;

            }

        }
    }

    res.send("1,"+inventario.toString());
});

app.get('/api/v1/formations-teams/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    var formaciones = [];

    var inventario = [];

    var cantidad = 44;

    var isSuper = 0;

    for (let index = 0; index < superUser.length; index++) {
        if((superUser[index]).toLowerCase() === wallet){
            isSuper = 1;
        }
        
    }

    for (let index = 0; index < 5; index++) {
        formaciones[index] = isSuper;
    }

    for (let index = 0; index < cantidad; index++) {
        inventario[index] = isSuper;
    }
        
    if (isSuper === 0) {
        var largoInventario = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address })
        .catch(err => {console.log(err); return 0})
  
        for (let index = 0; index < largoInventario; index++) {

            var item = await contractMarket.methods
                .inventario(wallet, index)
                .call({ from: cuenta.address })
                .catch(() => {return {nombre: "ninguno"}})


            if(item.nombre.indexOf("f") === 0){

                formaciones[parseInt(item.nombre.slice(item.nombre.indexOf("f")+1,item.nombre.indexOf("-")))-1] =  1;

            }
    
            if(item.nombre.indexOf("t") === 0){
    
                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("t")+1,item.nombre.indexOf("-")))-1] =  1;
    
            }
    
        }

        if (quitarLegandarios === "true") { // quitar legendarios
            for (let index = 0; index < 3; index++) {

                inventario[index] = 0;

            }

        }

        if (quitarEpicos === "true") { // quitar epicos

            for (let index = 3; index < 10; index++) {

                inventario[index] = 0;

            }
            
        }

        if (quitarComunes === "true") { // quitar Comunes

            for (let index = 10; index < cantidad; index++) {

                inventario[index] = 0;

            }
            
        }
    }

    // añadir equipo betatester

    for (let t = 0; t < testers.length; t++) {
            
        if(testers[t].toLowerCase() == wallet){
            inventario[inventario.length-1] = 1;
        }
    }

    inventario = [...inventario,1,...formaciones]

    //console.log(inventario)

    res.send(inventario.toString());

});

app.get('/api/v1/coins/:wallet',async(req,res) => {

    let wallet =  req.params.wallet.toLowerCase();

    if(!web3.utils.isAddress(wallet)){
        console.log("wallet incorrecta: "+wallet)
        res.send("0");
    }else{
            usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];
            res.send(usuario.balance+"");

        }else{
            console.log("creado USUARIO al consultar monedas: "+wallet)
            var users = new user({
                wallet: uc.upperCase(wallet),   
                email: "",
                password: "",
                username: "", 
                active: true,
                payAt: Date.now(),
                checkpoint: 0,
                reclamado: false,
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: [],
                pais: "null",
                imagen: imgDefault,
                wcscExchange: await consultarCscExchange(wallet)
            });

            users.save().then(()=>{
                console.log("Usuario creado exitodamente");
                res.send("0");
            })
                
            
        }

    }

    
});

app.post('/api/v1/asignar/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    req.body.coins = parseInt(req.body.coins);
    
    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            var datos = usuario[0];
            if(datos.active){
                datos.balance = datos.balance + req.body.coins;
                datos.ingresado = datos.ingresado + req.body.coins;
                datos.deposit.push({amount: req.body.coins,
                    date: Date.now(),
                    finalized: true,
                    txhash: "Win coins: "+req.body.coins+" # "+uc.upperCase(wallet)
                })

                datos.wcscExchange = await consultarCscExchange(wallet);

                var nuevoUsuario = new user(datos)
                await nuevoUsuario.save();

                //update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                console.log("Win coins: "+req.body.coins+" # "+uc.upperCase(wallet));
                res.send("true");
            }else{
                res.send("false");
            }
    
        }else{
            console.log("creado USUARIO al Asignar"+wallet)
            var users = new user({
                wallet: uc.upperCase(wallet),
                email: "",
                password: "",
                username: "", 
                active: true,
                payAt: Date.now(),
                checkpoint: 0,
                reclamado: false,
                balance: req.body.coins,
                ingresado: req.body.coins,
                retirado: 0,
                deposit: [{amount: req.body.coins,
                    date: Date.now(),
                    finalized: true,
                    txhash: "Win coins: "+req.body.coins+" # "+req.params.wallet
                }],
                retiro: [],
                txs: [],
                pais: "null",
                imagen: imgDefault,
                wcscExchange: await consultarCscExchange(wallet)
            });
    
            users.save().then(()=>{
                console.log("Usuario creado exitodamente");
                res.send("true");
            })
                
            
        }


    }else{
        res.send("false");
    }
		
});

app.post('/api/v1/quitar/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    req.body.coins = parseInt(req.body.coins);

    if(req.body.token == TOKEN  && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) { 
            var datos = usuario[0];
            if(datos.active){
                datos.balance = datos.balance-req.body.coins;
                if(datos.balance >= 0){

                    datos.retirado = datos.retirado+ req.body.coins;
                    datos.retiro.push({
                        amount: req.body.coins,
                        date: Date.now(),
                        done: true,
                        dateSend: Date.now(),
                        txhash: "Lost coins: "+req.body.coins+" # "+uc.upperCase(wallet)
                  
                      })

                    datos.wcscExchange = await consultarCscExchange(wallet);

                    var nuevoUsuario = new user(datos)
                    await nuevoUsuario.save();

                    //update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                    console.log("Lost coins: "+req.body.coins+" # "+uc.upperCase(wallet));
                    res.send("true");

                }else{
                    res.send("false");
                }
                
            }else{
                res.send("false");
            }
    
        }else{
            console.log("usuario creado al retirar monedas"+wallet)
            var users = new user({
                wallet: uc.upperCase(wallet),  
                email: "",
                password: "",
                username: "",   
                active: true,
                payAt: Date.now(),
                checkpoint: 0,
                reclamado: false,
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: [],
                pais: "null",
                imagen: imgDefault,
                wcscExchange: await consultarCscExchange(wallet)
            });
    
            users.save().then(()=>{
                console.log("Usuario creado exitodamente");
                res.send("false");
            })
                
            
        }

    }else{
        res.send("false");
    }
		
    
});

app.post('/api/v1/coinsaljuego/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(req.body.token == TOKEN  && web3.utils.isAddress(wallet)){

        await delay(Math.floor(Math.random() * 12000));

        coins = new BigNumber(req.body.coins).multipliedBy(10**18);

        if(await monedasAlJuego(coins,wallet,1)){
            res.send("true");

        }else{
            res.send("false");

        }

    }else{
        res.send("false");
    }
		
    
});

async function monedasAlJuego(coins,wallet,intentos){

    await delay(Math.floor(Math.random() * 12000));

    var usuario = await contractMarket.methods
    .investors(wallet)
    .call({ from: cuenta.address});

    balance = new BigNumber(usuario.balance);
    balance = balance.shiftedBy(-18);
    balance = balance.decimalPlaces(0).toNumber();

    var gases = await web3.eth.getGasPrice(); 

    var paso = true;

    var gasLimit = await contractMarket.methods.gastarCoinsfrom(coins, wallet).estimateGas({from: web3.eth.accounts.wallet[0].address});

    if(balance - coins.shiftedBy(-18).toNumber() >= 0 ){
        await contractMarket.methods
            .gastarCoinsfrom(coins, wallet)
            .send({ from: web3.eth.accounts.wallet[0].address, gas: gasLimit, gasPrice: gases })
            .then(result => {
                console.log("Monedas ENVIADAS en "+intentos+" intentos");
                //console.log(explorador+result.transactionHash);
                
                user.find({ wallet: uc.upperCase(wallet) }).then(usuario =>{

                    if (usuario.length >= 1) {
                        var datos = usuario[0];
                        if(datos.active){
                            datos.balance = coins.dividedBy(10**18).plus(datos.balance).decimalPlaces(0).toNumber();
                            datos.ingresado = coins.dividedBy(10**18).plus(datos.ingresado).decimalPlaces(0).toNumber();
                            datos.deposit.push({
                                amount: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                                date: Date.now(),
                                finalized: true,
                                txhash: "FROM MARKET: "+coins.dividedBy(10**18).decimalPlaces(0).toString()+" # wallet: "+uc.upperCase(wallet)+" # Hash: "+explorador+result.transactionHash
                            })
                            datos.txs.push(explorador+result.transactionHash)
                            update = user.updateOne({ wallet: uc.upperCase(wallet) }, datos)
                            .then(console.log("Coins SEND TO GAME: "+coins.dividedBy(10**18)+" # "+wallet))
                            .catch(console.error())
                            
                        }
                
                    }else{
                        console.log("creado USUARIO monedas al juego: "+wallet)
                        var users = new user({
                            wallet: uc.upperCase(wallet),    
                            email: "",
                            password: "",
                            username: "", 
                            active: true,
                            payAt: Date.now(),
                            checkpoint: 0,
                            reclamado: false,
                            balance: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                            ingresado: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                            retirado: 0,
                            deposit: [{amount: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                                date: Date.now(),
                                finalized: true,
                                txhash: "FROM MARKET: "+coins.dividedBy(10**18).decimalPlaces(0).toString()+" # "+uc.upperCase(wallet)+" # Hash: "+explorador+result.transactionHash
                            }],
                            retiro: [],
                            txs: [explorador+result.transactionHash]
                        });
                
                        async() => {
                            await users.save();
                            console.log("Usuario creado exitodamente");
                        };
                        
                            
                        
                    }
                })

                paso = true;
            })

            .catch(async() => {
                intentos++;
                console.log(coins.dividedBy(10**18)+" ->  "+wallet+" : "+intentos)
                await delay(Math.floor(Math.random() * 12000));
                paso = await monedasAlJuego(coins,wallet,intentos);
            })
    }else{
        paso = false;
    }

    return paso;

}

app.get('/api/v1/time/coinsalmarket/:wallet',async(req,res)=>{
    var wallet =  req.params.wallet.toLowerCase();

    if(web3.utils.isAddress(wallet)){

        var usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            var datos = usuario[0];

            res.send((datos.payAt + (TimeToMarket * 1000)).toString())
        }else{
            res.send((Date.now()+(TimeToMarket * 1000)).toString())
        }
    }else{
        res.send((Date.now()+(TimeToMarket * 1000)).toString())
    }
});

app.post('/api/v1/coinsalmarket/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        coins = new BigNumber(req.body.coins).multipliedBy(10**18);

        var usuario = await user.find({ wallet: uc.upperCase(wallet) });

        usuario = usuario[0];

        console.log(usuario.balance);
        console.log(usuario.balance-parseInt(req.body.coins))

        if (usuario.balance > 0 && usuario.balance-parseInt(req.body.coins) >= 0) {
            
            await delay(Math.floor(Math.random() * 12000));

            if(await monedasAlMarket(coins, wallet,1)){
                res.send("true");

            }else{
                res.send("false");

            }
        }else{

            res.send("false");

        }

    }else{

        res.send("false");
    }
		
    
});

async function monedasAlMarket(coins,wallet,intentos){


    await delay(Math.floor(Math.random() * 12000));

    var paso = false;

    var gases = await web3.eth.getGasPrice(); 

    var usuario = await user.find({ wallet: uc.upperCase(wallet) });

    if (usuario.length >= 1) {
        var datos = usuario[0];

        if(Date.now() < datos.payAt + (TimeToMarket * 1000))return false ;
    }else{
        return false;
    }

    await contractMarket.methods
        .asignarCoinsTo(coins, wallet)
        .send({ from: web3.eth.accounts.wallet[0].address, gas: COMISION, gasPrice: gases })
        .then(result => {

            console.log("Monedas ENVIADAS en "+intentos+" intentos");
            
            user.find({ wallet: uc.upperCase(wallet) }).then(usuario =>{

                if (usuario.length >= 1) {
                    var datos = usuario[0];
                    if(datos.active ){
                        datos.payAt = Date.now();
                        datos.balance = datos.balance-coins.dividedBy(10**18).toNumber();
                        datos.retirado = coins.dividedBy(10**18).toNumber()+datos.retirado;
                        datos.retiro.push({
                            amount: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                            date: Date.now(),
                            finalized: true,
                            txhash: "TO MARKET: "+coins.dividedBy(10**18).decimalPlaces(0).toString()+" # wallet: "+uc.upperCase(wallet)+" # Hash: "+explorador+result.transactionHash
                        })
                        datos.txs.push(explorador+result.transactionHash)
                        update = user.updateOne({ wallet: uc.upperCase(wallet) }, datos)
                        .then(console.log("Coins SEND TO MARKET: "+coins.dividedBy(10**18)+" # "+wallet))
                        .catch(console.error())
                    
                    }
            
                }else{
                    console.log("creado USUARIO monedas al Market"+wallet)
                    var users = new user({
                        wallet: uc.upperCase(wallet),
                        email: "",
                        password: "",
                        username: "", 
                        active: true,
                        payAt: Date.now(),
                        checkpoint: 0,
                        reclamado: false,
                        balance: 0,
                        ingresado: 0,
                        retirado: 0,
                        deposit: [],
                        retiro: [],
                        txs: [explorador+result.transactionHash]
                    });
            
                    users.save().then(()=>{
                        console.log("Usuario creado exitodamente");
                    })
                        
                
                }
            })

            paso = true;
        })

        .catch(async err => {
            console.log(err);
            intentos++;
            console.log(coins.dividedBy(10**18)+" ->  "+wallet+" : "+intentos)
            await delay(Math.floor(Math.random() * 12000));
            paso = await monedasAlMarket(coins,wallet,intentos);
        })

    return paso;

}

async function recompensaDiaria(wallet){

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address });
  
    var inventario = [];

    var cantidad = 43;

    var coins = 48; // CSC coins
    var bono = false;

    for (let index = 0; index < cantidad; index++) {
        inventario[index] = 0;
        for (let t = 0; t < testers.length; t++) {
            if(testers[t] == wallet){
                inventario[cantidad] = 1;
            }
            
        }
        
    }

    if (true) { // solo testers // Habilitar reconocimiento de equipos all
            
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
            .inventario(wallet, index)
            .call({ from: cuenta.address });

            if(item.nombre.indexOf("t") === 0){

                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("t")+1,item.nombre.indexOf("-")))-1] =  1;

            }

        }
    }
    

    if (true) { // habilitar bono legendarios
        for (let index = 0; index < 3; index++) {


            if(inventario[index]){

                coins += 20;
                bono = true;
                break;

            }

        }
    }

    if (true) { // habilitar bono epico

        if(!bono){

            for (let index = 3; index < 10; index++) {


                if(inventario[index]){

                    coins += 10;
                    break;

                }

            }
        }
    }

    //console.log(coins);
    return coins;

}

app.get('/api/v1/sendmail',async(req,res) => {
    //console.log(req.query);
    if(req.query.destino && req.query.code){

        var resultado = await fetch("https://brutusgroup.tk/mail.php?destino="+req.query.destino+"&code="+req.query.code+"&token=crypto2021");

        if (await resultado.text() === "true") {
            res.send("true");
        }else{
            res.send("false");
        }

    }else{
        res.send("false");
    }

});

app.get('/api/v1/enlinea',async(req,res) => {

    if(req.query.version){

        var appstatus = await appstatuses.find({version: req.query.version});
        appstatus = appstatus[appstatus.length-1]

        if(req.query.rango){

            for (let index = 0; index < appstatus.linea.length; index++) {

                if(parseInt(req.query.rango) == index){
                    if (parseInt(req.query.activo) >= 0 ) {
                        appstatus.linea[index] = parseInt(req.query.activo);
                    }else{
                        appstatus.linea[index] = 0;
                    }
                    
                }
                
            }

            datos = {};
            datos.linea = appstatus.linea;

            update = await appstatuses.updateOne({ _id: appstatus._id }, datos)

            res.send("true");

        }else{

            res.send((appstatus.linea).toString());

        }   
    }else{

        var appstatus = await appstatuses.find({});
        appstatus = appstatus[appstatus.length-1]

        if(req.query.rango){

            for (let index = 0; index < appstatus.linea.length; index++) {

                if(parseInt(req.query.rango) == index){
                    if (parseInt(req.query.activo) >= 0 ) {
                        appstatus.linea[index] = parseInt(req.query.activo);
                    }else{
                        appstatus.linea[index] = 0;
                    }
                    
                }
                
            }

            datos = {};
            datos.linea = appstatus.linea;

            update = await appstatuses.updateOne({ _id: appstatus._id }, datos)

            res.send("true");

        }else{

            res.send((appstatus.linea).toString());

        }   

    }
    
});

app.get('/api/v1/ben10',async(req,res) => {

    var aplicacion = await appdatos.find({});
    aplicacion = aplicacion[aplicacion.length-1]

    if(req.query.ganadoliga){

        if(aplicacion.ganadoliga){
            aplicacion.ganadoliga += parseInt(req.query.ganadoliga);
        }else{
            aplicacion.ganadoliga = parseInt(req.query.ganadoliga);
        }

        //update = await appdatos.updateOne({ _id: aplicacion._id }, datos)

        aplicacion = await new appdatos(aplicacion);
        await aplicacion.save();

        res.send("true");

    }else{

    
        if(req.query.ganado){

            aplicacion.ganado += parseInt(req.query.ganado);

            //update = await appdatos.updateOne({ _id: aplicacion._id }, datos)

            aplicacion = await new appdatos(aplicacion);
            await aplicacion.save();

            res.send("true");

        }else{
            
            res.send(appstatus.ganado+","+appstatus.entregado);


        }
    }
    
});

app.get('/api/v1/consulta/dailymission/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var data = await playerData.find({wallet: uc.upperCase(wallet)});

    if (data.length >= 1) {
        data = data[0];
    
        res.send(data.TournamentsPlays+","+data.DuelsPlays+","+data.FriendLyWins);

    }else{

        var playernewdata = new playerData({
            wallet: uc.upperCase(wallet),
            BallonSet: "0",
            CupsWin: 0,
            DificultConfig:  "3",
            DiscountMomment:  "0",
            DuelsOnlineWins:  "0",
            DuelsPlays:  "0",
            FriendLyWins:  "0",
            FriendlyTiming: "2",
            LastDate:  "0",
            LeagueDate:  moment(Date.now()).format(formatoliga),
            LeagueOpport:  "0",
            LeagueTimer:  moment(Date.now()).format('HH:mm:ss'),
            LeaguesOnlineWins:  "0",
            MatchLose:  "0",
            MatchWins:  "0",
            MatchesOnlineWins:  "0",
            Music:  "0",
            PhotonDisconnected:  "0",
            PlaysOnlineTotal:  "0",
            PlaysTotal:  "0",
            QualityConfig:  "0",
            StadiumSet:  "0",
            TournamentsPlays:  "0",
            Version:  "mainet",
            VolumeConfig:  "0",
            Plataforma: "pc",
            GolesEnContra: "0",
            GolesAFavor: "0",
            FirstTime: "0",
            DrawMatchs: "0",
            DrawMatchsOnline: "0",
            LeaguePlay: "0",
            Analiticas: "0",
            Fxs: "0",
            UserOnline: Date.now(),
            Resolucion: "0",
            Fullscreen: "0",
            Soporte: "J&S"
            
        })

        playernewdata.save().then(()=>{
            res.send("0,0,0");
        })
            
        
    }

    
});

app.get('/api/v1/misionesdiarias/tiempo/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(web3.utils.isAddress(wallet)){

            var usuario = await user.find({ wallet: uc.upperCase(wallet) });

            var cuando = "Earlier than";

            if (usuario.length >= 1) {
                var usuario = usuario[0];

                await resetChecpoint(wallet);

                if(usuario.checkpoint === 0){
                    usuario.checkpoint=Date.now();

                }

                if(usuario.reclamado){
                    cuando = "Later than";
                }

                res.send(moment(usuario.checkpoint).format('['+cuando+',] D/M/YY HH:mm:ss [,UTC]'));
                
            }else{
                res.send(moment(Date.now()).format('['+cuando+',] D/M/YY HH:mm:ss [,UTC]'));
            }
        
    }
});

async function resetChecpoint(wallet){
    var usuario = await user.find({ wallet: uc.upperCase(wallet) });
    usuario = usuario[0];

    if(Date.now() >= usuario.checkpoint){

        // resetear daily mision
        
        usuario.checkpoint =  Date.now()  + DaylyTime*1000;
        console.log("new time Dayly: "+usuario.checkpoint)
        usuario.reclamado = false;

        usuario.wcscExchange = await consultarCscExchange(wallet);

        //var nuevoUsuario = new user(usuario)
        //await nuevoUsuario.save();

        await user.updateOne({ wallet: uc.upperCase(wallet) }, usuario);
    }else{
        var datos = usuario
        datos.wcscExchange = await consultarCscExchange(wallet);

        //var nuevoUsuario = new user(datos)
        //await nuevoUsuario.save();

        await user.updateOne({ wallet: uc.upperCase(wallet) }, usuario);
    }
}

app.get('/api/v1/misiondiaria/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();
    var MisionDiaria = false;

    var aplicacion = await appdatos.find({});
    
    if(aplicacion.length >= 1 && web3.utils.isAddress(wallet)){

        aplicacion = aplicacion[aplicacion.length-1]
        MisionDiaria = aplicacion.misiondiaria;

        var usuario = await user.find({ wallet: uc.upperCase(wallet) });
        var data = await playerData.find({wallet: uc.upperCase(wallet)});

        if (data.length >= 1 && usuario.length >= 1 && MisionDiaria ) {

            data = data[0];
            usuario = usuario[0];
    
            if(usuario.active && parseInt(data.TournamentsPlays) >= 0 && parseInt(data.DuelsPlays) >= 4 && parseInt(data.FriendLyWins) >= 10){
              

                if( (Date.now() < usuario.checkpoint || usuario.checkpoint === 0 || Date.now() >= usuario.checkpoint) && !usuario.reclamado ){

                    //console.log("si cumple mision diaria");
    
                    res.send("true");
                }else{

                    res.send("false");
                    

                }

                      
    
            }else{

                //console.log("f2");
    
                //console.log("no cumple mision diaria: "+uc.upperCase(wallet)+" TP: "+data.TournamentsPlays+" DP: "+data.DuelsPlays+" Training: "+data.FriendLyWins);
                res.send("false");
    
            }

            resetChecpoint(wallet);
        

        }else{
            //console.log("f3");
            res.send("false")
        }

    }else{
        //console.log("f4");
        res.send("false");
    }

});

app.post('/api/v1/misionesdiarias/asignar/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    var aplicacion = await appdatos.find({});
    aplicacion = aplicacion[aplicacion.length-1]
    
    if(req.body.token == TOKEN  && web3.utils.isAddress(wallet)){

        if(req.body.control == "true"){

            var usuario = await user.find({ wallet: uc.upperCase(wallet) });
            var player = await playerData.find({ wallet: uc.upperCase(wallet) });

            if (usuario.length >= 1 && player.length >= 1) {
                var datos = usuario[0];
                var dataPlay = player[0];

                if(datos.active ){

                    var coins = await recompensaDiaria(wallet);
                    datos.reclamado = true;

                    datos.balance = datos.balance + coins;
                    datos.ingresado = datos.ingresado + coins;
                    datos.deposit.push({amount: coins,
                        date: Date.now(),
                        finalized: true,
                        txhash: "Daily mision coins: "+coins+" # "+wallet
                    })

                    datos.wcscExchange = await consultarCscExchange(wallet);

                    dataPlay.DuelsPlays = "0";
                    dataPlay.FriendLyWins = "0";
                    dataPlay.TournamentsPlays = "0";

                    aplicacion.entregado += coins;

                    await appdatos.updateOne({ version: aplicacion.version }, aplicacion)
                    var nuevoUsuario = new user(datos)
                    await nuevoUsuario.save();
                    //await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                    await playerData.updateOne({ wallet: uc.upperCase(wallet) }, dataPlay);

                    console.log("Daily mision coins: "+coins+" # "+wallet);
                    res.send(coins+"");
                }else{
                    res.send("0");
                }

            
            }else{
                res.send("0");
            }

        }else{
            //console.log("no se envio mision diaria");
            res.send("0");

        }

    }else{
        res.send("0");
    }

});

app.get('/api/v1/user/exist/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) })
            .catch(err => {
                console.log("usuario inexistente");
                res.send("false");
                return;
            });

        if (usuario.length >= 1) {
            res.send("true");
        }else{
    
            res.send("false");
        }
    }else{
        res.send("false");
    }
});

app.get('/api/v1/user/active/:wallet',async(req,res) => {
    
    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];
            res.send(""+usuario.active);
        }else{
            res.send("false");
        }
    }else{
        res.send("false");
    }
});

app.get('/api/v1/user/username/:wallet',async(req,res) => {
    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];

            res.send(usuario.username);
        }else{
            res.send("false");
        }
    }else{
        res.send("false");
    }
});

app.get('/api/v1/user/wallet/',async(req,res) => {
    var username =  req.query.username;
     
    usuario = await user.find({ username: username });

    if (usuario.length >= 1) {
        usuario = usuario[0];

        res.send(usuario.wallet);
    }else{
        res.send("false");
    }
    
});

app.get('/api/v1/user/email/:wallet',async(req,res) => {
    var wallet =  req.params.wallet.toLowerCase();
     
    if( req.query.tokenemail === TokenEmail && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];

            res.send(usuario.email);
        }else{
            res.send("false");
        }
    }else{
        res.send("false");
    }
});

app.get('/api/v1/user/pais/:wallet',async(req,res) => {
    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];

            res.send(usuario.pais);
        }else{
            res.send("false");
        }
    }else{
        res.send("false");
    }
});

app.get('/api/v1/imagen/user',async(req,res) => {
    var username =  req.query.username;
     
    usuario = await user.find({ username: username });

    if (usuario.length >= 1) {
        usuario = usuario[0];

        resetChecpoint(usuario.wallet);
        //usuario.wcscExchange = await consultarCscExchange(usuario.wallet);

        //var nuevoUsuario = new user(usuario)
        //await nuevoUsuario.save();

        if(usuario.imagen){
            if(usuario.imagen.indexOf('https://')>=0){
                res.send(usuario.imagen);
            }else{
                res.send(imgDefault);

            }
        }else{
            res.send(imgDefault);

        }
    }else{
        res.send(imgDefault);
    }

});

app.get('/api/v1/user/ban/:wallet',async(req,res) => {
    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });
        
  
            if (usuario.length >= 1) {
                usuario = usuario[0];

                res.send(!usuario.active+"");
            }else{
                res.send("false");
            }



            
    }else{
        res.send("true");
    }
});

app.post('/api/v1/user/update/info/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();
    
    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            var datos = usuario[0];
            if(datos.active){
                if (req.body.email) {
                    req.body.email =  req.body.email.toLowerCase();
                    datos.email = req.body.email;
                }

                if (req.body.username) {
                    datos.username = req.body.username;
                }

                if (req.body.password) {
                    datos.password = req.body.password;
                }

                if (req.body.pais) {
                    datos.pais = req.body.pais;
                }

                if (req.body.imagen) {
                    datos.imagen = req.body.imagen;
                }

                if (req.body.ban) {
                    if(req.body.ban === "true"){
                        datos.active = false;
                    }else{
                        datos.active = false;
                    }
                    
                }

                if (req.body.email || req.body.username || req.body.password || req.body.pais || req.body.ban || req.body.imagen){
                    update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                    res.send("true");
                }else{
                    res.send("false");
                }
                
            }else{
                res.send("false");
            }
    
        }else{
            console.log("creado USUARIO al actualizar info: "+wallet)
            var email = "";
            var username = "";
            var password = "";

            if (req.body.email) {
                email = req.body.email;
            }

            if (req.body.username) {
                username = req.body.username;
            }

            if (req.body.password) {
                password = req.body.password;
            }
            var users = new user({
                wallet: uc.upperCase(wallet),
                email: email,
                password: password,
                username: username, 
                active: true,
                payAt: Date.now(),
                checkpoint: 0,
                reclamado: false,
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [{amount: req.body.coins,
                    date: Date.now(),
                    finalized: true,
                    txhash: "Acount Creation "
                }],
                retiro: [],
                txs: [],
                pais: "null",
                imagen: imgDefault,
                wcscExchange: await consultarCscExchange(wallet)
            });
    
            users.save().then(()=>{
                console.log("Usuario creado exitodamente");
                res.send("true");
            })
                
            
        }


    }else{
        res.send("false");
    }
		
});

app.post('/api/v1/user/auth/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            var usuario = usuario[0];

            if(usuario.password === req.body.password && req.body.password != "" && req.body.password.length >= 8){

                if(usuario.active ){

                    res.send("true");
                    
                }else{
                    
                    res.send("false");
                    
                }
            }else{
                console.log("Error Loggin:"+uc.upperCase(wallet)+": "+req.body.password);
                res.send("false");
            }
    
        }else{
           
            res.send("false");
            
        }


    }else{
        res.send("false");
    }
		
});

app.get('/api/v1/username/disponible/',async(req,res) => {

    var username =  req.query.username;

    usuario = await user.find({ username: username });

    //console.log(usuario)

    if (usuario.length >= 1) {
        res.send("false");
    }else{
        res.send("true");
    }

});

app.get('/api/v1/email/disponible/',async(req,res) => {

    var email =  req.query.email;

    usuario = await user.find({ email: email });

    if (usuario.length >= 1) {
        //res.send("false");
        res.send("true");
    }else{
        res.send("true");
    }

});

app.get('/api/v1/app/init/',async(req,res) => {

    if(req.query.version){
        var aplicacion = await appstatuses.find({version: req.query.version});

        if (aplicacion.length >= 1) {

            aplicacion = aplicacion[aplicacion.length-1]

            var appData = await appdatos.find({});

            if (appData.length >= 1) {
                appData = appData[appData.length-1]

                appData.finliga = parseInt((appData.finliga-Date.now())/(86400*1000));

                if(appData.finliga < 0){
                    appData.finliga = 0;

                    aplicacion.liga = "off"

                }else{
                    ////aplicacion.liga = "on"
                }

            }else{

                appData = new appdatos({
                    entregado: 0,
                    ganado: 0, 
                    ganadoliga: 0,
                    misiondiaria: true,
                    finliga: Date.now() + 86400 * 1000 * 30 
                });
            
                await appData.save();

                appData.finliga = 30;

            }

            await appstatuses.updateOne({version: req.query.version}, aplicacion);


            aplicacion = await appstatuses.find({version: req.query.version});
            aplicacion = aplicacion[aplicacion.length-1]
        
        
            res.send(aplicacion.liga+","+aplicacion.mantenimiento+","+aplicacion.version+","+aplicacion.link+","+aplicacion.duelo+","+aplicacion.torneo+","+aplicacion.updates+","+appData.finliga);

        }else{

            aplicacion = new appstatuses({
                version: req.query.version,
                torneo: "on",
                duelo: "on",
                liga: "on",
                mantenimiento: "on",
                link: "https://cryptosoccermarket.com/download",
                linea: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                updates:["V"+req.query.version+" READY!","thanks for download",moment(Date.now()).format('DD/MM/YYYY HH:mm:ss [UTC]')],
                apuestas:[true,true,true,true,true]

            });
    
            await aplicacion.save();

            aplicacion = await appstatuses.find({version: req.query.version});
            aplicacion = aplicacion[aplicacion.length-1]
            res.send(aplicacion.liga+","+aplicacion.mantenimiento+","+aplicacion.version+","+aplicacion.link+","+aplicacion.duelo+","+aplicacion.torneo+","+aplicacion.updates+",30");
                    
        }
    }else{
        res.send("null")
    }

});

app.get('/api/v1/app/apuestas/',async(req,res) => {

    if(req.query.version){
        var aplicacion = await appstatuses.find({version: req.query.version});
        
        if (aplicacion.length >= 1) {
            aplicacion = aplicacion[aplicacion.length-1]
         
            res.send(aplicacion.apuestas.toLocaleString());

        }else{

            res.send("null")
        }
    }else{
        res.send("null")
    }

});

app.get('/api/v1/consulta/miranking/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var aplicacion = await playerData.find({},
        {_id:0,BallonSet:0,DificultConfig:0,LastDate:0,PlaysOnlineTotal:0,LeaguesOnlineWins:0,DiscountMomment:0,DuelsOnlineWins:0,DuelsPlays:0,FriendLyWins:0,FriendlyTiming:0,LeagueDate:0,LeagueOpport:0,LeagueTimer:0,MatchLose:0,MatchWins:0,MatchesOnlineWins:0,Music:0,PhotonDisconnected:0,QualityConfig:0,StadiumSet:0,PlaysTotal:0,TournamentsPlays:0,Version:0,VolumeConfig:0,Plataforma:0,GolesEnContra:0,GolesAFavor:0,FirstTime:0,DrawMatchs:0,DrawMatchsOnline:0,LeaguePlay:0,Analiticas:0,Fxs:0,__v:0,Soporte:0,Fullscreen:0,Resolucion:0}
        )
    .sort({"CupsWin": -1, "UserOnline": -1});

    if (aplicacion.length >= 1) {

        const busqueda = element => element.wallet === uc.upperCase(wallet)

        var posicion = aplicacion.findIndex(busqueda);
        posicion++;

        if (posicion > 0) {
            res.send(posicion+","+aplicacion[posicion-1].CupsWin);
        }else{
            res.send("0,0");
        }
        

    }else{
        res.send("0,0");
        
    }

});

app.get('/api/v1/consulta/leadboard',async(req,res) => {

    var cantidad;

    if(!req.query.cantidad){
        cantidad = 20;
    }else{
        cantidad = parseInt(req.query.cantidad);
    }

    
    var lista = [];

    var aplicacion = await playerData.find({}).sort({"CupsWin": -1, "UserOnline": -1}).limit(cantidad);
      
    if (aplicacion.length >= 1) {
        
        for (let index = 0; index < aplicacion.length; index++) {
            lista[index] = aplicacion[index].wallet;
            
        }
        res.send(lista.toLocaleString());

    }else{
        res.send("null");
            
    }
    
});

app.get('/api/v1/consulta/redwardleague',async(req,res) => {

    if(req.query.version){
        var aplicacion = await appstatuses.find({version: req.query.version});

        var appData = await appdatos.find({});

        if (appData.length >= 1) {
            appData = appData[appData.length-1]
        }else{
            appData.ganadoliga = 0;
        }
        
        if (aplicacion.length >= 1) {
            aplicacion = aplicacion[aplicacion.length-1]

            var cantidad;

            if(!req.query.cantidad){
                cantidad = 20;
            }else{
                cantidad = parseInt(req.query.cantidad);
            }

            var poolliga = appData.ganadoliga;

            poolliga = poolliga*0.7

            var porcentajes = [0.4,0.2,0.15,0.05,0.04,0.04,0.04,0.03,0.03,0.02]
            var lista = [];

            var usuarios = await playerData.find({}).limit(cantidad).sort([['CupsWin', -1]]);
            
            if (usuarios.length >= 1) {
                
                for (let index = 0; index < usuarios.length; index++) {
        
                    lista[index] = parseInt(poolliga*porcentajes[index]);
                
                    if(isNaN(lista[index])){
                        lista[index] = 0;
                    }
                    
                }
                res.send(lista.toLocaleString());

            }else{
                res.send("null");
                    
            }
    
        }else{
            res.send("null");
        }
    }else{
        res.send("null");
    }

});

app.get('/api/v1/consulta/poolliga',async(req,res) => {


    var appData = await appdatos.find({});

    if (appData.length >= 1) {
        appData = appData[appData.length-1]
    }else{
        appData.ganadoliga = 0;
    }


    res.send(appData.ganadoliga+"");


});



app.get('/api/v1/consulta/playerdata/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var data = await playerData.find({wallet: uc.upperCase(wallet)},{_id:0,wallet:0,__v:0,UserOnline:0});

    if (data.length >= 1) {
        data = data[0];

        if(!req.query.consulta){
            res.send(data);
        }else{
            res.send(data[req.query.consulta]+"");
        }
        
        
        
    
    }else{

        var playernewdata = new playerData({
            wallet: uc.upperCase(wallet),
            BallonSet: "0",
            CupsWin: 0,
            DificultConfig:  "3",
            DiscountMomment:  "0",
            DuelsOnlineWins:  "0",
            DuelsPlays:  "0",
            FriendLyWins:  "0",
            FriendlyTiming: "2",
            LastDate:  "0",
            LeagueDate:  moment(Date.now()).format(formatoliga),
            LeagueOpport:  "0",
            LeagueTimer:  moment(Date.now()).format('HH:mm:ss'),
            LeaguesOnlineWins:  "0",
            MatchLose:  "0",
            MatchWins:  "0",
            MatchesOnlineWins:  "0",
            Music:  "0",
            PhotonDisconnected:  "0",
            PlaysOnlineTotal:  "0",
            PlaysTotal:  "0",
            QualityConfig:  "0",
            StadiumSet:  "0",
            TournamentsPlays:  "0",
            Version:  "mainet",
            VolumeConfig:  "0",
            Plataforma: "pc",
            GolesEnContra: "0",
            GolesAFavor: "0",
            FirstTime: "0",
            DrawMatchs: "0",
            DrawMatchsOnline: "0",
            LeaguePlay: "0",
            Analiticas: "0",
            Fxs: "0",
            UserOnline: Date.now(),
            Resolucion: "0",
            Fullscreen: "0",
            Soporte: "J&S"
            
        })

        playernewdata.save().then(()=>{
            res.send("nueva playerdata creado");
        })
            
        
    }

    
});

app.post('/api/v1/reset/leadboard',async(req,res) => {

    if(req.body.token == TOKEN ){

        //var dataUsuarios = await playerData.find({}).sort([['CupsWin', 1]]);

        await playerData.find({}).update({ $set: {CupsWin:0}}).exec();
        await playerData.find({}).update({ $set: {LeagueOpport:"0"}}).exec();
        
        
        res.send("true");
    }else{
        res.send("false");
    }
    
});

app.post('/api/v1/update/playerdata/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;
    
    if(req.body.token == TOKEN ){

        var usuario = await playerData.find({wallet: uc.upperCase(wallet)});
        
        if (usuario.length >= 1) {
            var data = usuario[0];
            
            if(req.body.clave === "BallonSet"){
                data.BallonSet = req.body.valor;
            }

            if(req.body.clave === "DificultConfig"){
                data.DificultConfig = req.body.valor;
            }

            if(req.body.clave === "LastDate"){
                data.LastDate = req.body.valor;
            }

            if(req.body.clave === "LastDate"){
                data.LastDate = req.body.valor;
            }

            if(req.body.clave === "FriendlyTiming"){
                data.FriendlyTiming = req.body.valor;
            }

            if(req.body.clave === "LeagueDate"){
                data.LeagueDate = req.body.valor;
            }

            if(req.body.clave === "Music"){
                data.Music  = req.body.valor;
            }

            if(req.body.clave === "QualityConfig"){
                data.QualityConfig  = req.body.valor;
            }
            
            if(req.body.clave === "StadiumSet"){
                data.StadiumSet  = req.body.valor;
            }

            if(req.body.clave === "Version"){
                data.Version = req.body.valor;
            }
            
            if(req.body.clave === "VolumeConfig"){
                data.VolumeConfig = req.body.valor;
            }

            if(req.body.clave === "Plataforma"){
                data.Plataforma = req.body.valor;
            }

            if(req.body.clave === "FirstTime"){
                data.FirstTime = req.body.valor;
            }

            if(req.body.clave === "Analiticas"){
                data.Analiticas = req.body.valor;
            }

            if(req.body.clave === "Fxs"){
                data.Fxs = req.body.valor;
            }

            //// las de arriba solo textos /|\

            var accionar; 
            var respuesta = "true";

                if(req.body.clave === "CupsWin"){

                    accionar = data.CupsWin;


                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.CupsWin = accionar;
                    
                }

                if(req.body.clave === "DiscountMomment"){
                    accionar = data.DiscountMomment;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.DiscountMomment = accionar+"";
                }

                if(req.body.clave === "DuelsOnlineWins"){
                    accionar = data.DuelsOnlineWins;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.DuelsOnlineWins = accionar+"";
                }

                if(req.body.clave === "DuelsPlays"){
                    accionar = data.DuelsPlays;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.DuelsPlays = accionar+"";
                }

                if(req.body.clave === "FriendLyWins"){
                    accionar = data.FriendLyWins;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.FriendLyWins = accionar+"";
                }

                if(req.body.clave === "LeagueOpport"){
                    accionar = data.LeagueOpport;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.LeagueOpport = accionar+"";
                }
                
                if(req.body.clave === "LeaguesOnlineWins"){
                    accionar = data.LeaguesOnlineWins;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.LeaguesOnlineWins = accionar+"";
                }
                
                if(req.body.clave === "MatchLose"){
                    accionar = data.MatchLose;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.MatchLose = accionar+"";
                }
                
                if(req.body.clave === "MatchWins"){
                    accionar = data.MatchWins;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.MatchWins = accionar+"";
                }
                
                if(req.body.clave === "MatchesOnlineWins"){
                    accionar = data.MatchesOnlineWins;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.MatchesOnlineWins = accionar+"";
                }
                
                if(req.body.clave === "PhotonDisconnected"){
                    accionar = data.PhotonDisconnected;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.PhotonDisconnected = accionar+"";
                }
                
                if(req.body.clave === "PlaysOnlineTotal"){
                    accionar = data.PlaysOnlineTotal;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.PlaysOnlineTotal = accionar+"";
                }
                
                if(req.body.clave === "PlaysTotal"){
                    accionar = data.PlaysTotal;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.PlaysTotal = accionar+"";
                }
                
                if(req.body.clave === "TournamentsPlays"){
                    accionar = data.TournamentsPlays;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.TournamentsPlays = accionar+"";
                }

                if(req.body.clave === "GolesEnContra"){
                    accionar = data.GolesEnContra;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.GolesEnContra = accionar+"";
                }

                if(req.body.clave === "GolesAFavor"){
                    accionar = data.GolesAFavor;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.GolesAFavor = accionar+"";
                }

                if(req.body.clave === "DrawMatchs"){
                    accionar = data.DrawMatchs;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.DrawMatchs = accionar+"";
                }

                if(req.body.clave === "DrawMatchsOnline"){
                    accionar = data.DrawMatchsOnline;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.DrawMatchsOnline = accionar+"";
                }

                if(req.body.clave === "LeaguePlay"){
                    accionar = data.LeaguePlay;

                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)-parseInt(req.body.valor);
                            break;

                        case "setear":
                            accionar = parseInt(req.body.valor);
                            break;

                    
                        default:
                            respuesta = "false";
                            break;
                    }

                    data.LeaguePlay = accionar+"";
                }


            if(req.body.clave && req.body.valor){

                //console.log(data)

                data.UserOnline = Date.now();

                if( Date.now() >= parseInt(data.LeagueTimer) + 86400*1000){
                    data.LeagueOpport = "0";
                    data.LeagueTimer = Date.now();
                }

                var playernewdata = new playerData(data)
                await playernewdata.save();

                //update = await playerData.updateOne({ wallet: uc.upperCase(wallet) }, data);

                //console.log(update);

                switch (req.body.clave) {
                    case "LeagueOpport":
                        if(respuesta === "false"){
                            res.send("false");
                        }else{
                            res.send(data.LeagueOpport+"");
                        }
                        break;
                
                    default:
                        if(respuesta === "false"){
                            res.send("false");
                        }else{
                            res.send("true");
                        }
                        break;
                }

            }else{
                res.send("false");
            }

        }else{

            var playernewdata = new playerData({
                wallet: uc.upperCase(wallet),
                BallonSet: "0",
                CupsWin: 0,
                DificultConfig:  "3",
                DiscountMomment:  "0",
                DuelsOnlineWins:  "0",
                DuelsPlays:  "0",
                FriendLyWins:  "0",
                FriendlyTiming: "2",
                LastDate:  "0",
                LeagueDate:  moment(Date.now()).format(formatoliga),
                LeagueOpport:  "0",
                LeagueTimer:  moment(Date.now()).format('HH:mm:ss'),
                LeaguesOnlineWins:  "0",
                MatchLose:  "0",
                MatchWins:  "0",
                MatchesOnlineWins:  "0",
                Music:  "0",
                PhotonDisconnected:  "0",
                PlaysOnlineTotal:  "0",
                PlaysTotal:  "0",
                QualityConfig:  "0",
                StadiumSet:  "0",
                TournamentsPlays:  "0",
                Version:  "mainet",
                VolumeConfig:  "0",
                Plataforma: "PC",
                GolesEnContra: "0",
                GolesAFavor: "0",
                FirstTime: "0",
                DrawMatchs: "0",
                DrawMatchsOnline: "0",
                LeaguePlay: "0",
                Analiticas: "0",
                Fxs: "0",
                UserOnline: Date.now(),
                Resolucion: "0",
                Fullscreen: "0",
                Soporte: "J&S"
                
            })

            playernewdata.save().then(()=>{
                res.send("false");
            })
                
            
        }
    }else{
        
        res.send("false");
        
    }

    
});

app.put('/api/v1/update/playerdata/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var json = req.body;

    if(!json.misDat){

        //console.log("recibiendo data desde el juego: "+uc.upperCase(wallet))

        json = Buffer.from(json);
        json = json.toString('utf8');
        json = JSON.parse(json);

    }
    
    if( json.misDat ){

        json = json.misDat;

        //console.log(json)

        var usuario = await playerData.find({wallet: uc.upperCase(wallet)});
        
        if (usuario.length >= 1) {
            var usuario = usuario[0];
        
            for (let index = 0; index < json.length; index++) {

                if(usuario[json[index].variable] === "NaN"){
                    usuario[json[index].variable] = "0"
                }

                switch (json[index].action) {
                    case "sumar":
                        usuario[json[index].variable] = (parseFloat((usuario[json[index].variable]+"").replace(",", "."))+parseFloat((json[index].valorS+"").replace(",", ".")))+"";
                     
                        break;

                    case "restar":
                        usuario[json[index].variable] = (parseFloat((usuario[json[index].variable]+"").replace(",", "."))-parseFloat((json[index].valorS+"").replace(",", ".")))+"";
  
                        break;

                    case "setear":
                            usuario[json[index].variable] = (json[index].valorS+"").replace(",", ".");
                         
                        break;

                
                    default:
                        
                        break;
                }
                
                
            }
        
            usuario.UserOnline = Date.now();

            if( Date.now() >= parseInt(usuario.LeagueTimer) + 86400*1000){
                usuario.LeagueOpport = "0";
                usuario.LeagueTimer = Date.now();
            }

            var playernewdata = new playerData(usuario)
            await playernewdata.save();

            //update = await playerData.updateOne({ wallet: uc.upperCase(wallet) }, usuario);
            //console.log(update);

            var consulta = await playerData.find({wallet: uc.upperCase(wallet)},{_id:0,wallet:0,__v:0,UserOnline:0});
            consulta = consulta[0];

            //console.log(consulta)

            res.send(consulta);
        
                

        }else{
            res.send("false");
        }

    }else{

            var playernewdata = new playerData({
                wallet: uc.upperCase(wallet),
                BallonSet: "0",
                CupsWin: 0,
                DificultConfig:  "3",
                DiscountMomment:  "0",
                DuelsOnlineWins:  "0",
                DuelsPlays:  "0",
                FriendLyWins:  "0",
                FriendlyTiming: "2",
                LastDate:  "0",
                LeagueDate:  moment(Date.now()).format(formatoliga),
                LeagueOpport:  "0",
                LeagueTimer:  moment(Date.now()).format('HH:mm:ss'),
                LeaguesOnlineWins:  "0",
                MatchLose:  "0",
                MatchWins:  "0",
                MatchesOnlineWins:  "0",
                Music:  "0",
                PhotonDisconnected:  "0",
                PlaysOnlineTotal:  "0",
                PlaysTotal:  "0",
                QualityConfig:  "0",
                StadiumSet:  "0",
                TournamentsPlays:  "0",
                Version:  "mainet",
                VolumeConfig:  "0",
                Plataforma: "PC",
                GolesEnContra: "0",
                GolesAFavor: "0",
                FirstTime: "0",
                DrawMatchs: "0",
                DrawMatchsOnline: "0",
                LeaguePlay: "0",
                Analiticas: "0",
                Fxs: "0",
                UserOnline: Date.now(),
                Resolucion: "0",
                Fullscreen: "0",
                Soporte: "J&S"
                
            })

            playernewdata.save().then(()=>{
                res.send("false");
            })
                
            
        
    }

});

app.get('/', (req, res, next) => {

    res.send(req.query);

});

app.get('/api/v1/consultar/wcsc/lista/', async(req, res, next) => {

   var usuarios;
   var csc = "";

   var cantidad = parseInt(req.query.cantidad);
    if(req.query.cantidad){
        if(cantidad > 300){
            cantidad = 300;
        }
            usuarios = await user.find({},{password: 0, _id: 0, checkpoint:0, ingresado: 0, retirado: 0, deposit: 0, retiro:0, txs:0,email:0,reclamado:0}).limit(cantidad).sort([['balance', -1]]);

        
    }else{
        usuarios = await user.find({},{password: 0, _id: 0, checkpoint:0, ingresado: 0, retirado: 0, deposit: 0, retiro:0, txs:0,email:0,reclamado:0}).sort([['balance', -1]]);

    }

    var lista = [];
    var ex = 0;

    for (let index = 0; index < usuarios.length; index++) {

        if(!usuarios[index].wcscExchange){
            ex = 0;
        }else{
            ex = usuarios[index].wcscExchange;
        }
        
        lista[index] = {
            username: usuarios[index].username,
            activo: usuarios[index].active,
            wallet: usuarios[index].wallet,
            balance: usuarios[index].balance,
            exchange: ex
        }
        
    }

    res.send(lista);

});

async function consultarCscExchange(wallet){
    var investor = await contractMarket.methods
                .investors(wallet.toLowerCase())
                .call({ from: cuenta.address });
    return (investor.balance-investor.gastado)/10**18 ; 
}

app.get('/api/v1/consultar/csc/exchange/:wallet', async(req, res, next) => {

    var csc = await consultarCscExchange(req.params.wallet);
 
    res.send(csc+'');
 
 });

app.get('/api/v1/consultar/numero/aleatorio', async(req, res, next) => {

 
    res.send(Math.floor(Math.random() * 2)+'');
 
});


app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
