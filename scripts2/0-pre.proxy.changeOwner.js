//引入web
var Web3 = require("web3");

//引入truffle-contract
var contract = require("truffle-contract");
//引入合约数据
var dataUpdate = require("/Users/junjin/go/src/github.com/centrehq/centre-tokens/build/contracts/V2Upgrader.json");
var dataProxy = require("/Users/junjin/go/src/github.com/centrehq/centre-tokens/build/contracts/FiatTokenV1.json");
var dataProxyReal = require("/Users/junjin/go/src/github.com/centrehq/centre-tokens/build/contracts/FiatTokenProxy.json");

//返回合约抽象
var provider = new Web3.providers.HttpProvider("http://123.57.233.34:8090");

var FiatProxyReal = contract(dataProxyReal);
FiatProxyReal.setProvider(provider);

var FiatProxy = contract(dataProxy);
FiatProxy.setProvider(provider);

var FiatUpdater = contract(dataUpdate);
FiatUpdater.setProvider(provider);


var address = '0xA850857BFe6Be2783375dCA2D7f998406DAfedC9';
var addressProxy = '0x3785e72CC24B13e6367Bb6bd5b536CdD27CeF6e1';
var address2 = '0x6e4F5c04D6eA9d45666947B2156ec06192b4C24F';
var utilAddress = '0x5079eE8B62699F3DEc77c64416815edC4F510264';
var updaterAddress = '0xd838340B574678B34C628D95d81494e1a5FD1401';


var proxyInstance;
var proxyRealInstance;
var updateInstance;

FiatProxyReal.at(addressProxy).then( function(instance) {
    proxyRealInstance = instance;
    return proxyRealInstance.changeAdmin("0xd838340B574678B34C628D95d81494e1a5FD1401", {from:"0x6cba6f3993f1f36a61806cb20c88d0ae13353ef6"});
}).catch(err=>{
    console.log(err.toString());
});


// 0x6cba6f3993f1f36a61806cb20c88d0ae13353ef6

//
// var updateInstance;
// FiatUpdater.at(updaterAddress).then( function(instance) {
//     updateInstance = instance;
//     // return proxyInstance.configureMinter("0x840de23b190bdc5a93352d7f0086f039a7e9e760","1000000000",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
//     return updateInstance.transferOwnership("0x6cba6f3993f1f36a61806cb20c88d0ae13353ef6",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
// }).then(result=>{
//     console.info(`update owner is :`, result.toString());
// }).catch(err=>{
//     console.log(err.toString());
// });



// var updateInstance;
// FiatUpdater.at(updaterAddress).then( function(instance) {
//     updateInstance = instance;
//     // return proxyInstance.configureMinter("0x840de23b190bdc5a93352d7f0086f039a7e9e760","1000000000",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
//     return updateInstance.owner.call();
// }).then(result=>{
//     console.info(`update owner is :`, result.toString());
// }).catch(err=>{
//     console.log(err.toString());
// });

// FiatProxy.at(addressProxy).then( function(instance) {
//     proxyInstance = instance;
//     return proxyInstance.totalSupply.call();
// }).then(result=>{
//     console.info(`before update totalSupply:`, result.toString());
//     return proxyRealInstance.implementation.call();
// }).then(result=>{
//     console.info(`before update implementation:`, result.toString());
//     return updateInstance.upgrade({from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
// }).then(result=>{
//     console.info(`update result:`, result.toString());
//     return proxyRealInstance.implementation.call();
// }).then(result=>{
//     console.info(`after update implementation:`, result.toString());
//     return proxyInstance.totalSupply.call();
// }).then(result=>{
//     console.info(`after update totalSupply:`, result.toString());
// }).catch(err=>{
//     console.log(err.toString());
// });

// FiatProxyReal.at(addressProxy).then( function(instance) {
//     proxyInstance = instance;
//     return proxyInstance.implementation.call();
// }).then(result=>{
//     console.info(`before update impl:`, result.toString());
//     // return proxyInstance.totalSupply.call();
// }).catch(err=>{
//     console.log(err.toString());
// });

// // var updateInstance;
// FiatUpdater.at(updaterAddress).then( function(instance) {
//     updateInstance = instance;
//     return updateInstance.update.call();
// }).then(result=>{
//     console.info(`update result:`, result.toString());
// }).catch(err=>{
//     console.log(err.toString());
// });
//
// FiatProxy.at(addressProxy).then( function(instance) {
//     proxyInstance = instance;
//     return proxyInstance.implementation.call();
// }).then(result=>{
//     console.info(`after update impl:`, result.toString());
//     // return proxyInstance.totalSupply.call();
// }).catch(err=>{
//     console.log(err.toString());
// });
//
// FiatProxy.at(addressProxy).then( function(instance) {
//     proxyInstance = instance;
//     return proxyInstance.totalSupply.call();
// }).then(result=>{
//     console.info(`after update totalSupply:`, result.toString());
//     // return proxyInstance.totalSupply.call();
// }).catch(err=>{
//     console.log(err.toString());
// });