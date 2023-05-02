const { ethers } = require("hardhat");

async function main() {
  provider = ethers.provider;
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach("0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C")
  const owners = await contract.tokenOfOwnerByIndex();
  console.log("owners", owners);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});