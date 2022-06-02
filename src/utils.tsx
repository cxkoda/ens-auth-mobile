import { ethers } from "ethers";

const ERC721Abi = [
  "function name() view returns (string)",
  "function balanceOf(address owner) view returns (uint256)",
];

// const provider = ethers.getDefaultProvider();

// Yes I know, I shouldn't leak it like this... But it's a throwaway account anyways.
// Let's see how long it takes until someone kills the fun :D
export const provider = new ethers.providers.InfuraProvider(
  "mainnet",
  "644a82f96aa445bd96e173960b7d0c31"
);

export function getERC721Contract(address: string) {
  return new ethers.Contract(address, ERC721Abi, provider);
}
