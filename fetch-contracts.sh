#!/bin/sh

curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/SimpleRegistry.sol' > contracts/SimpleRegistry.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/ProofOfEmail.sol' > contracts/ProofOfEmail.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/SMSVerification.sol' > contracts/SMSVerification.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/BadgeReg.sol' > contracts/BadgeReg.sol
curl --fail -L 'https://raw.githubusercontent.com/ethcore/contracts/master/TokenReg.sol' > contracts/TokenReg.sol
