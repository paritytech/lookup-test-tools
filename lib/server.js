'use strict'
// originally taken from ethcore/lookup

const TestRPC = require('ethereumjs-testrpc')

const server = TestRPC.server({
  debug: true,
  unlocked_accounts: [0]
})

const bail = (err) => {
  if (err) console.error(err)
}

const defaultPort = 8546
const start = (port, cb = bail) => {
  server.listen(port || defaultPort, (err, blockchain) => {
    if (err) return cb(err)

    cb(null, port, blockchain.unlocked_accounts)
  })
}

const stop = () => {
  server.close()
}

module.exports = {
  start,
  stop
}
