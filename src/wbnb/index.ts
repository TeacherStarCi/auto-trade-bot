import { ethers } from 'ethers'
import { account } from '../bsc-testnet'
export const wbnb = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd'

export const wbnbContract = new ethers.Contract(
    wbnb,
    [
      'function approve(address spender, uint amount) public returns(bool)',
      'function deposit() public payable',
      'function balanceOf(address account) public view returns (uint256)'
    ],
    account
  )
  