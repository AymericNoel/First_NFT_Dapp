pragma solidity ^0.6.0;
import "./ERC721Metadata.sol";

contract MyContract is ERC721Metadata{

    uint256 private _id=1;
    address payable private _owner;
    address private myContract = address(this);

    constructor()public{
        _owner = msg.sender;
    }

    modifier OnlyOwner(){
        require(msg.sender == _owner, "Must be the owner of the contract");
        _;
    }

    function mintToken(string memory data) public payable {
        require(msg.value >= 0.1 ether, "The transaction must exceed 0.1 ether");
        _mint(msg.sender, _id);
        _setTokenURI(_id, data);
        _id += 1;
    }

    function receiveEther() public payable OnlyOwner(){
        _owner.transfer(myContract.balance);
    }

}