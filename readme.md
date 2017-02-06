# [Parity](https://ethcore.io/parity.html) testing tools

**A testbed for [Parity](https://ethcore.io/parity.html) tools.** Starts an [in-memory RPC server](https://github.com/ethereumjs/testrpc) and deploys all contracts the Parity UI usually relies on.

[![Join the chat at https://gitter.im/ethcore/parity][gitter-image]][gitter-url] [![GPLv3][license-image]][license-url]

[gitter-image]: https://badges.gitter.im/Join%20Chat.svg
[gitter-url]: https://gitter.im/ethcore/parity
[license-image]: https://img.shields.io/badge/license-GPL%20v3-green.svg
[license-url]: https://www.gnu.org/licenses/gpl-3.0.en.html

## Installation

```shell
npm install --save-dev ethcore/test-tools
```

## Usage

You can use `test-tools` from the CLI to quickly get a running test server.

```shell
test-server # run the RPC server
deploy-fixtures # deploy common contracts
```

To get more fine-grained control or to control the testbed from JS, you can use it from Node.

### in-memory RPC server

```js
const server = require('test-tools/lib/server')
server.start(port = 8546, cb)
server.stop()
```

### deploy a contract

```js
const deploy = require('test-tools/lib/deploy')
deploy(api, abi, bin, values = []) // returns a Promise
```

### e-mail-verify an account at `EmailVerification.sol`

```js
const emailVerifyAccount = require('test-tools/lib/email-verify-account')
emailVerifyAccount(api, contractAddress, owner, account, email) // returns a Promise
```

### SMS-verify an account at `SMSVerification.sol`

```js
const smsVerifyAccount = require('test-tools/lib/sms-verify-account')
smsVerifyAccount(api, contractAddress, owner, account) // returns a Promise
```

### register a name at `Registry.sol` and set records on it

```js
const register = require('test-tools/lib/register')
register(registry, account, name, data) // returns a Promise
```

### deploy common contracts

Deploys the contracts listed below.

```js
const fixtures = require('test-tools/lib/fixtures')
fixtures.run(api) // returns a Promise
```

### ABIs & byte code for common contracts

These get downloaded from [`ethcore/contracts`](https://github.com/ethcore/contracts).

```js
// Registry.sol
const {abi, bin} = require('test-tools/lib/contracts/registry')

// EmailVerification.sol
const {abi, bin} = require('test-tools/lib/contracts/email-verification')

// SMSVerification.sol
const {abi, bin} = require('test-tools/lib/contracts/sms-verification')
```
