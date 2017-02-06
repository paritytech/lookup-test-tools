'use strict'

const {isAddressValid} = require('@parity/parity.js').Api.util
const test = require('tape')
const createApi = require('./lib/create-api')
const fixtures = require('./lib/fixtures')

test('deployed the registry', (t) => {
  t.plan(1)

  const api = createApi()
  fixtures.run(api)
  .then(() => {
    return api.parity.registryAddress()
  })
  .then((address) => {
    t.ok(isAddressValid(address), 'registry address is invalid')
  })
  .catch(t.ifError)
})
