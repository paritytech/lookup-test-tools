'use strict'

const {isAddressValid} = require('@parity/parity.js').Api.util
const test = require('tape')
const createApi = require('./lib/create-api')
const fixtures = require('./lib/fixtures')

test('deploys Registry, EmailVerification & SMSVerification', (t) => {
  t.plan(4)

  const api = createApi()
  fixtures.run(api)
  .then(({registry, emailAddress, smsAddress}) => {
    t.ok(registry)
    t.ok(isAddressValid(registry.address), 'Registry address is invalid')

    t.ok(isAddressValid(emailAddress), 'EmailVerification address is invalid')
    t.ok(isAddressValid(smsAddress), 'SMSVerification address is invalid')
  })
  .catch(t.ifError)
})
