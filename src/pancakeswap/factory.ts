import { ethers } from 'ethers'
import { account } from '../bsc-testnet/account'
// The pancake factory contract address for the BSC Testnet
export const factoryAddress = '0x6725F303b657a9451d8BA641348b6761A6CC7a17'
// The pancake factory contract for later quering, the abi is the PairCreated() function
export const factoryContract = new ethers.Contract(
    factoryAddress,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    account
  )