'use strict'

const fs = require('fs')
const path = require('path')

const base = path.join(__dirname, '../../contracts')
const read = (name) => fs.readFileSync(path.join(base, name), {encoding: 'utf8'})

const bin = read('SMSVerification.sol:ProofOfSMS.bin')
const abi = JSON.parse(read('SMSVerification.sol:ProofOfSMS.abi'))

module.exports = {
  bin,
  abi
}
