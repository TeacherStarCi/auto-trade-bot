import { ethers } from 'ethers'
import { account } from '../bsc-testnet'

export const getTokenContract = (tokenAddress: string) => new ethers.Contract(
    tokenAddress,
    [
      ' function balanceOf(address account) public view returns (uint256)'
    ],
    account
  )