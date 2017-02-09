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

const server = require('../lib/server')

const port = argv.p || argv.port ? parseInt(argv.p || argv.port) || 8546 : 8546
const silent = argv.s || argv.silent

const bail = (err) => {
  console.error(err)
  process.exit(1)
}

server.start(port, (err, port, accounts) => {
  if (err) return bail(err)
  if (!silent) {
    console.log(`Test server running at port ${port}.`)

    const pretty = Object.keys(accounts).map((address, i) => `\t${i} ${address}`).join('\n')
    console.info('accounts created:')
    console.info(pretty)
  }
})
