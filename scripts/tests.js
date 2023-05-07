const { ethers } = require("hardhat");
const request = require('request');

async function main() {
  provider = ethers.provider;
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach("0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C")
  // const mint = await contract.mint(0x01);
  // const res = await mint.wait();
  // console.log("mint:", res);
  // const ownerof = await contract.ownerOf(357);
  // console.log("ownerof", ownerof);
  // const tokenURI = await contract.tokenURI(357);
  // console.log("tokenURI", tokenURI);
  // const setNotRevealedURI = await contract.setNotRevealedURI("ipfs://QmZxwetcqbMiAcng1cqtnP7bpYYmSg3bjXYtYfogV4a9po/hidden.json");
  // const resReveal = await setNotRevealedURI.wait();
  // console.log("resReveal", resReveal);
  // const owners = await contract.balanceOf("0xea46ac6A89067204c9EEC370e9E4aaCe53D11C69");
  // console.log("owners", owners);
  const minted = await contract.totalSupply();
  console.log("minted", minted);
  // const setBaseURI= await contract.setBaseURI("https://cryptonautreveal.bakon.dev/reveal/");
  // const resURI = await setBaseURI.wait();
  // console.log("resURI", resURI);
  // const setReveal= await contract.reveal();
  // const resReveal = await setReveal.wait();
  // console.log("resReveal", resReveal);
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});