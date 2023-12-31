import { DcaConfig } from "./constants";

 
export const dcaconfig: DcaConfig[] = [
    {
        inputToken: "So11111111111111111111111111111111111111112",
        inputTokenName:"SOL",
        outputToken: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        outputTokenName:"USDC",
        amounts: [
            {
                mcap: 10000,
                amnt: 1
            },
            {
                mcap: 100000,
                amnt: 0.5
            },
            {
                mcap: 1000000,
                amnt: 0.1
            },

        ],
        slippage: 1, 
        cron: "* * * * *" // every minute
    }
];
