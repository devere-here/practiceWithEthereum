pragma solidity ^0.4.17;

contract Lottery{
    address public manager;
    address[] public players;
    
    constructor () public {
        manager = msg.sender;
    }
    
    function enterLottery () public {
        players.push(msg.sender);
    }
    
    function pickWinner () private returns (address) {
        // dont believe i can generate random numbers in solidity
        
    }
    
}