import bs58 from "bs58";
import 'dotenv/config'
import {
  ENDPOINT as _ENDPOINT,
  Currency,
  LOOKUP_TABLE_CACHE,
  MAINNET_PROGRAM_ID,
  RAYDIUM_MAINNET,
  Token,
  TOKEN_PROGRAM_ID,
  TxVersion,
} from '@raydium-io/raydium-sdk';
import { Connection, Keypair, PublicKey } from "@solana/web3.js";
require("dotenv").config()

export const SOLANA_RPC_ENDPOINT: string = process.env.RPC_ENDPOINT!;

// Wallets
 export const connection = new Connection('https://swift-mariele-fast-mainnet.helius-rpc.com/',{commitment:'confirmed'});
 
 export const PROGRAMIDS = MAINNET_PROGRAM_ID;
export const ENDPOINT = _ENDPOINT;

export const RAYDIUM_MAINNET_API = RAYDIUM_MAINNET;

export const makeTxVersion = TxVersion.V0; // LEGACY

export const addLookupTableInfo = LOOKUP_TABLE_CACHE // only mainnet. other = undefined

export const DEFAULT_TOKEN = {
  'SOL': new Currency(9, 'USDC', 'USDC'),
  'WSOL': new Token(TOKEN_PROGRAM_ID, new PublicKey('So11111111111111111111111111111111111111112'), 9, 'WSOL', 'WSOL'),
  'USDC': new Token(TOKEN_PROGRAM_ID, new PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'), 6, 'USDC', 'USDC')
}

export interface DcaConfig {
  name?: string;
  inputToken: string;
  inputTokenName: string;
  outputToken: string;
  outputTokenName: string;
  amounts: {
    mcap: number;
    amnt: number;
}[];
  slippage: number;
  cron: string;
}
