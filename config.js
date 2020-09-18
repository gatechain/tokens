module.exports = {
  // BIP39 mnemonic phrase
  MNEMONIC: "",
  // INFURA API key
  INFURA_KEY: "",
  // FiatTokenProxy admin - can upgrade implementation contract
  PROXY_ADMIN_ADDRESS: "0x6cba6f3993f1f36a61806cb20c88d0ae13353ef6",
  // Owner - can configure master minter, pauser, and blacklister
  OWNER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Master Minter - can configure minters and minter allowance
  MASTERMINTER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Pauser - can pause the contract
  PAUSER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Blacklister - can blacklist addresses
  BLACKLISTER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // FiatTokenProxy contract - override the contract addresns used in migrations
  PROXY_CONTRACT_ADDRESS: "",
};
