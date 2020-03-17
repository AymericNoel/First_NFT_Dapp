import React, { Component } from 'react'
import Web3 from 'web3'
import erc721_abi from './ERC721.json'
import addresse from './adresse_contract.json'
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';



class Token extends Component {  

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
      id_disp:'',
      ID:'',
      url:'',
      address:''
    }
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    Web3.givenProvider.enable()
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721)
    const add = await myContract.methods.ownerOf(`${this.state.ID}`).call()    
    this.setState({ address: add }) 
    const URL = await myContract.methods.tokenURI(`${this.state.ID}`).call()
    this.setState({ url: URL }) 
    console.log(URL)
    this.setState({ id_disp: this.state.ID, ID: null })
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {    
    e.preventDefault();
    this.loadBlockchainData()    
  }

  render() {
    return (
      <div className="container">
        <h1 style={{textAlign:"center"}}>Informations about a specific token</h1>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
            <FormLabel >The choosen Id :</FormLabel>
            <FormControl name="ID" value={this.state.ID === null ? '' : this.state.ID} type="number" placeholder="Enter the Id"  onChange={this.handleChange} />
            <br></br>
            <Button variant="primary" type="submit" >
                Send
            </Button>
          </Form>
        <br></br><br></br>
        <p>Address : {this.state.address}</p>
        <p>Id : {this.state.id_disp}</p>
        <br></br>
        <img src={this.state.url} height='300' width='300' alt=''></img>
      </div>
    );
  }
}

export default Token;