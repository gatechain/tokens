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



var address = '0xf1DEaf2DE6A8d0145E0De5653420244905AAC3f5';
var addressProxy = '0x572Ee543250622582b37802cFa05BFFA300D5367';
var address2 = '0x771D7d517dd047bC58b245811794ea9328A15641';
var utilAddress = '0x3205116Dc89f0d246bd1ef24f24d0B7C61A0a277';
var updaterAddress = '0x0651B802c0D440f49DB4b0d3f7e8d9e3B5761021';


var proxyInstance;
var proxyRealInstance;
var updateInstance;

FiatProxyReal.at(addressProxy).then( function(instance) {
    proxyRealInstance = instance;
    return proxyRealInstance.changeAdmin("0x0651B802c0D440f49DB4b0d3f7e8d9e3B5761021", {from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
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