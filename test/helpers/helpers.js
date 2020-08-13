const { expect } = require('chai')
const { BN } = require('../setup')

// strips leading "0x" if present
function strip0x(input) {
  return input.replace(/^0x/, '')
}

const getEvents = (truffleInstance, filter, fromBlock = 0, toBlock = 'latest') =>
  truffleInstance.contract.getPastEvents(filter.event, { fromBlock, toBlock })

function ether(n) {
  return new BN(web3.utils.toWei(n, 'ether'))
}

function expectEventInLogs(logs, eventName, eventArgs = {}) {
  const events = logs.filter(e => e.event === eventName)
  expect(events.length > 0).to.equal(true, `There is no '${eventName}'`)

  const exception = []
  const event = events.find(e => {
    for (const [k, v] of Object.entries(eventArgs)) {
      try {
        contains(e.args, k, v)
      } catch (error) {
        exception.push(error)
        return false
      }
    }
    return true
  })

  if (event === undefined) {
    throw exception[0]
  }

  return event
}

function contains(args, key, value) {
  expect(key in args).to.equal(true, `Unknown event argument '${key}'`)

  if (value === null) {
    expect(args[key]).to.equal(null)
  } else if (isBN(args[key])) {
    expect(args[key]).to.be.bignumber.equal(value)
  } else {
    expect(args[key]).to.be.equal(value)
  }
}

function isBN(object) {
  return BN.isBN(object) || object instanceof BN
}

module.exports = {
  strip0x,
  getEvents,
  ether,
  expectEventInLogs
}
