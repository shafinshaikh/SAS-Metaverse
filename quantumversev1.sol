// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract QuantumVerse is ERC721, ERC721URIStorage, Ownable {
    uint256 private _nextTokenId;

    struct Building {
      string name;
      int8 w;
      int8 h;
      int8 d;
      int8 x;
      int8 y;
      int8 z;
    }

    Building[] public buildings;

    constructor(address initialOwner)
        ERC721("QuantumVerse", "QTM")
        Ownable(initialOwner)
    {
      buildings.push(Building("ZERO", 0,0,0,0,0,0));
      buildings.push(Building("HOUSE1", 1,3,2,2,0,3));
      buildings.push(Building("HOUSE2", 2,5,4,10,0,6));
      buildings.push(Building("HOUSE3", 1,6,2,10,0,0));
    }

    function getBuildings() public view returns (Building[] memory){
      return buildings;
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://ipfs.io/ipfs/QmcjvEzbQFzKbNcYSM4SNHdMZazKesgmaUnBoZUzdi5jVm";
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}