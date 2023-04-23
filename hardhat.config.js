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
      accounts: ["766128aaf4ef03e60cb504ebe614f79cc0154546f1f06326999c18e66e77d0c8"]
    },
  },
};
