import { ethers } from 'ethers'
import { provider } from './provider'

// Insert your mnemonic here
const mnemonic = 'local grow arrest exchange solar dial holiday canal laptop dawn solid rural'

// Get the wallet generated from the above mnemonic
const wallet = ethers.Wallet.fromMnemonic(mnemonic)

// Get the account corresponded to the given provider (BSC Testnet)
export const account = wallet.connect(provider)

// Get the address of the above account
export const recipientAddress = account.address