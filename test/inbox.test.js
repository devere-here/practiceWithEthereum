const assert = require('assert'),
    ganache = require('ganache-cli'),
    Web3 = require('web3'),
    { bytecode } = require('../compile'),
    interFace = require('../compile').interface

const provider = ganache.provider();
const web3 = new Web3(provider);

// connect to the local test network on our laptop
//const web3 = new Web3(ganache.provider())

let accounts, inbox

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // use one of those accounts to deploy the contract
    // sets Hi, there as the initial message of the contract
    inbox = await new web3.eth.Contract(JSON.parse(interFace)).deploy({ data: bytecode, arguments: ['Hi there!'] })
    .send({ from: accounts[0], gas: '1000000' })

    inbox.setProvider(provider);
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        //console.log('inbox', inbox)
        // address prop will contain address of whereever tis contract was deployed to
        // assert ok if checkoing if the value we passed in exists
        assert.ok(inbox.options.address)

    })

    it('has a default massage', async () => {
        // inbox is an instance of our contract that exists on the blockchain
        // has a property called methods which contains project's public methods
        // we are calling the message method in our contract.
        // the set of parentheses after our message is for any arguments our function might require
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hi there!')
    })

    it('can change the message', async () => {
        // send actual sends this function to the network
        await inbox.methods.setMessage('Did it change?').send({ from: accounts[0] })
        const message = await inbox.methods.message().call()

        assert.equal(message, 'Did it change?')
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
