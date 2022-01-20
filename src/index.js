
const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const Web3 = require('web3');
var cors = require('cors')
require('dotenv').config();
var moment = require('moment');
const BigNumber = require('bignumber.js');
const uc = require('upper-case');

//console.log(("HolA Que Haze").toUpperCase())
//console.log(("HolA Que Haze").toLowerCase())

const Cryptr = require('cryptr');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

moment().format(); 

const abiMarket = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"NewAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_tokenERC20","type":"address"}],"name":"ChangePrincipalToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenERC20","type":"address"}],"name":"ChangeTokenOTRO","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bool","name":"_acumulable","type":"bool"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"addItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"addOption","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"asignarCoinsTo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"buyCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"buyItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bool","name":"_acumulable","type":"bool"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"editItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"editOption","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"gastarCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"gastarCoinsfrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"inventario","outputs":[{"internalType":"string","name":"nombre","type":"string"},{"internalType":"string","name":"tipo","type":"string"},{"internalType":"uint256","name":"valor","type":"uint256"},{"internalType":"bool","name":"acumulable","type":"bool"},{"internalType":"bool","name":"ilimitado","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"string","name":"correo","type":"string"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"gastado","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"items","outputs":[{"internalType":"string","name":"nombre","type":"string"},{"internalType":"string","name":"tipo","type":"string"},{"internalType":"uint256","name":"valor","type":"uint256"},{"internalType":"bool","name":"acumulable","type":"bool"},{"internalType":"bool","name":"ilimitado","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"largoInventario","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"largoItems","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"largoOptions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newadmin","type":"address"}],"name":"makeNewAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_oldadmin","type":"address"}],"name":"makeRemoveAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"opciones","outputs":[{"internalType":"string","name":"tipo","type":"string"},{"internalType":"bool","name":"ilimitados","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redimETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redimOTRO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redimTokenPrincipal01","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"redimTokenPrincipal02","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_correo","type":"string"}],"name":"registro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"sellCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_correo","type":"string"}],"name":"updateRegistro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"string","name":"_correo","type":"string"}],"name":"updateRegistroMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ventaPublica","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];


var superUser = [
    "0x11134Bd1dd0219eb9B4Ab931c508834EA29C0F8d",
    "0x306A75c3E33603f69F4178C2c40EAF0734DE4F64"
];

var testers = ["0x11134Bd1dd0219eb9B4Ab931c508834EA29C0F8d","0xe7064D523fD9f95ce9E66274E8ca77B4AA505aC1","0xe605646007FFd2851744fa65c7116a3a995ED287","0x48fC3f756d15ca6aB00e45B5c2fD4613C0781611","0x39e3c49De002E05b4F64bB3F33E4d92e3990a9D1","0x306A75c3E33603f69F4178C2c40EAF0734DE4F64",
    "0x211eF420C5aec2476Fa17E323474373fcC0229Fe","0x1180868C4BA7391118122d6B2d8152354Bce7D75",
    "0x43e3B4631d8F9850135759304Ee8AAbF241a6cd8","0x15c1eEA37a0B87Af59175c0159264b42A0E2E744",
    "0x621132D2b308Fc5898201ef133290dB0E0BA5BDC","0x4437C517F1ddaEb22Bff670eD31f02E4Ec585930",
    "0x0C47e44c183C3Ec10a390a5b2ca4f6897243087a","0x27faCf8D3fe82F6a466877fcFf52cadadf0C5313",
    "0x838A885b7f7aD295F6F884dEB26E801Ac5488ac7","0x206C247B47693D0B1334933fe075fcCDd8297283",
    "0x454E6E0c65593d6cDe42dE4f02eF11EA1156c804","0x53b66cCD02d280d0b52fb3486f9Fc547C0e7f78f",
    "0x0e4aD10F1170573D2ec94352749b09f31d40ADea","0xd4507F14AB5494D796eD35577cf456fDbaf42852",
    "0x3e04C5ED31220EC5e48EeAAE3202958b6bE73f3A","0xC67EaaA52342188AFe897108Bba3b71707f3BCBe",
    "0xd26d7AcB0210a0C031B1fcF1A7F403Acdfb4ABe5","0x743eD748673C6F40d2b9793A8554Ecdb010Eb618",
    "0x0e0a924d7F103B647EC7aE512b39f3B83bCeEd2F","0x276C1f59E1e1e01373B5d795Fa920fE066CcEea6",
    "0x29d280ef942E0D8B92F1814E4Aa9797a6bE3866a"
]

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3004;
const PEKEY = process.env.APP_PRIVATEKEY;
const TOKEN = process.env.APP_TOKEN;
const cryptr = new Cryptr(process.env.APP_MAIL);

const TokenEmail = "nuevo123";
const uri = process.env.APP_URI;

const DaylyTime = process.env.APP_DAYTIME || 86400;
const habilitarMisionDiaria = process.env.APP_DAYMISION || false;

const TimeToMarket = process.env.APP_TIMEMARKET || 86400 * 7;

const quitarLegandarios = process.env.APP_QUIT_LEGENDARIOS || "false";
const quitarEpicos = process.env.APP_QUIT_EPICOS || "true";
const quitarComunes = process.env.APP_QUIT_COMUNES || "true";

const testNet = false; //quita todos los equipos y formaciones comprados deja solo los equpos testnet

const COMISION = process.env.APP_COMISION || 60000;

const explorador = process.env.APP_EXPLORER || "https://bscscan.com/tx/";

const RED = process.env.APP_RED || "https://bsc-dataseed.binance.org/";
const addressContract = process.env.APP_CONTRACT || "0xfF7009EF7eF85447F6A5b3f835C81ADd60a321C9";

let web3 = new Web3(RED);
let cuenta = web3.eth.accounts.privateKeyToAccount(PEKEY);

var nonceGlobal = 0;
var used = false;

web3.eth.accounts.wallet.add(PEKEY);

const contractMarket = new web3.eth.Contract(abiMarket,addressContract);
//const contractToken = new web3.eth.Contract(abiToken,addressContractToken);

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

mongoose.connect(uri, options).then(
    async() => { console.log("Conectado Exitodamente!");
    console.log("nonce: "+await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address));
    nonceGlobal = await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address);
},
    err => { console.log(err); }
  );

const user = mongoose.model('usuarios', {
    wallet: String,
    email: String,
    password: String,
    username: String,
    active: Boolean,
    payAt: Number,
    checkpoint: Number,
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
    pais: String

});

const appstatuses = mongoose.model('appstatuses', {
    version: String,
    torneo: String,
    duelo: String,
    liga: String,
    mantenimiento: String,
    link: String,
    entregado: Number,
    ganado: Number, 
    entregado: Number,
    linea: [Number],
    updates: [String],
    misiondiaria: Boolean
    
});

const playerData = mongoose.model('playerdatas', {
    wallet: String,
    BallonSet: String,
    CupsWin: Number,
    DificultConfig: String,
    DiscountMomment: String,
    DuelsOnlineWins: String,
    DuelsPlays: String,
    FriendLyWins: String,
    FriendlyTiming: String,
    LastDate: String,
    LeagueDate: String,
    LeagueOpport: String,
    LeagueTimer: String,
    LeaguesOnlineWins: String,
    MatchLose: String,
    MatchWins: String,
    MatchesOnlineWins: String,
    Music: String,
    PhotonDisconnected: String,
    PlaysOnlineTotal: String,
    PlaysTotal: String,
    QualityConfig: String,
    StadiumSet: String,
    TournamentsPlays: String,
    Version: String,
    VolumeConfig: String,
    Plataforma: String,
    GolesEnContra: String,
    GolesAFavor: String,
    FirstTime: String,
    DrawMatchs: String,
    DrawMatchsOnline: String,
    LeaguePlay: String,
    Analiticas: String,
    Fxs: String

});


app.get('/',async(req,res) => {

    res.send("Conectado y funcionando");
});

app.get('/api',async(req,res) => {

    res.send("Conectado y funcionando");
});

app.get('/api/v1',async(req,res) => {

    res.send("true");
});

app.get('/api/v1/tiempo',async(req,res) => {

	data = moment(Date.now()).format('MM-DD-YYYY/HH:mm:ss')

    res.send(data);
});

app.get('/api/v1/date',async(req,res) => {

	data = ""+Date.now();

    res.send(data);
});

app.get('/api/v1/convertdate/:date',async(req,res) => {

    date = parseInt(req.params.date);

	data = moment(date).format('MM-DD-YYYY/HH:mm:ss');

    res.send(data); 
});

app.get('/api/v1/datefuture',async(req,res) => {

	data = Date.now()+604800*1000;
    data = ""+data;

    res.send(data); 
});

app.get('/api/v1/user/:wallet',async(req,res) => {

    let wallet = req.params.wallet.toLowerCase();
    let emailApp = req.query.email.toLowerCase();

    if(!web3.utils.isAddress(wallet)){
        console.log("wallet incorrecta: "+wallet+ " email: "+emailApp )
        res.send("false");
    }else{

        var investor =
        await  contractMarket.methods
            .investors(wallet)
            .call({ from: cuenta.address });

        var email = investor.correo;


        if (email === "" || email.length < 100) {
            res.send("false");
        }else{
            email = cryptr.decrypt(email).toLowerCase();

            if(emailApp === email){
                res.send("true");
            }else{
                res.send("false");
            }
        
        }
    }

});

app.get('/api/v1/user/teams/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address });
  
    var inventario = [];

    var cantidad = 43;

    for (let index = 0; index < cantidad; index++) {
        inventario[index] = 0;
    }
        

    if (!testNet) {
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
            .inventario(wallet, index)
            .call({ from: cuenta.address });
    
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
        .call({ from: cuenta.address });
  
    var inventario = [];

    for (let index = 0; index < 4; index++) {
        inventario[index] = 0;
    }

    if (!testNet) {
  
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
                .inventario(wallet, index)
                .call({ from: cuenta.address });


            if(item.nombre.indexOf("f") === 0){

                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("f")+1,item.nombre.indexOf("-")))-1] =  1;

            }

        }
    }

    res.send("1,"+inventario.toString());
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
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: [],
                pais: "null"
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
                    txhash: "Win coins: "+req.body.coins+" # "+req.params.wallet
                })
                update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                console.log("Win coins: "+req.body.coins+" # "+req.params.wallet);
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
                pais: "null"
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
                        txhash: "Lost coins: "+req.body.coins+" # "+req.params.wallet
                  
                      })
                    update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                    console.log("Lost coins: "+req.body.coins+" # "+req.params.wallet);
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
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: [],
                pais: "null"
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
    .call({ from: web3.eth.accounts.wallet[0].address });

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

