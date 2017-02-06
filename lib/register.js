'use strict'
// originally taken from ethcore/lookup

const {sha3} = require('@parity/parity.js').Api.util

const register = (registry, account, name, data) => {
  const hash = sha3.text(name)

  return registry
    .instance.fee.call({}, [])
    .then((fee) => {
      return registry.instance.reserve.postTransaction({from: account, value: fee}, [hash])
    })
    .then(() => {
      const promises = Object.keys(data).map((key) => {
        const value = data[key]
        const method = key.toLowerCase() === 'a' ? 'setAddress' : 'setData'

        return registry.instance[method].postTransaction({from: account}, [hash, key, value])
      })

      return Promise.all(promises)
    })
}

module.exports = register
