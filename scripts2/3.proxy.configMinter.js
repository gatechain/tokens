//引入web
var Web3 = require("web3");

//引入truffle-contract
var contract = require("truffle-contract");
//引入合约数据
var data = require("/Users/junjin/go/src/github.com/centrehq/centre-tokens/build/contracts/FiatTokenV1.json");

//返回合约抽象
var Storage = contract(data);
var provider = new Web3.providers.HttpProvider("http://123.57.233.34:8090");
Storage.setProvider(provider);

var address = '0x59Ab3063fe6b9fdcDA657490699f7994F182F646';
var addressProxy = '0xC2adEE68D01bC82dD77f86ee3f8bf46b9De44251';

var proxyInstance;
Storage.at(addressProxy).then( function(instance) {
    proxyInstance = instance;
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`before mint balance:`, result.toString());
    return proxyInstance.configureMinter("0x840de23b190bdc5a93352d7f0086f039a7e9e760","1000000000",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
    // return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`mint result`, result.toString());
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`after mint balance:`, result.toString());
}).catch(err=>{
    console.log(err.toString());
});