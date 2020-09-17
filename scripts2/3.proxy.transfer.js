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

var address = '0x5b977ee72664296084Ef4e6e66ea86f7c58c0d77';
var addressProxy = '0x1ecaEf7AD2Ab8d7b61EdD3Ef64B205AAA13e63C3';

var proxyInstance;
Storage.at(addressProxy).then( function(instance) {
    proxyInstance = instance;
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`before mint balance:`, result.toString());
    return proxyInstance.mint("0x661B5421B81Cfa009D6b919362687f62B3B3Cb8b","1000",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
    // return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`mint result`, result.toString());
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`after mint balance:`, result.toString());
}).catch(err=>{
    console.log(err.toString());
});