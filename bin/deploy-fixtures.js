#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const pkg = require('../package.json')

const argv = minimist(process.argv.slice(2))

if (argv.h || argv.help) {
  process.stdout.write(`\
Usage: test-server [--port 8546] [--silent]
`)
  process.exit(0)
}

if (argv.v || argv.version) {
  process.stdout.write(`\
${pkg.name} ${pkg.version}
`)
  process.exit(0)
}

const createApi = require('../lib/create-api')
const fixtures = require('../lib/fixtures')

const port = argv.p || argv.port ? parseInt(argv.p || argv.port) : 8546
const silent = argv.s || argv.silent

const bail = (err) => {
  console.error(err)
  process.exit(1)
}

const api = createApi(port)
fixtures.run(api)
.then(({account, registry, emailAddress, smsAddress}) => {
  if (silent) return
  console.log('unlocked account:', account)
  console.log('Registry:', registry.address)
  console.log('EmailVerification:', emailAddress)
  console.log('SMSVerification:', smsAddress)
})
.catch(bail)
