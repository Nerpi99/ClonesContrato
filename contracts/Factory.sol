// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "./TokenERC20.sol";


contract Factory is Initializable, UUPSUpgradeable, OwnableUpgradeable  {
    // VARIABLES
    struct Token {
        address tokenAddress;
        string tokenName;
        string tokenSymbol;
        address owner;
        uint256 initialSupply;
        uint256 timeCreated;
        uint8 decimals;
    }
    address private implementation;
    mapping(address => Token[]) public clones;
    uint256 public fee;
    uint256 private refund;
    address[] private users;
    Token[] private allClones;
    address payable collector;
    // EVENTS
    event newToken(
        address indexed _tokenAddress,
        string _symbol,
        string _name,
        address indexed _owner,
        uint256 _initialSupply,
        uint8 _decimals
    );

    function initialize (address _implementation) initializer public{
        implementation = _implementation;
        fee = 9781055 gwei;
        __Ownable_init();
        collector = payable(owner());
    }

    //GETTERS
    function getUsers() public view  returns (address[] memory){
        return users;
    }

    function getAllClones() public view onlyOwner returns(Token[] memory ){
        return allClones;
    }

    function getImplementacion() public view  returns (address){
        return implementation;
    }

    function getCollector() public view  returns (address payable){
        return collector;
    }

    function getClones(address _address) public view returns (Token[] memory){
        return clones[_address];
    }

    function setCollector(address payable _collector) public onlyOwner {
        collector = _collector;
    }

    function changeImplementation(address _newContract) public onlyOwner {
        implementation = _newContract;
    }


    //function to clone an ERC20 token
    function clonar(
        string memory _name,
        string memory _symbol,
        uint256 _supply,
        uint8 _decimals
    ) external payable {
        // the value shouldn't bee minor than fee
        require(msg.value >= fee, "El valor deberia ser mayor a la tarifa");
        // Clone
        address clone = ClonesUpgradeable.clone(implementation);
        TokenERC20(clone).initialize(
            _name,
            _symbol,
            msg.sender,
            _supply,
            _decimals
        );
        allClones.push(Token(clone, _name, _symbol, msg.sender, _supply, block.timestamp, _decimals));
        // Emit the event 
        emit newToken(clone, _symbol, _name, msg.sender, _supply, _decimals);
        // Add the new token to clones array 
        clones[msg.sender].push(
            Token(clone, _name, _symbol, msg.sender, _supply, block.timestamp, _decimals)
        );
        // Add a new user 
        if (clones[msg.sender].length == 0){
            users.push(msg.sender);
        }
        // if the value is higher than fee, the contract refund the difference
        refund = msg.value - fee;
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
        }
        if (address(this).balance > 0) {
            collector.transfer(address(this).balance);
        }
    }

    function setFee(uint256 _newFee) public onlyOwner {
        fee = _newFee * (1 gwei);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        override
        onlyOwner
    {}
}