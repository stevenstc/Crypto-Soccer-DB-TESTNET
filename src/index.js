const express = require('express');
const fetch = require('node-fetch');
const mongoose = require('mongoose');
const mongoose2 = require('mongoose');
const bodyParser = require("body-parser");
const Web3 = require('web3');
var cors = require('cors')
require('dotenv').config();
var moment = require('moment');
const BigNumber = require('bignumber.js');
const uc = require('upper-case');
const lc = require('lower-case');



const Cryptr = require('cryptr');

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

moment().format(); 

const abiMarket = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"AdminRemoved","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"admin","type":"address"}],"name":"NewAdmin","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[{"internalType":"address","name":"_tokenERC20","type":"address"}],"name":"ChangePrincipalToken","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_tokenERC20","type":"address"}],"name":"ChangeTokenOTRO","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bool","name":"_acumulable","type":"bool"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"addItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"addOption","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"admin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"adminWallet","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"asignarCoinsTo","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"buyCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"buyItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_nombre","type":"string"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"bool","name":"_acumulable","type":"bool"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"editItem","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"},{"internalType":"string","name":"_tipo","type":"string"},{"internalType":"bool","name":"_ilimitado","type":"bool"},{"internalType":"uint256","name":"_cantidad","type":"uint256"}],"name":"editOption","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"gastarCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"},{"internalType":"address","name":"_user","type":"address"}],"name":"gastarCoinsfrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint256","name":"","type":"uint256"}],"name":"inventario","outputs":[{"internalType":"string","name":"nombre","type":"string"},{"internalType":"string","name":"tipo","type":"string"},{"internalType":"uint256","name":"valor","type":"uint256"},{"internalType":"bool","name":"acumulable","type":"bool"},{"internalType":"bool","name":"ilimitado","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"bool","name":"registered","type":"bool"},{"internalType":"string","name":"correo","type":"string"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"gastado","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"items","outputs":[{"internalType":"string","name":"nombre","type":"string"},{"internalType":"string","name":"tipo","type":"string"},{"internalType":"uint256","name":"valor","type":"uint256"},{"internalType":"bool","name":"acumulable","type":"bool"},{"internalType":"bool","name":"ilimitado","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"largoInventario","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"largoItems","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"largoOptions","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"_newadmin","type":"address"}],"name":"makeNewAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_oldadmin","type":"address"}],"name":"makeRemoveAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"opciones","outputs":[{"internalType":"string","name":"tipo","type":"string"},{"internalType":"bool","name":"ilimitados","type":"bool"},{"internalType":"uint256","name":"cantidad","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address payable","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"redimETH","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redimOTRO","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"redimTokenPrincipal01","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"redimTokenPrincipal02","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_correo","type":"string"}],"name":"registro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_value","type":"uint256"}],"name":"sellCoins","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"token","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address payable","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"string","name":"_correo","type":"string"}],"name":"updateRegistro","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"string","name":"_correo","type":"string"}],"name":"updateRegistroMaster","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"ventaPublica","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]
const abiToken = [{"inputs":[{"internalType":"string","name":"name_","type":"string"},{"internalType":"string","name":"symbol_","type":"string"},{"internalType":"uint256","name":"decimals_","type":"uint256"},{"internalType":"uint256","name":"initialBalance_","type":"uint256"},{"internalType":"address","name":"tokenOwner_","type":"address"},{"internalType":"address payable","name":"feeReceiver_","type":"address"}],"stateMutability":"payable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}]

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3004;
const PEKEY = process.env.APP_PRIVATEKEY;
const TOKEN = process.env.APP_TOKEN;
const cryptr = new Cryptr(process.env.APP_MAIL);
const uri = process.env.APP_URI;

const COMISION = process.env.APP_COMISION || 60000;

const explorador = "https://testnet.bscscan.com/tx/";

const RED = "https://data-seed-prebsc-1-s1.binance.org:8545/";
const addressContract = process.env.APP_CONTRACT || "0xfF7009EF7eF85447F6A5b3f835C81ADd60a321C9";
const addressContractToken = "0x038987095f309d3640f51644430dc6c7c4e2e409";

let web3 = new Web3(RED);
let cuenta = web3.eth.accounts.privateKeyToAccount(PEKEY);

web3.eth.accounts.wallet.add(PEKEY);

const contractMarket = new web3.eth.Contract(abiMarket,addressContract);
const contractToken = new web3.eth.Contract(abiToken,addressContractToken);

//console.log(web3.eth.accounts.wallet);
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
mongoose.connect(uri, options).then(
    () => { console.log("Conectado Exitodamente!");},
    err => { console.log(err); }
  );

mongoose2.connect(uri, options).then(
    () => { console.log("Conectado Exitodamente!");},
    err => { console.log(err); }
  );

const user = mongoose.model('usuarios', {
    wallet: String,
    active: Boolean,
    payAt: Number,
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
    txs: [String]

});

const server = mongoose.model('servers', {linea: [Number]});



app.get('/',async(req,res) => {

    console.log(await contractMarket.methods
      .largoInventario(cuenta.address)
      .call({ from: cuenta.address }))

    res.send("Conectado y funcionando v1.0");
});

app.get('/api',async(req,res) => {

    res.send("Conectado y funcionando v1.0");
});

app.get('/api/v1',async(req,res) => {

    res.send("Conectado y funcionando");
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

    let wallet = req.params.wallet;
    let emailApp = req.query.email;

    emailApp = lc.lowerCase(emailApp);


    var investor =
      await  contractMarket.methods
        .investors(wallet)
        .call({ from: cuenta.address });

    var email = investor.correo;


    if (email === "") {
        res.send("false");
    }else{
        email = lc.lowerCase(cryptr.decrypt(email));

        if(emailApp === email){
            res.send("true");
        }else{
            res.send("false");
        }
      
    }

});

app.get('/api/v1/user/teams/:wallet',async(req,res) => {

    let wallet = req.params.wallet;

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address });
  
    var inventario = [];

    for (let index = 0; index < 43; index++) {
        inventario[index] = 0;
    }
  
    for (let index = 0; index < result; index++) {

    var item = await contractMarket.methods
        .inventario(wallet, index)
        .call({ from: cuenta.address });

        if(item.nombre.indexOf("t") === 0){

            inventario[parseInt(item.nombre.slice(item.nombre.indexOf("t")+1,item.nombre.indexOf("-")))-1] =  1;

        }

    }

    res.send(inventario.toString());
});

