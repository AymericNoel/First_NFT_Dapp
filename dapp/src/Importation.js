import React, { Component } from 'react'
import Web3 from 'web3'
import { Button, Form, FormLabel, FormControl } from 'react-bootstrap';


class Creation extends Component {  

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { 
        abi :'',
        address :'',
        owner:'',
        balance:'',
        id:null,
        owner_final:''
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
    var myContract = new web3.eth.Contract(JSON.parse(this.state.abi), `${this.state.address}`)
    if (this.state.id !=null)
    {
        const owners = await myContract.methods.ownerOf(this.state.id).call()
        this.setState({ owner_final: owners })  
        const ba = await myContract.methods.balanceOf(`${owners}`).call()
        this.setState({ balance: ba })
    }
    else{
        const ba = await myContract.methods.balanceOf(`${this.state.owner}`).call()
        this.setState({ balance: ba })
        this.setState({ owner_final: this.state.owner })  
    }
    this.setState({
        owner:null,
        id:null,
        abi:null,
        address:null
    })
    
  }
  

  render() {
    return (
      <div className="container">
          <h1 style={{textAlign:"center"}}>Import of a Token</h1>
          <br></br>
          <Form onSubmit={this.handleSubmit}>
            <FormLabel >The address of the contract :</FormLabel>
            <FormControl name="address" value={this.state.address === null ? '' : this.state.address} type="text" placeholder="Enter the address"  onChange={this.handleChange} required/>
            <br></br>
            <FormLabel >The abi of the contract :</FormLabel>
            <FormControl name="abi" value={this.state.abi === null ? '' : this.state.abi} as="textarea" placeholder="Enter the abi" rows="6" onChange={this.handleChange} required />
            <br></br>
            <FormLabel >The address of the one that you want to see the balance :</FormLabel>
            <FormControl name="owner" value={this.state.owner === null ? '' : this.state.owner} type="text" placeholder="Enter the address"  onChange={this.handleChange} />
            <br></br>
            <FormLabel >Or the id of the token that you want to see the owner :</FormLabel>
            <FormControl name="id" value={this.state.id === null ? '' : this.state.id} type="number" placeholder="Enter the id"  onChange={this.handleChange}  />
            
            <br></br>
            <br></br>
            <Button variant="primary" type="submit" >
                Send
            </Button>
            <br></br><br></br>
            <p>Balance of the account : {this.state.balance}</p>
            <p>Owner of the token : {this.state.owner_final} </p>
          </Form>
      </div>
    );
  }
}

export default Creation;