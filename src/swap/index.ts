import { ethers } from 'ethers'
import { routerContract } from '../pancakeswap'
import { wbnb, wbnbContract } from '../wbnb'
/**
 * A function is to deposit for WBNB
 * @param amount number 
 * @returns Promise\<void\>
 */
export const depositForWBNB = async (amount: number) => {
  // change the amount input to wei (10^18)
  const amountIn = ethers.utils.parseUnits(amount.toString(), 'ether');
  // call the deposit function of the WBNB contract
  const tx = await wbnbContract.deposit(
    { value: amountIn }
  )
  // console log the result
  console.log(`
        =================
        Depositing for WBNB
        =================
        tBNB In: ${amountIn.toString()} 
        WBNB Out: ${amountIn.toString()} 
      `);
  //    const receipt = await tx.wait()
  // console.log('Transaction receipt')
  //console.log(receipt)
}
/**
 * A function is to swap WBNB for Token
 * @param tokenAddress string
 * @param amount number
 * @param recipientAddress string
 * @returns Promise\<void\>
 */
export const swapWBNBForToken = async (tokenAddress: string, amount: number, recipientAddress: string) => {
  // define the tokenIn is WBNB , the tokenOut is the parameter token
  const tokenIn = wbnb
  const tokenOut = tokenAddress


  //ethers was originally created for Ethereum, both also work for BSC
  //'ether' === 'bnb' on BSC

  //format the amount in in wei (10^18)
  const amountIn = ethers.utils.parseUnits(amount.toString(), 'ether');

  // get the amounts by calling the getAmoutsOut() function of the router contract 
  const amounts = await routerContract.getAmountsOut(amountIn, [tokenIn, tokenOut])

  // get the amount out minimun
  const amountOutMin = amounts[1].sub(amounts[1].div(10));
  console.log(`
        =================
        Buying new token
        =================
        WBNB In: ${amountIn.toString()}
        Token Out: ${amountOutMin.toString()}
      `);
     
  // call the swap function of the router contract
  const tx = await routerContract.swapExactTokensForTokens(
    amountIn,
    amountOutMin,
    [tokenIn, tokenOut],
    recipientAddress,
    Date.now() + 1000 * 60 * 10 //10 minutes
  )
  // const receipt = await tx.wait()
  //console.log('Transaction receipt')
  // console.log(receipt)
}