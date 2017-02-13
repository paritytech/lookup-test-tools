'use strict'
// originally taken from ethcore/lookup

const co = require('co')

const deploy = require('./deploy')
const register = require('./register')

const registryData = require('./contracts/registry')
const emailData = require('./contracts/email-verification')
const smsData = require('./contracts/sms-verification')
const badgeData = require('./contracts/badge-reg')
const tokenData = require('./contracts/token-reg')

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

  // todo: GitHubHint, ethcore/dapp-assets
  // todo: parallelize

  const emailAddress = yield deployAndRegister(api, reg, acc, emailData.abi, emailData.bin, 'emailverification')
  const smsAddress = yield deployAndRegister(api, reg, acc, smsData.abi, smsData.bin, 'smsverification')

  const badgeAddress = yield deployAndRegister(api, reg, acc, badgeData.abi, badgeData.bin, 'badgereg')
  const badgeReg = api.newContract(badgeData.abi, badgeAddress)
  yield badgeReg.instance.register.postTransaction({from: acc}, [emailAddress, 'emailverification'])
  yield badgeReg.instance.setMeta.postTransaction({from: acc}, [0, 'TITLE', 'e-mail verified'])
  yield badgeReg.instance.register.postTransaction({from: acc}, [smsAddress, 'smsverification'])
  yield badgeReg.instance.setMeta.postTransaction({from: acc}, [1, 'TITLE', 'SMS verified'])

  const tokenAddress = yield deployAndRegister(api, reg, acc, tokenData.abi, tokenData.bin, 'tokenreg')
  // todo: tokens

  return {
    account: acc,
    registry: reg,
    emailAddress,
    smsAddress,
    badgeAddress,
    tokenAddress
  }
})

module.exports = {
  deployRegistry,
  deployAndRegister,
  run
}
