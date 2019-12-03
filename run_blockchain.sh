#!/bin/bash
rm ./client/src/contracts/MedChain.json
truffle compile
truffle migrate --reset
node ./client/add.js