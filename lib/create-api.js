'use strict'
// originally taken from ethcore/lookup

const {Api} = require('@parity/parity.js')

const createApi = (port = 8546) => {
  const transport = new Api.Transport.Http('http://localhost:' + port)
  const api = new Api(transport)

  let registry

  api.transport._connectTimeout = -1

  api.parity.postTransaction = (options) => {
    return api.eth.sendTransaction(options)
  }

  api.parity.registryAddress = () => {
    return Promise.resolve(registry ? registry.address : null)
  }

  api.setRegistry = (_registry) => {
    registry = _registry
  }

  return api
}

module.exports = createApi
