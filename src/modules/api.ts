import axios from "axios";

export const getPairData = async (address: any)=>{

    const url = `https://api.dexscreener.com/latest/dex/search?q=${address}`; 
    const result = await axios.get(url).then(res=>res).catch(err=>null);

    if(result && result.data && result.data.pairs){ 

         const resp = {
            tokenAddress : result.data.pairs[0]?.baseToken.address,
            tokenDecimals : result.data.pairs[0]?.baseToken.decimals,
            baseAddress : result.data.pairs[0]?.quoteToken.address,
            pairAddress : result.data.pairs[0]?.pairAddress, 
            tokenSymbol: result.data.pairs[0]?.baseToken.symbol,
            tokenName: result.data.pairs[0]?.baseToken.name,
            tokenAge: result.data.pairs[0]?.pairCreatedAt,
            tokenMC:result.data.pairs[0]?.fdv,
            liquidity:result.data.pairs[0]?.liquidity.quote,
            currPrice: result.data.pairs[0]?.priceUsd,
            chainId: result.data.pairs[0]?.chainId,
            dex: result.data.pairs[0]?.dexId, 
        }
  

        return resp;
    } else return null;
}

