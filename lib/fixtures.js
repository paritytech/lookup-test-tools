'use strict'
// originally taken from ethcore/lookup

const co = require('co')

const deploy = require('./deploy')
const register = require('./register')

const registryData = require('./contracts/registry')
const emailData = require('./contracts/email-verification')
const smsData = require('./contracts/sms-verification')

const deployRegistry = co.wrap(function* (api, account) {
  const {abi, bin} = registryData

  const address = yield deploy(api, abi, bin)
  const registry = api.newContract(abi, address)

  yield register(registry, account, 'registry', {A: address})
  api.setRegistry(registry)

  return registry
})

const deployAndRegister = co.wrap(function* (api, registry, account, abi, bytecode, name) {
  const address = yield deploy(api, abi, bytecode)
  yield register(registry, account, name, {A: address})

  return address
})

const run = co.wrap(function* (api) {
  const [acc] = yield api.eth.accounts()

  const reg = yield deployRegistry(api, acc)

  const emailAddress = yield deployAndRegister(api, reg, acc, emailData.abi, emailData.bin, 'email-verification')
  const smsAddress = yield deployAndRegister(api, reg, acc, smsData.abi, smsData.bin, 'sms-verification')
  // todo: TokenReg

  return {account: acc, registry: reg, emailAddress, smsAddress}
})

module.exports = {
  deployRegistry,
  deployAndRegister,
  run
}
