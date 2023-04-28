import { ethers } from "ethers"
import { routerAddress } from "../pancakeswap"
import { wbnbContract } from "../wbnb"
import { depositForWBNB, swapWBNBForToken } from "../swap";
import { provider, recipientAddress } from "../bsc-testnet";
import { getTokenContract } from "../pancakeswap/token";


/**
 * A function is to process a delay, the delay time bases on the parameter ms
 * @param ms number
 * @returns Promise\<void\>
 */
const sleep
  = async (ms: number): Promise<void> => {
    setTimeout(() => {}, ms)
  }

  /**
 * A function is to display the assets: tBNB, WBNB and the claimed token, ...
 * @param tokenAddress string
 * @returns Promise\<void\>
 */
const showAssets = async (tokenAddress: string)=> {
 // get tBNB amount from the provider BSC Testnet 
 const tBNB = await provider.getBalance(recipientAddress)
 // get WBNB amount from quering the WBNB Contract
 const WBNB = await wbnbContract.balanceOf(recipientAddress)
 // get claimed token amount from quering the Token Contract
 const claimedToken = await getTokenContract(tokenAddress).balanceOf(recipientAddress)
 // display the result
 console.log( `
        =================
        Assets
        =================
        tBNB: ${tBNB}
        WBNB: ${WBNB}
        Claimed Token: ${claimedToken}
      
 `)
} 

  /**
 * A function is to start the program
 * @param amount number
 * @param tokenAddress string
 * @returns Promise\<void\>
 */
export const start = async (amount: number, tokenAddress: string) => {
  // while true process infinite loop
  while (true){
  // convert the input amount to wei (10^18)
  const approveAmountIn = ethers.utils.parseUnits(amount.toString(), 'ether');
  // query the wbnb contract to get the approvement
  const tx = await wbnbContract.approve(
    routerAddress,
    approveAmountIn 
   )
  //  const receipt = await tx.wait()
  //  console.log('Transaction receipt')
  //  console.log(receipt)

  // call the deposit function, to convert tBNB to WBNB
  await depositForWBNB(amount)
    // call the swap function, to convert WBNB to the token
  await swapWBNBForToken(tokenAddress, amount, recipientAddress)
   // display the assets of the account
  await showAssets(tokenAddress)
   // wait 10s until next swap
  await sleep(10*1000)
  }
}