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

var address = '0xf1DEaf2DE6A8d0145E0De5653420244905AAC3f5';
var addressProxy = '0x572Ee543250622582b37802cFa05BFFA300D5367';
var address2 = '0x771D7d517dd047bC58b245811794ea9328A15641';
var utilAddress = '0x3205116Dc89f0d246bd1ef24f24d0B7C61A0a277';
var updaterAddress = '0x0651B802c0D440f49DB4b0d3f7e8d9e3B5761021';

//通过合约抽象与合约交互
Storage.at(addressProxy).then( function(instance) {
    return instance.totalSupply.call();    //call方式调用合约
}).then(result=>{
    console.info(result.toString());    //0
}).catch(err=>{
    console.info(err.toString());
});
