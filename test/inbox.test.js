const assert = require('assert'),
    ganache = require('ganache-cli'),
    Web3 = require('web3')

// connect to the local test network on our laptop
const web3 = new Web3(ganache.provider())
