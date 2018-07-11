const path = require('path'),
    fs = require('fs'),
    solidityCompiler = require('solc')

const contractPath = path.resolve(__dirname, 'contracts', 'Inbox.sol'),
    contractSourceCode = fs.readFileSync(contractPath, 'utf8')


module.exports = solidityCompiler.compile(contractSourceCode, 1).contracts[':Inbox']
