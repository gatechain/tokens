module.exports = {
  // BIP39 mnemonic phrase
  MNEMONIC: "",
  // INFURA API key
  INFURA_KEY: "",
  // FiatTokenProxy admin - can upgrade implementation contract
  PROXY_ADMIN_ADDRESS: "0x661B5421B81Cfa009D6b919362687f62B3B3Cb8b",
  // Owner - can configure master minter, pauser, and blacklister
  OWNER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Master Minter - can configure minters and minter allowance
  MASTERMINTER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Pauser - can pause the contract
  PAUSER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // Blacklister - can blacklist addresses
  BLACKLISTER_ADDRESS: "0x840de23b190bdc5a93352d7f0086f039a7e9e760",
  // FiatTokenProxy contract - override the contract address used in migrations
  PROXY_CONTRACT_ADDRESS: "",
};
