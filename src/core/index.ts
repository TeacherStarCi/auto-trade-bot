import { ethers } from "ethers"
import { routerAddress } from "../pancakeswap"
import { wbnbContract } from "../wbnb"
import { depositForWBNB, swapWBNBForToken } from "../swap";
import { provider, recipientAddress } from "../bsc-testnet";
import { getTokenContract } from "../pancakeswap/token";

const emptyFunction = () => {}
const sleep
  = async (ms: number) => {
    setTimeout(emptyFunction, ms)
  }

const showAssets = async (tokenAddress: string)=> {
 const tBNB = await provider.getBalance(recipientAddress)
 const WBNB = await wbnbContract.balanceOf(recipientAddress)
 const claimedToken = await getTokenContract(tokenAddress).balanceOf(recipientAddress)
 console.log( `
        =================
        Assets
        =================
        tBNB: ${tBNB}
        WBNB: ${WBNB}
        Claimed Token: ${claimedToken}
      
 `)
} 

export const start = async (amount: number, tokenAddress: string) => {
  while (true){
  const approveAmountIn = ethers.utils.parseUnits(amount.toString(), 'ether');
  const tx = await wbnbContract.approve(
    routerAddress,
     100
   )
   const receipt = await tx.wait()
   console.log('Transaction receipt')
   console.log(receipt)
  await depositForWBNB(amount)
  await swapWBNBForToken(tokenAddress, amount, recipientAddress)
  await showAssets(tokenAddress)
  await sleep(10*1000)
  }
}