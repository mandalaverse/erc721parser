const { ethers } = require("hardhat");
const request = require('request');

const main = async () => {
  const start = Date.now();
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach("0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C")
  await syncTokens(contract);
  await monitorContract(contract);
};

const syncTokens = async ( contract ) => {
  const minted = await contract.totalSupply();
  console.log("Syncing this many: ", minted);
  let checked = 0;
  let ownerof;
  let tokenURI;
  let metadata;
  while( checked < JSON.parse(minted) ){
    ownerof = await contract.ownerOf(checked);
    tokenURI = await contract.tokenURI(checked)
    // console.log("owner of: ", checked + ": " + ownerof);
    metadata = await fetchMetadata(tokenURI);
    // console.log("Metadata: ", metadata);
    console.log(checked)
    checked++;
  };
  const end = Date.now();
  console.log("Time Elapsed: ", ( end - start)/1000 + " Seconds" );
};

const monitorContract = async ( contract ) => {
  console.log("monitoring");
  contract.on("Transfer", (from, to, value, event) => {
    console.log({
      from: from,
      to: to,
      value: value,
      data: event
    });
  });
}

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