app.get('/api/v1/formations/:wallet',async(req,res) => {

    let wallet = req.params.wallet;

    var result = await contractMarket.methods
        .largoInventario(wallet)
        .call({ from: cuenta.address });
  
    var inventario = [];

    for (let index = 0; index < 4; index++) {
        inventario[index] = 0;
    }
  
    for (let index = 0; index < result; index++) {

        var item = await contractMarket.methods
            .inventario(wallet, index)
            .call({ from: cuenta.address });


        if(item.nombre.indexOf("f") === 0){

            inventario[parseInt(item.nombre.slice(item.nombre.indexOf("f")+1,item.nombre.indexOf("-")))-1] =  1;

        }

    }

    res.send("1,"+inventario.toString());
});


app.get('/api/v1/coins/:wallet',async(req,res) => {

    let wallet = req.params.wallet;

    if(!web3.utils.isAddress(wallet)){
        console.log("wallet incorrecta")
        res.send("0");
    }else{
            usuario = await user.find({ wallet: uc.upperCase(wallet) });

        if (usuario.length >= 1) {
            usuario = usuario[0];
            res.send(usuario.balance+"");

        }else{
            console.log("creado USUARIO al consultar monedas"+wallet)
            var users = new user({
                wallet: uc.upperCase(wallet),    
                active: true,
                payAt: Date.now(),
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: []
            });

            users.save().then(()=>{
                console.log("Usuario creado exitodamente");
                res.send("0");
            })
                
            
        }

    }

    
});


app.post('/api/v1/asignar/:wallet',async(req,res) => {

    let wallet = req.params.wallet;

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
                active: true,
                payAt: Date.now(),
                balance: req.body.coins,
                ingresado: req.body.coins,
                retirado: 0,
                deposit: [{amount: req.body.coins,
                    date: Date.now(),
                    finalized: true,
                    txhash: "Win coins: "+req.body.coins+" # "+req.params.wallet
                }],
                retiro: [],
                txs: []
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

    let wallet = req.params.wallet;

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
                active: true,
                payAt: Date.now(),
                balance: 0,
                ingresado: 0,
                retirado: 0,
                deposit: [],
                retiro: [],
                txs: []
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


    if(req.body.token == TOKEN  && web3.utils.isAddress(req.params.wallet)){

        await delay(Math.floor(Math.random() * 12000));


        if(await monedasAlJuego(req.body.coins, req.params.wallet,1)){
            console.log("Coins TO GAME: "+req.body.coins+" # "+req.params.wallet);
            res.send("true");

        }else{
            res.send("false");

        }

    }else{
        res.send("false");
    }
		
    
});

