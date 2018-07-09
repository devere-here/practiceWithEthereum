const HDWalletProvider = require('truffle-hdwallet-provider'),
    Web3 = require('web3'),
    { interface, bytecode } = require('./compile'),
    { phrase, apiKey } = require('./secrets')

const provider = new HDWalletProvider(phrase, apiKey)

const web3 = new Web3(provider)

const deploy = async () => {
    // mnemonic can be used to define many accounts to your profile
    const accounts = await web3.eth.getAccounts()
    console.log('attempting to deploy from account', accounts[0])

    const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: '0x' + bytecode, arguments: ['Hi, there!'] })
    .send({ gas: '1000000', from: accounts[0] })

    console.log('address of our deployed contract', result.options.address)

}

deploy()
