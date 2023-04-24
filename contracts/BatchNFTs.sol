// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721A.sol";
import "./Ownable.sol";
import "./Strings.sol";

contract BatchNFTs is Ownable, ERC721A {

  uint256 public constant MAX_SUPPLY = 100;
  uint256 public constant PRICE_PER_TOKEN = 0.01 ether;
  uint256 public immutable START_TIME = 1682346855; //todo check if UNIX time works
  bool public mintPaused = false; 
  string private _baseTokenURI;
  string public baseUri = "ipfs://[something].json";
  string public baseExtension = ".json";
  bool public revealed = false;
  string public notRevealedUri = "ipfs://[something].json";

  constructor() ERC721A("ERC721A Token", "721AT") {

  }

  function mint(address to, uint256 quantity) external payable {
    require(!mintPaused, "Mint is paused");
    require(block.timestamp >= START_TIME, "Sale not started");
    require(_totalMinted() + quantity <= MAX_SUPPLY, "Max Supply Hit");
    require(msg.value >= quantity * PRICE_PER_TOKEN, "Insufficient Funds");
    _mint(to, quantity);
  }

  function _baseURI() internal view override returns (string memory) {
    return _baseTokenURI;
  }

  function withdraw() external onlyOwner {
    (bool success, ) = msg.sender.call{value: address(this).balance}("");
    require(success, "Transfer Failed");
  }

  function setBaseURI(string calldata baseURI) external onlyOwner {
    _baseTokenURI = baseURI;
  }

  function pauseMint(bool _paused) external onlyOwner {
    require(!mintPaused, "Contract paused."); //by requiring the mint to not be paused, this prevents the function from working like a toggle? as in you wouldnt be able to un-pause it? see code below
    mintPaused = _paused;
  }
  /** 
   * this would allow both pausing and unpausing. have to write 'true' or 'false' to the contract this way
   * function pause(bool _state) public onlyOwner {
   *   mintPaused = _state;
   * }
   * 
   * if you want a pure toggle, this works
   * * function pause() public onlyOwner {
   *   mintPaused = !mintPaused;
   * }
  */

  function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );

        if (revealed == false) {
            return notRevealedUri;
        }

        string memory currentBaseURI = _baseURI();
        return
            bytes(currentBaseURI).length > 0
                ? string(
                    abi.encodePacked(
                        currentBaseURI,
                        tokenId.toString(), 
                        baseExtension
                    )
                )
                : "";
    }

    //only owner

    //to change metadata from hidden to actual metadata
    function reveal() public onlyOwner {
        revealed = true;
    }

    //optional if you want to be able to change price
    function setCost(uint256 _newCost) public onlyOwner {
        PRICE_PER_TOKEN = _newCost;
    }

    //same as above but for the hidden metadata. this one is deff not already included in the 721A
    function setNotRevealedURI(string memory _notRevealedURI) public onlyOwner {
        notRevealedUri = _notRevealedURI;
    }

    //if you don't want json at any point as the file type it can now be changed
    function setBaseExtension(
        string memory _newBaseExtension
    ) public onlyOwner {
        baseExtension = _newBaseExtension;
    }
}