async function monedasAlJuego(coins,wallet,intentos){

    coins = new BigNumber(coins).multipliedBy(10**18);

    var usuario = await contractMarket.methods
    .investors(wallet)
    .call({ from: web3.eth.accounts.wallet[0].address });

    balance = new BigNumber(usuario.balance);
    balance = balance.shiftedBy(-18);
    balance = balance.decimalPlaces(0).toNumber();

    var gases = await web3.eth.getGasPrice(); 

    await delay(Math.floor(Math.random() * 12000));

    var paso = true;

    var gasLimit = await contractMarket.methods.gastarCoinsfrom(coins, wallet).estimateGas({from: web3.eth.accounts.wallet[0].address});

    if(balance - coins.shiftedBy(-18).toNumber() >= 0 ){
        await contractMarket.methods
            .gastarCoinsfrom(coins, wallet)
            .send({ from: web3.eth.accounts.wallet[0].address, gas: gasLimit, gasPrice: gases })
            .then(result => {
                console.log("Monedas ENVIADAS AL JUEGO en "+intentos+" intentos");
                console.log(explorador+result.transactionHash);
                
                user.find({ wallet: uc.upperCase(wallet) }).then(usuario =>{

                    if (usuario.length >= 1) {
                        var datos = usuario[0];
                        if(datos.active){
                            datos.balance = coins.dividedBy(10**18).plus(datos.balance).decimalPlaces(0).toNumber();
                            datos.ingresado = coins.dividedBy(10**18).plus(datos.ingresado).decimalPlaces(0).toNumber();
                            datos.txs.push(explorador+result.transactionHash)
                            update = user.updateOne({ wallet: uc.upperCase(wallet) }, datos)
                            .then(console.log("Coins SEND: "+coins.dividedBy(10**18)+" # "+wallet))
                            .catch(console.error())
                            
                        }
                
                    }else{
                        console.log("creado USUARIO monedas al juego"+wallet)
                        var users = new user({
                            wallet: uc.upperCase(wallet),    
                            active: true,
                            payAt: Date.now(),
                            balance: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                            ingresado: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                            retirado: 0,
                            deposit: [{amount: coins.dividedBy(10**18).decimalPlaces(0).toNumber(),
                                date: Date.now(),
                                finalized: true,
                                txhash: "SEND: "+coins.dividedBy(10**18).decimalPlaces(0).toString()+" # "+req.params.wallet+" Hash: "+explorador+result.transactionHash
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

    if(req.body.token == TOKEN && web3.utils.isAddress(req.params.wallet)){

        await delay(Math.floor(Math.random() * 12000));


        if(await monedasAlMarket(req.body.coins, wallet,1)){
            console.log("Coins TO MARKET: "+req.body.coins+" # "+req.params.wallet);
            res.send("true");

        }else{
            res.send("false");

        }

    }else{
        res.send("false");
    }
		
    
});

async function monedasAlMarket(coins,wallet,intentos){

    coins = new BigNumber(coins).multipliedBy(10**18);

    var gases = await web3.eth.getGasPrice(); 

    await delay(Math.floor(Math.random() * 12000));

    var paso = false;

    var usuario = await user.find({ wallet: uc.upperCase(wallet) });

    if (usuario.length >= 1) {
        var datos = usuario[0];
        if(Date.now() < datos.payAt+1 * 86400*1000)return false ;
    }else{
        return false;
    }
    

    await contractMarket.methods
        .asignarCoinsTo(coins, wallet)
        .send({ from: web3.eth.accounts.wallet[0].address, gas: COMISION, gasPrice: gases })
        .then(result => {
            console.log("Monedas ENVIADAS A MARKET en "+intentos+" intentos");
            console.log(explorador+result.transactionHash);
            
            user.find({ wallet: uc.upperCase(wallet) }).then(usuario =>{

                if (usuario.length >= 1) {
                    var datos = usuario[0];
                    if(datos.active){
                        datos.payAt = Date.now();
                        datos.balance = BigNumber(datos.balance).minus(coins.dividedBy(10**18));
                        datos.retirado = coins.dividedBy(10**18).plus(datos.retirado);
                        datos.txs.push(explorador+result.transactionHash)
                        update = user.updateOne({ wallet: uc.upperCase(wallet) }, datos)
                        .then(console.log("Coins SEND: "+coins.dividedBy(10**18)+" # "+wallet))
                        .catch(console.error())
                        
                    }
            
                }else{
                    console.log("creado USUARIO monedas al Market"+wallet)
                    var users = new user({
                        wallet: uc.upperCase(wallet),    
                        active: true,
                        payAt: Date.now(),
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

        .catch(async() => {
            intentos++;
            console.log(coins.dividedBy(10**18)+" ->  "+wallet+" : "+intentos)
            await delay(Math.floor(Math.random() * 12000));
            paso = await monedasAlMarket(coins,wallet,intentos);
        })

    return paso;

}

app.get('/api/v1/sendmail',async(req,res) => {
    console.log(req.query);
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
    console.log(req.query);

    if(req.query.rango){

        var estado = await server.find({});
        estado = estado[0]

        for (let index = 0; index < estado.linea.length; index++) {

            if(parseInt(req.query.rango) == index){
                if (req.query.activo) {
                    estado.linea[index] = parseInt(req.query.activo);
                }
                
            }
            
        }

        datos = {};
        datos.linea = estado.linea;

        update = await server.updateOne({ _id: estado._id }, datos)

        res.send("true");

    }else{
        var estado = await server.find({});
        estado = estado[0];

        res.send((estado.linea).toString());

    }

    /*
    servers.save().then(()=>{
        console.log("Usuario creado exitodamente");
        res.send("true");
    })
    */
        
    


});

app.get('/', (req, res, next) => {

    res.send(req.query);

    

});

app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))
