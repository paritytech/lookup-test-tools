'use strict'
// originally taken from ethcore/lookup

const deploy = require('./deploy')
const register = require('./register')
const {bin, abi} = require('./contracts/registry')

const deployAndRegister = (api, registry, account, abi, bytecode, name) => {
  return deploy(api, abi, bytecode)
    .then((address) => {
      return register(registry, account, name, {A: address})
    })
}

const deployRegistry = (api, account) => {
  return deploy(api, abi, bin)
    .then((address) => {
      const registry = api.newContract(abi, address).instance
      return register(registry, account, 'registry', {A: address})
        .then(() => {
          api.setRegistry(registry)
          return registry
        })
    })
}

const run = (api, account) => {
  return deployRegistry(api, account)
  // todo: BadgeReg, TokenReg, EmailVerification, SMSVerification
}

module.exports = {
  deployAndRegister,
  deployRegistry,
  run
}
