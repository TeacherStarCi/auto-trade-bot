import { ethers } from 'ethers'
import { provider } from './provider'

const mnemonic = 'local grow arrest exchange solar dial holiday canal laptop dawn solid rural'

const wallet = ethers.Wallet.fromMnemonic(mnemonic)

export const account = wallet.connect(provider)

export const recipientAddress = account.address