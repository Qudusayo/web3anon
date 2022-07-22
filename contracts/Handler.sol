//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./StringToLower.sol";
import "./UTF8StringLength.sol";

contract Handler is StringToLower, UTF8StringLength {
    // Mapping from Address to Username
    mapping(string => address) private addressByUsername;

    // Mapping from Username to Address
    mapping(address => string) private usernameByAddress;

    // Emits a User Createtion event
    event UserCreated(address indexed owner, string username);

    // Only Existing User modifier
    modifier _OnlyExistingUser(string memory _username) {
        require(
            addressByUsername[_toLower(_username)] !=
                0x0000000000000000000000000000000000000000,
            "User doesn't exist"
        );
        _;
    }

    // Get Address for a specific username
    function getAddressWithUsername(string memory _username)
        public
        view
        returns (address)
    {
        return addressByUsername[_toLower(_username)];
    }

    // Get Username for a specific address
    function getUsernameWithAddress(address _address)
        public
        view
        returns (string memory)
    {
        return usernameByAddress[_address];
    }

    // Register a new Username for a wallet
    function registerName(string memory _username) public payable {
        require(
            keccak256(abi.encodePacked(usernameByAddress[msg.sender])) ==
                keccak256(abi.encodePacked("")),
            "User alredy registered"
        );
        require(
            utfStringLength(_username) >= 3,
            "Username must be longer or equal 3 characters"
        );
        require(
            addressByUsername[_toLower(_username)] ==
                0x0000000000000000000000000000000000000000,
            "Username already exist"
        );

        usernameByAddress[msg.sender] = _toLower(_username);
        addressByUsername[_toLower(_username)] = msg.sender;

        emit UserCreated(msg.sender, _username);
    }
}
