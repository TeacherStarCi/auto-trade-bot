import { ethers } from 'ethers'
import { account } from '../bsc-testnet/account'
// bsc testnet pancake factory address
export const factoryAddress = '0x6725F303b657a9451d8BA641348b6761A6CC7a17'

export const factoryContract = new ethers.Contract(
    factoryAddress,
    ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'],
    account
  )