app.post('/api/v1/coinsalmarket/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        coins = new BigNumber(req.body.coins).multipliedBy(10**18);

        await delay(Math.floor(Math.random() * 12000));

        if(await monedasAlMarket(coins, wallet,1)){
            res.send("true");

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
        console.log(Date.now())
        console.log(datos.payAt)
        console.log(datos.payAt + (TimeToMarket * 1000))

        if(Date.now() < datos.payAt + (TimeToMarket * 1000))return false ;
    }else{
        return false;
    }

    /*var noNce = await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address);
    if (nonceGlobal == noNce && used) {

        intentos++;
        console.log(coins.dividedBy(10**18)+" ->  "+wallet+" : "+intentos+" Nonce:"+await web3.eth.getTransactionCount(web3.eth.accounts.wallet[0].address))
        //await delay(Math.floor(Math.random() * 12000));
        paso = await monedasAlMarket(coins,wallet,intentos);
        
    }else{
        nonceGlobal = noNce;
        used = true;
    }*/

    await contractMarket.methods
        .asignarCoinsTo(coins, wallet)
        .send({ from: web3.eth.accounts.wallet[0].address, gas: COMISION, gasPrice: gases })
        .then(result => {
            nonceGlobal = nonceGlobal+1;
            console.log("Monedas ENVIADAS en "+intentos+" intentos");
            
            user.find({ wallet: uc.upperCase(wallet) }).then(usuario =>{

                if (usuario.length >= 1) {
                    var datos = usuario[0];
                    if(datos.active){
                        datos.payAt = Date.now();
                        datos.balance = BigNumber(datos.balance).minus(coins.dividedBy(10**18));
                        datos.retirado = coins.dividedBy(10**18).plus(datos.retirado);
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

    if (false) { // solo testers // all
            
        for (let index = 0; index < result; index++) {

            var item = await contractMarket.methods
            .inventario(wallet, index)
            .call({ from: cuenta.address });

            if(item.nombre.indexOf("t") === 0){

                inventario[parseInt(item.nombre.slice(item.nombre.indexOf("t")+1,item.nombre.indexOf("-")))-1] =  1;

            }

        }
    }
    

    if (false) { // solo legendarios
        for (let index = 0; index < 3; index++) {


            if(inventario[index]){

                coins += 20;
                bono = true;
                break;

            }

        }
    }

    if (false) { // solo epico

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

app.post('/api/v1/misionesdiarias/asignar/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();

    if(req.body.token == TOKEN  && web3.utils.isAddress(wallet)){

        if(req.body.control == "true"){

            var usuario = await user.find({ wallet: uc.upperCase(wallet) });

            if (usuario.length >= 1) {
                var datos = usuario[0];

                if(datos.active && (Date.now() >= datos.checkpoint + DaylyTime*1000 || datos.checkpoint === 0) ){

                    var coins = await recompensaDiaria(wallet);
                    datos.checkpoint = Date.now();

                    datos.balance = datos.balance + coins;
                    datos.ingresado = datos.ingresado + coins;
                    datos.deposit.push({amount: coins,
                        date: Date.now(),
                        finalized: true,
                        txhash: "Daily mision coins: "+coins+" # "+wallet
                    })
                    
                    update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);

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

    var appstatus = await appstatuses.find({});
        appstatus = appstatus[0]

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
    
});

app.get('/api/v1/ben10',async(req,res) => {

    var aplicacion = await appstatuses.find({ });
    aplicacion = aplicacion[0];

    if(req.query.ganado){

        datos = {};
        datos.ganado = aplicacion.ganado+parseInt(req.query.ganado);

        update = await appstatuses.updateOne({ _id: aplicacion._id }, datos)

        res.send("true");

    }else

    if(req.query.entregado){

        datos = {};
        datos.entregado = aplicacion.entregado+parseInt(req.query.entregado);

        update = await appstatuses.updateOne({ _id: estado._id }, datos)

        res.send("true");

    }else{
        
        res.send(appstatus.ganado+","+appstatus.entregado);


    }
    
});

app.get('/api/v1/misiondiaria/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();
    var version = "1.0.0.2";
    var MisionDiaria = false;
    if (req.query.version) {
        version = req.query.version;
    }

    var aplicacion = await appstatuses.find({version: version});

    if (aplicacion.length >= 1) {
        aplicacion = aplicacion[0];
        MisionDiaria = aplicacion.misiondiaria;
    }

    if(web3.utils.isAddress(wallet) && MisionDiaria && habilitarMisionDiaria === "true"){

        var usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];


            if(usuario.active && ( Date.now() >= usuario.checkpoint + DaylyTime*1000 || usuario.checkpoint === 0)){

                console.log("consulta mision diaria");

                res.send("true");

            }else{

                console.log("consulta no es tiempo mision diaria");
                res.send("false");

            }


        }else{
            res.send("false");

        }

    }else{
        res.send("false");
    }

});

app.get('/api/v1/user/exist/:wallet',async(req,res) => {

    var wallet =  req.params.wallet.toLowerCase();
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

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

app.get('/api/v1/user/imagen/:username',async(req,res) => {
    var wallet =  req.params.username;
     
    if(web3.utils.isAddress(wallet)){

        usuario = await user.find({ username: username });

        if (usuario.length >= 1) {
            usuario = usuario[0];

            //res.send(usuario.imagen);
            if(usuario.imagen){
                res.send(usuario.imagen);
            }else{
                res.send("https://img.search.brave.com/mjNYz4Hs6rASzAtlu8QSs6VLhmO4oqhb1VZyf2X4_BM/fit/500/500/ce/1/aHR0cHM6Ly9wdWJs/aWNkb21haW52ZWN0/b3JzLm9yZy9waG90/b3MvYWJzdHJhY3Qt/dXNlci1mbGF0LTMu/cG5n");

            }
        }else{
            res.send("https://img.search.brave.com/mjNYz4Hs6rASzAtlu8QSs6VLhmO4oqhb1VZyf2X4_BM/fit/500/500/ce/1/aHR0cHM6Ly9wdWJs/aWNkb21haW52ZWN0/b3JzLm9yZy9waG90/b3MvYWJzdHJhY3Qt/dXNlci1mbGF0LTMu/cG5n");
        }
    }else{
        res.send("https://img.search.brave.com/mjNYz4Hs6rASzAtlu8QSs6VLhmO4oqhb1VZyf2X4_BM/fit/500/500/ce/1/aHR0cHM6Ly9wdWJs/aWNkb21haW52ZWN0/b3JzLm9yZy9waG90/b3MvYWJzdHJhY3Qt/dXNlci1mbGF0LTMu/cG5n");
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
            res.send("true");
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

                if (req.body.email || req.body.username || req.body.password || req.body.pais){
                    update = await user.updateOne({ wallet: uc.upperCase(wallet) }, datos);
                }
                res.send("true");
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
                pais: "null"
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

    req.body.email =  req.body.email.toLowerCase();
    
    if(req.body.token == TOKEN && web3.utils.isAddress(wallet)){

        usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            var usuario = usuario[0];

            if(usuario.password === req.body.password && req.body.password != "" && req.body.password.length >= 8){

                if(usuario.active && usuario.email === req.body.email){

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
        res.send("false");
    }else{
        res.send("true");
    }

});


app.get('/api/v1/app/init/',async(req,res) => {

    var version = "1.0.0.2";
    if (req.query.version) {
        version = req.query.version;
    }

    var aplicacion = await appstatuses.find({version: version});

    if (aplicacion.length >= 1) {
        aplicacion = aplicacion[0];
        res.send(aplicacion.liga+","+aplicacion.mantenimiento+","+aplicacion.version+","+aplicacion.link+","+aplicacion.duelo+","+aplicacion.torneo+","+aplicacion.updates);

    }else{
        
        aplicacion = new appstatuses({
            version: req.query.version,
            torneo: "off",
            duelo: "off",
            liga: "off",
            mantenimiento: "on",
            link: "https://cryptosoccergames.com",
            ganado: 0, 
            entregado: 0,
            linea: [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            updates:["V"+req.query.version+" READY!","thanks for downloading",moment(Date.now()).format('DD/MM/YYYY HH:mm A')],
            misiondiaria: false
        });

        aplicacion.save().then(()=>{
            res.send("nueva version creada");
        })
            
    }

});


app.get('/api/v1/consulta/leadboard',async(req,res) => {

    var cantidad = 10;
    var lista = [];

    var aplicacion = await playerData.find({}).limit(cantidad).sort([['CupsWin', -1]]);
      
    if (aplicacion.length >= 1) {
        
        for (let index = 0; index < aplicacion.length; index++) {
            lista[index] = aplicacion[index].wallet;
            
        }
        res.send(lista.toLocaleString());

    }else{
        res.send("null");
            
    }
    
});

app.get('/api/v1/consulta/miranking/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var aplicacion = await playerData.find({}).sort([['CupsWin', -1]]);


    if (aplicacion.length >= 1) {

        var posicion = aplicacion.findIndex(item => item.wallet === uc.upperCase(wallet))+1;

        if (posicion > 0) {
            res.send(posicion+","+aplicacion[posicion-1].CupsWin);
        }else{
            res.send("0,0");
        }
        

    }else{
        res.send("0,0");
        
    }

});


app.get('/api/v1/consulta/playerdata/:wallet',async(req,res) => {

    var wallet =  req.params.wallet;

    var data = await playerData.find({wallet: uc.upperCase(wallet)});

    if (data.length >= 1) {
        data = data[0];
        var consulta = "null";

        if(req.query.consulta === "BallonSet"){
            consulta = data.BallonSet;
        }

        if(req.query.consulta === "CupsWin"){
            consulta = data.CupsWin;
        }

        if(req.query.consulta === "DificultConfig"){
            consulta = data.DificultConfig;
        }

        if(req.query.consulta === "DiscountMomment"){
            consulta = data.DiscountMomment;
        }

        if(req.query.consulta === "DuelsOnlineWins"){
            consulta = data.DuelsOnlineWins;
        }

        if(req.query.consulta === "DuelsPlays"){
            consulta = data.DuelsPlays;
        }

        if(req.query.consulta === "FriendLyWins"){
            consulta = data.FriendLyWins;
        }

        if(req.query.consulta === "FriendlyTiming"){
            consulta = data.FriendlyTiming;
        }

        if(req.query.consulta === "LastDate"){
            consulta = data.LastDate;
        }

        if(req.query.consulta === "LastDate"){
            consulta = data.LastDate;
        }

        if(req.query.consulta === "LeagueDate"){
            consulta = data.LeagueDate;
        }
            
        if(req.query.consulta === "LeagueOpport"){
            consulta = data.LeagueOpport;
        }
        
        if(req.query.consulta === "LeagueTimer"){
            consulta = data.LeagueTimer;
        }

        if(req.query.consulta === "LeaguesOnlineWins"){
            consulta = data.LeaguesOnlineWins;
        }
        
        if(req.query.consulta === "MatchLose"){
            consulta = data.MatchLose;
        }
        
        if(req.query.consulta === "MatchWins"){
            consulta = data.MatchWins;
        }
        
        if(req.query.consulta === "MatchesOnlineWins"){
            consulta = data.MatchesOnlineWins;
        }
        
        if(req.query.consulta === "Music"){
            consulta = data.Music;
        }
        
        if(req.query.consulta === "PhotonDisconnected"){
            consulta = data.PhotonDisconnected;
        }
        
        if(req.query.consulta === "PlaysOnlineTotal"){
            consulta = data.PlaysOnlineTotal;
        }
        
        if(req.query.consulta === "PlaysTotal"){
            consulta = data.PlaysTotal;
        }
        
        if(req.query.consulta === "QualityConfig"){
            consulta = data.QualityConfig;
        }
        
        if(req.query.consulta === "StadiumSet"){
            consulta = data.StadiumSet;
        }
        
        if(req.query.consulta === "TournamentsPlays"){
            consulta = data.TournamentsPlays;
        }
        
        if(req.query.consulta === "Version"){
            consulta = data.Version;
        }
        
        if(req.query.consulta === "VolumeConfig"){
            consulta = data.VolumeConfig;
        }

        if(req.query.consulta === "Plataforma"){
            consulta = data.Plataforma;
        }

        if(req.query.consulta === "GolesEnContra"){
            consulta = data.GolesEnContra;
        }

        if(req.query.consulta === "GolesAFavor"){
            consulta = data.GolesEnContra;
        }

        if(req.query.consulta === "FirstTime"){
            consulta = data.FirstTime;
        }

        if(req.query.consulta === "DrawMatchs"){
            consulta = data.DrawMatchs;
        }

        if(req.query.consulta === "DrawMatchsOnline"){
            consulta = data.DrawMatchsOnline;
        }

        if(req.query.consulta === "LeaguePlay"){
            consulta = data.LeaguePlay;
        }

        if(req.query.consulta === "Analiticas"){
            consulta = data.Analiticas;
        }

        if(req.query.consulta === "Fxs"){
            consulta = data.Fxs;
        }

        if(req.query.consulta){
            res.send(consulta+"");
        }else{
            res.send(data);
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
            Fxs: "0"
            
        })

        playernewdata.save().then(()=>{
            res.send("nueva playerdata creado");
        })
            
        
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
            Fxs: "0"
            
        })

        playernewdata.save().then(()=>{
            res.send("0,0,0");
        })
            
        
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

            if(req.body.clave === "LeagueTimer"){
                data.LeagueTimer = req.body.valor;
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
            var respuesta = "";

                if(req.body.clave === "CupsWin"){

                    accionar = data.CupsWin;


                    switch (req.body.accion) {
                        case "sumar":
                            accionar = parseInt(accionar)+parseInt(req.body.valor);
                            break;

                        case "restar":
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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
                            accionar = parseInt(accionar)+-parseInt(req.body.valor);
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

                //var playernewdata = new playerData(data)
                //await playernewdata.save();

                update = await playerData.updateOne({ wallet: uc.upperCase(wallet) }, data);

                //console.log(update);

                if(req.body.clave === "LeagueOpport"){
                    res.send(data.LeagueOpport+"");
                }

                if(req.body.clave === "CupsWin"){
                    res.send(data.CupsWin+"");
                }

                if(respuesta === "false"){
                    res.send("false");
                }else{
                    res.send("true");
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
                Fxs: "0"
                
            })

            playernewdata.save().then(()=>{
                res.send("false");
            })
                
            
        }
    }

    
});


app.get('/', (req, res, next) => {

    res.send(req.query);

});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
