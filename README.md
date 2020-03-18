# Dapp based on Ethereum


## 1. *smart_contract* 

- We have an ERC721 Token from the OpenZeppelin Github.

- The smart contracts are quite simple, they're just here to test an implementation of dapp based on ethereum.

- The main contract is *Mycontract.sol*. It can mint token on the ERC721 contract.

- To mint a token, we have to send more than 0.1 ETH.

- The contracts are deployed on the **rinkeby Testnet**


## 2. *dapp*

- The dapp was created with create-react-app and the interactions with the blockchain was done with the Web3.js component.

- From this App, you can : 
    - Create a new token with a specific image associated
    - View all of the network information (*ChainId*, *LastBlockNumber*, *network*, *name of the token registry*, *total token number in the app*)
    - View information about a specific Token by its Id
    - Display the total number of token of a specific user
    - Give your reward back if you are the owner of the contract
    - Import any other ERC721 of the blockchain with its ABI and its address to show the balance of a user or owner of a token by its ID

- The docker image of the frontend on React is build.

**Contract Address : 0x898893dB8214EA0DE02B7Ee67Ca6f8Cc35689E6e**

**You can access the ABI on the directory smart_contract\build\contracts**

## The Dapp is accesible here : http://aymeric_dapp.surge.sh



