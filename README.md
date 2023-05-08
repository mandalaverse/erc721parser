# ownerParser Script.

If you didn't include the function to pull token id's by address in your smart contract. This parser will look through all your minted tokens,
sync the token ID and Owner to a sqlite db and then monitor for all new transfers or mints to updated teh toekn owner.

Make sure you create a SQLite DB in the `SRC/` dir and provide the proper name in the Script and update the contract_address variable. 
