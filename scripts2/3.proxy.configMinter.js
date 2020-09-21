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

var address = '0xA850857BFe6Be2783375dCA2D7f998406DAfedC9';
var addressProxy = '0x3785e72CC24B13e6367Bb6bd5b536CdD27CeF6e1';
var address2 = '0x6e4F5c04D6eA9d45666947B2156ec06192b4C24F';
var utilAddress = '0x5079eE8B62699F3DEc77c64416815edC4F510264';
var updaterAddress = '0xd838340B574678B34C628D95d81494e1a5FD1401';

var proxyInstance;
Storage.at(addressProxy).then( function(instance) {
    proxyInstance = instance;
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`before mint config:`, result.toString());
    return proxyInstance.configureMinter("0x840de23b190bdc5a93352d7f0086f039a7e9e760","3000000000000000000",{from:"0x840de23b190bdc5a93352d7f0086f039a7e9e760"});
}).then(result=>{
    console.info(`mint config result`, result.toString());
    return proxyInstance.totalSupply.call();
}).then(result=>{
    console.info(`after mint balance:`, result.toString());
}).catch(err=>{
    console.log(err.toString());
});