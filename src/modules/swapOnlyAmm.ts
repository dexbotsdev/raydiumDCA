import assert from 'assert';

import {
  jsonInfo2PoolKeys,
  Liquidity,
  LiquidityPoolKeys,
  Percent,
  Token,
  TOKEN_PROGRAM_ID,
  TokenAmount,
} from '@raydium-io/raydium-sdk';
import { Keypair, PublicKey } from '@solana/web3.js';

 
import { formatAmmKeysById } from './formatAmmKeysById';
 import {
  buildAndSendTx,
  getWalletTokenAccount,
} from './util';
import { connection, makeTxVersion } from '../constants';

type WalletTokenAccounts = Awaited<ReturnType<typeof getWalletTokenAccount>>
type TestTxInputInfo = {
  outputToken: Token
  targetPool: string
  inputTokenAmount: TokenAmount
  slippage: Percent
  walletTokenAccounts: WalletTokenAccounts
  wallet: Keypair
}

 


const swapForDCA = async (input: TestTxInputInfo) =>{
  // -------- pre-action: get pool info --------
  const targetPoolInfo = await formatAmmKeysById(input.targetPool)
  assert(targetPoolInfo, 'cannot find the target pool')
  const poolKeys = jsonInfo2PoolKeys(targetPoolInfo) as LiquidityPoolKeys
  console.log('Swapping Liquidity  ')

  // -------- step 1: coumpute amount out --------
  const { amountOut,
    minAmountOut,
    currentPrice,
    executionPrice,
    priceImpact,
    fee } = Liquidity.computeAmountOut({
    poolKeys: poolKeys,
    poolInfo: await Liquidity.fetchInfo({ connection, poolKeys }),
    amountIn: input.inputTokenAmount,
    currencyOut: input.outputToken,
    slippage: input.slippage,
  })


  console.log('Swapping from SOL inputAmount '+ input.inputTokenAmount.toFixed())

  console.log('amountOut:', amountOut.toSignificant(), '  minAmountOut: ', minAmountOut.toSignificant())
  console.log('currentPrice:', currentPrice.invert().toFixed(), '  executionPrice: ', executionPrice?.invert().toSignificant())
  console.log('priceImpact:', priceImpact.toSignificant(), '  fee: ', fee.toSignificant()) 
  
  // -------- step 2: create instructions by SDK function --------
  const { innerTransactions } = await Liquidity.makeSwapInstructionSimple({
    connection,
    poolKeys,
    userKeys: {
      tokenAccounts: input.walletTokenAccounts,
      owner: input.wallet.publicKey,
    },
    amountIn: input.inputTokenAmount,
    amountOut: minAmountOut,
    fixedSide: 'in',
    makeTxVersion,
  })
   return { txids: await buildAndSendTx(innerTransactions) }
 
}
 

export default swapForDCA;