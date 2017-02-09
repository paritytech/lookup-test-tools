'use strict'

const fs = require('fs')
const path = require('path')

const base = path.join(__dirname, '../../contracts')
const read = (name) => fs.readFileSync(path.join(base, name), {encoding: 'utf8'})

const bin = read('TokenReg.sol:TokenReg.bin')
const abi = JSON.parse(read('TokenReg.sol:TokenReg.abi'))

module.exports = {
  bin,
  abi
}
