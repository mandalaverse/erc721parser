const { ethers } = require("hardhat");
const request = require('request');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
// const mandaladb = "../server/typescript/db/mandala.db"; 
const dblocation = "./mandala.db";
let db;
const main = async () => {
  db = await open({
    filename: dblocation,
    driver: sqlite3.Database
  });
  const contract_address = "0x8f3fF4BebaB846aB06E487b2aAC28E12e4dbBc2C";
  const Contract = await ethers.getContractFactory("NFT_ERC721")
  const contract = await Contract.attach(contract_address)
  console.log("conctract", contract.address);
  const minted = await contract.totalSupply();
  const lastRow = await dbCheckLastRow();
  console.log("lastRow", lastRow.length);
  syncTokens(contract, minted, lastRow);
  await monitorContract(contract);
};

const syncTokens = async ( contract, minted, lastRow ) => {
  const startSync = Date.now();
  console.log("Minted this many: ", JSON.parse(minted));
  let start = 0;
  let difference = (+minted - lastRow.length);
  if( difference > 0 ) start = lastRow.length;
  if( difference > 0 ) console.log("Syncing this many: ", difference);
  if( lastRow.length === +minted ) start = +minted;
  while( start < JSON.parse(minted) ){
    let ownerof = await contract.ownerOf(start);
    // console.log("ownerof", ownerof);
    let tokenURI = await contract.tokenURI(start)
    // console.log("tokenURI", tokenURI);
    console.log(start + ": " + ownerof);
    let metadata = await fetchMetadata(tokenURI);
    // console.log("Metadata: ", JSON.parse(metadata));
    let tokenExist = await dbCheckTokenExists(start);
    dbWriteNewSync( contract.address, start, ownerof );
    // console.log(start)
    start++;
  };
  const endSync = Date.now();
  console.log("Time Elapsed: ", ( endSync - startSync)/1000 + " Seconds" );
};

const monitorContract = async ( contract ) => {
  console.log("monitoring");
  contract.on("Transfer", async (from, to, value, event) => {
    let tokenURI = await contract.tokenURI(JSON.parse(value));
    let metadata = await fetchMetadata(tokenURI);
    let token = {
      from: from,
      to: to,
      value: JSON.parse(value),
      data: event,
      metadata: metadata
    };
    console.log(token);

    let exists = await dbCheckTokenExists(JSON.parse(value));
    console.log("exists", exists);
    if(exists === true ) await dbUpdateOwner(token);
    if(exists === false ) await dbWriteNewTrasnfer(token);
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

dbCheckLastRow = async () => {
  const SQL = "SELECT * FROM CryptonautOwners";
  try{
    const results = await db.all(SQL, []);
    return(results);
  }catch(error){
    console.log("dbCheckLastRow error: ", error);
    return("error");
  }
};

dbCheckTokenExists = async ( tokenID ) => {
  const SQL = "SELECT * FROM CryptonautOwners WHERE tokenID=?";
  try{
    const results = await db.all(SQL, [tokenID] );
    if(results.length > 0 )return(true);
    if(results.length === 0 )return(false);
  }catch(error){
    console.log("dbCheckTokenExists error: ", error);
    return("error");
  }
};

const dbWriteNewTrasnfer = async ( token ) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const SQL = "INSERT INTO CryptonautOwners ( created_at, blockNumber, addr_from, addr_to, contract, tokenID, nftName, owner ) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";
  try{
    const queryInsertResults = await db.run( SQL, [ timestamp, token.data.blockNumber, token.from, token.to, token.data.address, token.value, token.metadata.name, token.to ] );
    return(queryInsertResults);    
  }catch(error){
    console.log("dbWriteNew Error", error);
    return("error");
  };
};

const dbWriteNewSync = async ( contract, tokenID, owner ) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const SQL = "INSERT INTO CryptonautOwners ( contract, tokenID, owner ) VALUES ( ?, ?, ? )";
  try{
    const queryInsertResults = await db.run( SQL, [ contract, tokenID, owner ] );
    return(queryInsertResults);    
  }catch(error){
    console.log("dbWriteNew Error", error);
    return("error");
  };
};

const dbUpdateOwner = async ( token ) => {
  const timestamp = Math.floor(Date.now() / 1000).toString();  
  const SQL = "UPDATE CryptonautOwners SET updated_at=?, owner=? WHERE tokenID=?";
  try{
    const queryUpdateResults = await db.run( SQL, [ timestamp, token.to, token.value] );
    return("ok")
  }catch(error){
    console.log("dbUpdateOwner error", error);
    return("error");
  };
};

main().catch((error) => {
  console.error(error);
  db.close();
  process.exitCode = 1;
});

// SQLLite DB Table
/*
CREATE TABLE IF NOT EXISTS CryptonautOwners(
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
*/