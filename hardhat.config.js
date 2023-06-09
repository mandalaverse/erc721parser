require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
   networks: {
    localhost: {
      url:"http://localhost:8545",
      chainId:31337,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
    },
    shibuya: {
      url: "https://evm.shibuya.astar.network",
      chainId:81,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      gas: 0x5B8D80
    },
    astar: {
      url: "https://evm.astar.network",
      chainId:592,
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"],
      gas: 0x5B8D80
    }
  }
};

