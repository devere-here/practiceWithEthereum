const assert = require('assert'),
    ganache = require('ganache-cli'),
    Web3 = require('web3'),
    { bytecode } = require('../compile'),
    interFace = require('../compile').interface

// connect to the local test network on our laptop
const web3 = new Web3(ganache.provider())

let accounts, inbox

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // use one of those accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interFace)).deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        console.log('inbox', inbox)
    })
})

// web3 has a bunch of different modules
// to handle actions involving different cryptocurrencies. The eth module is for ethereum. (web3.eth)
// every web3 function is asyncronous so it'll return a promise

//  web3.eth.Contract is a constructor function that allows us to create and deploy new contracts

// interFace is a JSON representation of our javascript/contract interface

// .deploy tells web3 that we actually want to deploy a new contract
// takes in compiled bytecode of contract and the arguments that go 
// in the solidity constructor function

// .deploy doesn't actually deploy anything it just creates an
// object that can then be deployed to the network

// .send triggers the communicaiton btwn web3 and the network

// web3 can also be used to give us access to contracts that've been deployed to the network

// our inbox variable is now our javascript representation of our solidity contract
