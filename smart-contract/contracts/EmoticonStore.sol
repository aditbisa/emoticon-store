// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EmoticonStore {
  address payable private storeOwner;

  uint32[] private emoticons;  // CodePoint[]
  mapping(uint32 => address) private buyers;  // CodePoint => Buyer

  event Purchase(uint codePoint, address buyer);

  constructor() {
    storeOwner = payable(msg.sender);
  }

  function purchase(uint32 codePoint) external payable {
    require(buyers[codePoint] == address(0), "Emoticon is sold");
    buyers[codePoint] = msg.sender;
    emoticons.push(codePoint);
    storeOwner.transfer(msg.value);
    emit Purchase(codePoint, msg.sender);
  }

  function getPurcashed() external view returns (uint32[] memory) {
    return emoticons;
  }

  function getBuyer(uint32 codePoint) external view returns (address) {
    return buyers[codePoint];
  }

  function getStoreOwner() external view returns (address) {
    return storeOwner;
  }
}
