'use strict'
// originally taken from ethcore/lookup

const {Api} = require('@parity/parity.js')

// do the setup
const transport = new Api.Transport.Http('http://localhost:8888')
const api = new Api(transport)

let registry = null

api.transport._connectTimeout = -1

api.parity.postTransaction = (options) => {
  return api.eth.sendTransaction(options)
}

api.parity.registryAddress = () => {
  return Promise.resolve(registry.address)
}

const setRegistry = (_registry) => {
  registry = _registry
}

module.exports = {
  api,
  setRegistry
}
