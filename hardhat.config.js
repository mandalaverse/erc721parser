require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
   networks: {
    shibuya: {
      url: "https://evm.shibuya.astar.network",
      accounts: ["766128aaf4ef03e60cb504ebe614f79cc0154546f1f06326999c18e66e77d0c8"]
    },
  },
};
