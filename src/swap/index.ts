import { ethers } from 'ethers'
import { routerContract } from '../pancakeswap'
import { wbnb, wbnbContract } from '../wbnb'

export const depositForWBNB = async (amount: number) => {
  const amountIn = ethers.utils.parseUnits(amount.toString(), 'ether');
  const tx = await wbnbContract.deposit(
    { value: amountIn }
  )
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

export const swapWBNBForToken = async (tokenAddress: string, amount: number, recipientAddress: string) => {
  const tokenIn = wbnb
  const tokenOut = tokenAddress
  //We buy for 0.01 BNB of the new token
  //ethers was originally created for Ethereum, both also work for BSC
  //'ether' === 'bnb' on BSC
  const amountIn = ethers.utils.parseUnits(amount.toString(), 'ether');
  const amounts = await routerContract.getAmountsOut(amountIn, [tokenIn, tokenOut])
  //Our execution price will be a bit different, we need some flexbility
  const amountOutMin = amounts[1].sub(amounts[1].div(10));
  console.log(`
        =================
        Buying new token
        =================
        WBNB In: ${amountIn.toString()}
        Token Out: ${amountOutMin.toString()}
      `);
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