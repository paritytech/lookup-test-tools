'use strict'
// originally taken from ethcore/lookup

const fs = require('fs')
const path = require('path')

const base = path.join(__dirname, '../../contracts')
const read = (name) => fs.readFileSync(path.join(base, name), {encoding: 'utf8'})

const bin = read('SimpleRegistry.sol:SimpleRegistry.bin')
const abi = JSON.parse(read('SimpleRegistry.sol:SimpleRegistry.abi'))

module.exports = {
  bin,
  abi
}
