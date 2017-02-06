'use strict'
// originally taken from ethcore/lookup

const co = require('co')
const {sha3} = require('@parity/parity.js').Api.util
const {abi} = require('./contracts/email-verification')

const emailVerifyAddress = co.wrap(function* (api, contractAddress, owner, account, email) {
  const code = '0x1111111111111111111111111111111111111111111111111111111111111111'
  const puzzle = sha3.text(code)
  const emailHash = sha3.text(email)
  const contract = api.newContract(abi, contractAddress)

  yield contract.instance.request.call({from: account}, [emailHash])
  yield contract.instance.puzzle.call({from: owner}, [account, puzzle, emailHash])
  yield contract.instance.confirm.call({from: account}, [code])
})

module.exports = emailVerifyAddress
