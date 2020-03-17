import React, { Component } from 'react'
import Web3 from 'web3'
import erc721_abi from './ERC721.json'
import addresse from './adresse_contract.json'
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';


class Creation extends Component {  

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
        values :'',
        url :'',
        id : '',
        url_link:''
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    Web3.givenProvider.enable()
    const accounts = await web3.eth.getAccounts()
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721);
    // const nombre = await myContract.methods.mintToken('').send({from: "0x9d9fFD857c0B1908C961D2FB7E5a4fc5871FFCE1",  value : web3.utils.toWei(`${this.state.values}`,'ether') })
    const nombre = await myContract.methods.mintToken(`${this.state.url}`).send({from : `${accounts[0]}`, value : web3.utils.toWei(`${this.state.values}`,'ether') });
    this.setState({id: nombre.events.Transfer.returnValues.tokenId})    
    this.setState({ values: '',url_link: this.state.url ,url :'' })
  }
  async getBack(){
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    Web3.givenProvider.enable()
    const accounts = await web3.eth.getAccounts()
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721)
    const test= await myContract.methods.receiveEther().send({from : accounts[0]})
    console.log('ici', test)
  }
  

  render() {
    return (
      <div className="container">
          <h1 style={{textAlign:"center"}}>creation of a Token</h1>
          <br></br>
          <Form onSubmit={this.handleSubmit}>
            <FormLabel >The value that you want to send (minimum 0.1 Ether) :</FormLabel>
            <FormControl name="values" value={this.state.values === null ? '' : this.state.values} type="number" placeholder="Enter the value"  onChange={this.handleChange} />
            <br></br>
            <FormLabel >The url to the chosen picture :</FormLabel>
            <FormControl name="url" value={this.state.url === null ? '' : this.state.url} type="url" placeholder="Enter the url"  onChange={this.handleChange} />
            <br></br>
            <br></br>
            <Button variant="primary" type="submit" >
                Send
            </Button>
            <br></br><br></br>
            <p>Id of the created token : {this.state.id}</p>
            <img src={this.state.url_link} height='300' width='300' alt=''></img>
            <h3 style={{marginTop : '4em' }}>If you are the creator of the contract and you want to get your rewards, click here >> <Button onClick={this.getBack}>Give Back</Button> </h3>

          </Form>
      </div>
    );
  }
}

export default Creation;