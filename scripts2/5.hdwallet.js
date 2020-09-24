const HDWalletProvider = require("@truffle/hdwallet-provider");
const contract = require("truffle-contract");
const config = require("../config.js");
const data = require("../build/contracts/FiatTokenV1.json");
const network = 'rinkeby';
const provider = new HDWalletProvider(config.MNEMONIC, `https://${network}.infura.io/v3/${config.INFURA_KEY}`,0,1);

function callContract() {
    const Storage = contract(data);
    Storage.setProvider(provider);
    Storage.at(config.PROXY_CONTRACT_ADDRESS).then( function(instance) {
        return instance.name.call();
    }).then(result=>{
        console.info(result.toString());
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

signTx();
callContract();

provider.engine.stop();