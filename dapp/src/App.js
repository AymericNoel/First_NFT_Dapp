import React, { Component } from 'react'
import Web3 from 'web3'
import erc721_abi from './ERC721.json'
import addresse from './adresse_contract.json'



class App extends Component {  

  constructor(props) {
    super(props)
    this.state = { 
      network :'',
      account: '' ,
      chain_id :0,
      last_block:0,
      counter_token:'',
      name_token:''

    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    Web3.givenProvider.enable()
    const network = await web3.eth.net.getNetworkType()
    // web3.eth.sendTransaction({from: '0x9d9fFD857c0B1908C961D2FB7E5a4fc5871FFCE1', to: '0x9d9fFD857c0B1908C961D2FB7E5a4fc5871FFCE1',value : web3.utils.toWei('0.1','ether')})
    this.setState({ network: network })
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const chainId = await web3.eth.getChainId()
    this.setState({ chain_id: chainId })
    const blockNum = await web3.eth.getBlockNumber()
    this.setState({ last_block: blockNum })    
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721);
    const nametoken = await myContract.methods.name().call()
    const countertoken = await myContract.methods.counter().call()
    this.setState({ name_token: nametoken })   
    this.setState({ counter_token: countertoken })   
  }
  

  componentWillMount() {
    this.loadBlockchainData()
  }

  render() {
    return (
      <div className="container">        
        <h1 style={{textAlign:"center"}}>TD07 !</h1><br></br>
        <p>Network : {this.state.network}</p>
        <p>Your account : {this.state.account}</p>
        <p>Chain Id : {this.state.chain_id}</p>
        <p>Last block number : {this.state.last_block}</p>
        <p>Token name : {this.state.name_token}</p>
        <p>Counter of token : {this.state.counter_token}</p>
      </div>
    );
  }
}

export default App;