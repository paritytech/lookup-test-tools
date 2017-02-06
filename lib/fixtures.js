'use strict'
// originally taken from ethcore/lookup

const {api} = require('./api')
const deploy = require('./deploy')
const register = require('./register')
const {bin, abi} = require('./contracts').registry

let account = null
let registry = null

const deployAndRegister = (abi, bytecode, name) => {
  return deploy(api, abi, bytecode)
    .then((address) => {
      return register(api, registry, account, name, {A: address})
    })
}

const deployRegistry = () => {
  return deploy(api, abi, bin)
    .then((address) => {
      registry = api.newContract(abi, address).instance
      return register(api, registry, account, 'registry', {A: address})
    })
    .then(() => registry)
}

const run = () => {
  return deployRegistry()
  // todo: BadgeReg, TokenReg, EmailVerification, SMSVerification
}

module.exports = {
  deployAndRegister,
  deployRegistry,
  run
}
