# ownerParser Script.

If you didn't include the function to pull token id's by address in your smart contract. This parser will look through all your minted tokens,
sync the token ID and Owner to a sqlite db and then monitor for all new transfers or mints to updated teh toekn owner.

Make sure you create a SQLite DB in the `SRC/` dir and provide the proper name in the Script and update the contract_address variable. 

# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

To specify a network, run as such:
```
npx hardhat node
```
to run a localhost node if you're using localhost network, then in a separate terminal: 
```
npx hardhat run --network localhost scripts/deploy.js
```
