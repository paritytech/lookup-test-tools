'use strict'

const fs = require('fs')
const path = require('path')

const base = path.join(__dirname, '../../contracts')
const read = (name) => fs.readFileSync(path.join(base, name), {encoding: 'utf8'})

const bin = read('ProofOfEmail.sol:ProofOfEmail.bin')
const abi = JSON.parse(read('ProofOfEmail.sol:ProofOfEmail.abi'))

module.exports = {
  bin,
  abi
}
