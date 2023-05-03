const { ethers } = require("hardhat");
const request = require('request');

async function main() {
  const start = Date.now();
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach("0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C")

  contract.on("Transfer", (from, to, value, event) => {
    console.log({
      from: from,
      to: to,
      value: value.toString(),
      data: event
    });
  });

};

const fetchMetadata = async ( url ) => {
  return new Promise(function (resolve, reject) {
    request(url, function (error, res, body) {
      if (!error && res.statusCode === 200) {
        resolve(body);
      } else {
        reject(error);
      }
    });
  });
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});