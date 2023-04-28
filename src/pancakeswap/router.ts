import { ethers } from 'ethers'
import { account } from '../bsc-testnet/account'
// The pancake router contract address for the BSC Testnet
export const routerAddress = '0xD99D1c33F9fC3444f8101754aBC46c52416550D1'
// The pancake router contract for later quering, the abi is the PairCreated() function
export const routerContract = new ethers.Contract(
    routerAddress,
    [
      'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
      'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
  
    ],
    account
  )