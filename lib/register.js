'use strict'
// originally taken from ethcore/lookup

const register = (api, registry, account, name, data) => {
  const hash = api.util.sha3.text(name)

  return registry.fee
    .call({}, [])
    .then((fee) => {
      return registry.reserve.postTransaction({from: account, value: fee}, [hash])
    })
    .then(() => {
      const promises = Object.keys(data).map((key) => {
        const value = data[key]
        const method = key.toLowerCase() === 'a' ? 'setAddress' : 'setData'

        return registry[method].postTransaction({from: account}, [hash, key, value])
      })

      return Promise.all(promises)
    })
}

module.exports = register
