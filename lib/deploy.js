'use strict'
// originally taken from ethcore/lookup

const deploy = (api, abi, bytecode, values = []) => {
  return api.eth
    .accounts()
    .then((accounts) => {
      const account = accounts[0]

      const contract = api.newContract(abi)
      const options = {
        from: account,
        data: bytecode
      }

      return contract
        .deployEstimateGas(options, values)
        .then(([gasEst, gas]) => {
          options.gas = gas.toFixed(0)

          const _options = contract._encodeOptions(contract.constructors[0], options, values)
          return api.eth.sendTransaction(_options)
        })
    })
    .then((txhash) => api.eth.getTransactionReceipt(txhash))
    .then((info) => info.contractAddress)
}

module.exports = deploy
