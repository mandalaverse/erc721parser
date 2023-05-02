const { ethers } = require("hardhat");
const request = require('request');

async function main() {
  provider = ethers.provider;
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach("0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C")

  let checked = 0;
  let ownerof;
  let tokenURI;
  let metadata;
  while( checked < JSON.parse(minted) ){
    ownerof = await contract.ownerOf(checked);
    tokenURI = await contract.tokenURI(checked)
    console.log("owner of: ", checked + ": " + ownerof);
    metadata = await fetchMetadata(tokenURI);
    console.log("Metadata: ", metadata);
    checked++;
  }
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