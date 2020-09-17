//引入web
var Web3 = require("web3");

//引入truffle-contract
var contract = require("truffle-contract");
//引入合约数据
var data = require("/Users/junjin/go/src/github.com/centrehq/centre-tokens/build/contracts/V2Upgrader.json");

//返回合约抽象
var Storage = contract(data);
var provider = new Web3.providers.HttpProvider("http://123.57.233.34:8090");
Storage.setProvider(provider);

var address = '0x52Bd138f68bD18c2Ee9dDBD62b36C60bDa4E8c3A';
var addressProxy = '0xa3eD45768abfCE58Fc84A5DaCe71E838267D5Ccc';
var address2 = '0x32c0A906AEBc32B276DB32988Dcb6aDa08514c1C';
var utilAddress = '0xE344d42d34b47294092b7E6F86c63098B4fDE351';
var updaterAddress = '0x5B173B95FfBE56020121954AD4CDEaa9fbDC6F69';

var updateInstance;
Storage.at(updaterAddress).then( function(instance) {
    updateInstance = instance;
    return updateInstance.update.call();
}).then(result=>{
    console.info(`after update impl:`, result.toString());
}).catch(err=>{
    console.log(err.toString());
});