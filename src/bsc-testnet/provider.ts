import { ethers } from 'ethers'

// the rpc url, from https://docs.bscscan.com/misc-tools-and-utilities/public-rpc-nodes
const rpcUrl = 'https://data-seed-prebsc-1-s1.binance.org:8545/'

// get the provider from above rpc url
export const provider = new ethers.providers.JsonRpcProvider(rpcUrl)






    

