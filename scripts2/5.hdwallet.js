const HDWalletProvider = require("@truffle/hdwallet-provider");
const contract = require("truffle-contract");
const config = require("../config.js");
const data = require("../build/contracts/FiatTokenV1.json");
const network = 'rinkeby';
const provider = new HDWalletProvider(config.MNEMONIC, `https://${network}.infura.io/v3/${config.INFURA_KEY}`);

function callContract() {
    const Storage = contract(data);
    Storage.setProvider(provider);
    let proxyInstance;
    Storage.at(config.PROXY_CONTRACT_ADDRESS).then( function(instance) {
        proxyInstance = instance;
        return instance.totalSupply.call();
    }).then(result=> {
        console.info("before totalSupply:" + result.toString());
        return proxyInstance.configureMinter("0x667030a0a91511aF534760c46351357b7356F375", 1000000, {from: "0x3574f849b6ffED10Ca661DD242770AF6048A78F8"});
    }).then(result => {
        return proxyInstance.minterAllowance("0x667030a0a91511aF534760c46351357b7356F375");
    }).then(result => {
        console.info("allowance:" + result.toString());
        return proxyInstance.mint("0x3574f849b6ffED10Ca661DD242770AF6048A78F8","1000000",{from:"0x667030a0a91511aF534760c46351357b7356F375"});
    }).then(result=> {
        console.info("mint result:" + result);
        return proxyInstance.totalSupply.call();
    }).then(result=> {
        console.info("after totalSupply:" + result.toString());
    }).catch(err=>{
        console.info(err.toString());
    });
}

function signTx() {
  const Web3 = require("web3");
  let web3 = new Web3(provider);
  console.info(provider.getAddresses());
  console.info(web3.eth.accounts.sign("123",config.PRIVATE_KEY));
}

//signTx();
callContract();

provider.engine.stop();