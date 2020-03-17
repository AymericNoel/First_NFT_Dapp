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
        address :'',
        count :'',
        value: '',
    }
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.loadBlockchainData()
    this.setState({ value: null })
  }

  async loadBlockchainData() {
    this.setState({ address: this.state.value })
    const web3 = new Web3(Web3.givenProvider || "http://localhost:7545")
    Web3.givenProvider.enable()
    var myContract = new web3.eth.Contract(erc721_abi.abi, addresse.ERC721)
    const nombre = await myContract.methods.balanceOf(`${this.state.value}`).call()
    this.setState({ count: nombre })         
  }
  

  render() {
    return (
      <div className="container">
          <h1 style={{textAlign:"center"}}>Number Of Token Per User</h1>
          <br></br>
          <Form onSubmit={this.handleSubmit}>
            <FormLabel >The choosen address :</FormLabel>
            <FormControl id="address" name="value" value={this.state.value === null ? '' : this.state.value} type="text" placeholder="Enter the address"  onChange={this.handleChange} />
            <br></br>
            <Button variant="primary" type="submit" >
                Send
            </Button>
          </Form>
          <br></br><br></br>
          <p>Address : {this.state.address}</p>
          <p>Number of token : {this.state.count}</p>
          
      </div>
    );
  }
}

export default Token;