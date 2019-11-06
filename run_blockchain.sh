#!/bin/bash
rm ./client/src/contracts/med_chain.json
truffle compile
truffle migrate --reset
