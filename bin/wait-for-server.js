#!/usr/bin/env node
'use strict'

const {fetch} = require('fetch-ponyfill')()
const retry = require('p-retry')

const req = {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'net_version',
    params: []
  })
}

const checkIfUp = () =>
  fetch('http://localhost:8546/', req)
  .then((res) => {
    if (!res.ok) throw new Error('res not ok')
  })

retry(checkIfUp, {retries: 5})
.then(() => process.exit(0))
.catch(() => process.exit(1))
