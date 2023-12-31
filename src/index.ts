import * as cron from "node-cron";
import cronstrue from "cronstrue";
import { dcaconfig } from './dcaconfig'
import { getPairData } from "./modules/api";
import { DEFAULT_TOKEN, connection} from "./constants";
import { Percent, TOKEN_PROGRAM_ID, Token, TokenAmount } from "@raydium-io/raydium-sdk";
import { getWalletTokenAccount } from "./modules/util";
import { PublicKey } from "@solana/web3.js";
import swapForDCA from "./modules/swapOnlyAmm";
import { wallet } from "../config";
 
const main = async () => {
  try {
    console.log("Starting RayDium DCA Bot");
 
    console.log("WARNING! BOT NEEDS  PROPER DCA CONFIGURATION IN THE dcaconfig.ts file in the src folder :"); 
    console.log("Validating dcaconfig.ts ...");
    const filteredJobs = dcaconfig.filter(job => {
      return (cron.validate(job.cron));
    });
 
    
    console.log("Scheduling swaps:");
    filteredJobs.map(job => {
      job.amounts.map(subjob =>{
         console.log(`If Mcap: ${subjob.mcap} Buy : ${subjob.amnt}  ${job.inputTokenName} for ${job.outputTokenName} ${cronstrue.toString(job.cron)}`);
       })
    });
    
    filteredJobs.forEach(job => { 
      return cron.schedule(job.cron, async () => { 
        console.log(' Fetching Token Data for '+ job.outputTokenName);
        const walletTokenAccounts = await getWalletTokenAccount(connection, wallet.publicKey)

        const tokenData  = await getPairData(job.outputToken);
        let isTokenBought = false;
        job.amounts.map(subjob =>{ 
          if(tokenData?.tokenMC <= subjob.mcap && !isTokenBought){
            console.log('Buy Token '+job.outputTokenName+' MC is '+ tokenData?.tokenMC+'  Below  '+ subjob.mcap);
            isTokenBought=true;

            const inputToken = DEFAULT_TOKEN.WSOL // USDC
            const slippage = new Percent(0, 100)
            console.log('Swapping from intoken to out token ')
          
             const outputToken = new Token(TOKEN_PROGRAM_ID, new PublicKey(tokenData?.tokenAddress), job.outputTokenDecimals, job.outputTokenName, tokenData?.tokenSymbol);
             const targetPool = tokenData?.pairAddress;
          
             const inputTokenAmount = new TokenAmount(inputToken, subjob.amnt* 1000000000);
             
             swapForDCA({
              outputToken,
              targetPool,
              inputTokenAmount,
              slippage,
              walletTokenAccounts,
              wallet: wallet,
            }).then(({ txids }) => {
              
              console.log('txids', txids)
            })
             
             
          } 
        })

      });
    });
  } catch (error) {
    console.log({ error });
  }
};

main();
