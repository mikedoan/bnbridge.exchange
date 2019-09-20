var Web3 = require('web3');
var config = require('./config')
var web3 = new Web3(new Web3.providers.HttpProvider(''));

const ADDRESS = ''
const PRIVATE_KEY = ''
const TO = ''
// const ERC20_CONTRACT = '0xD379255277e87E3636708A71F7A845A86f8c591d'
const ERC20_CONTRACT = '0x1Cc4610217cF242B1Fa2EC14541cca960cC554d3'

let consumerContract = new web3.eth.Contract(config.erc20ABI, ERC20_CONTRACT);

async function process() {

  const from = ADDRESS
  const privateKey = PRIVATE_KEY
  const to = TO
  const amount = '10000000000000000000'

  const myData = consumerContract.methods.transfer(to, amount).encodeABI();

  const tx = {
    from,
    to: ERC20_CONTRACT,
    value: '0',
    gasPrice: web3.utils.toWei('6', 'gwei'),
    gas: 2100000,
    chainId: 3,
    nonce: await web3.eth.getTransactionCount(from,'pending'),
    data: myData
  }

  const signed = await web3.eth.accounts.signTransaction(tx, privateKey)
  const rawTx = signed.rawTransaction

  const sendRawTx = rawTx =>
    new Promise((resolve, reject) =>
      web3.eth
        .sendSignedTransaction(rawTx)
        .on('transactionHash', resolve)
        .on('error', reject)
    )

  const result = await sendRawTx(rawTx)
  console.log(result)
}

process()
