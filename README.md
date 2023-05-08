# ownerParser Script.

If your ERC721 SC is missing the #ERC721Enumerable function to return, it can be hard to view which tokens are owned by a specific address. 
This short hardhat script will Query each tokens Owner write them in a sqlite db and monitor the SC for future mints or transfer transactions to updated the owner.

# How to use:
`npm install`<br />
`Put your ERC721 contract in the contracts folder`<br />
`Update the contract_address variable`<br />
In hardhat.config.js update your Blockchain networks.<br />
Then run "npx hardhat run scripts/ownerParser.js --network <Network name from config file>"<br />

# DB Schema.
// SQLLite DB Table
```
CREATE TABLE IF NOT EXISTS nft_owners(
  id INTEGER PRIMARY KEY autoincrement,
  created_at CHAR(100),
  updated_at CHAR(100),
  blockNumber CHAR(100),
  addr_from CHAR(100),
  addr_to CHAR(100),
  contract CHAR(100),
  tokenID CHAR(100) UNIQUE,
  nftName CHAR(100),
  owner CHAR(100)
);
```