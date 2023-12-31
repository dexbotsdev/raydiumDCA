import { DcaConfig } from "./constants";

 
export const dcaconfig: DcaConfig[] = [
    {
        inputToken: "So11111111111111111111111111111111111111112",
        inputTokenName:"SOL",
        outputToken: "GkidkAk5BeJLQQysVUvNUNU7nniG1vyPbUFiXTvJBX7M",
        outputTokenName:"SOLLY",
        inputTokenDecimals:9,
        outputTokenDecimals:6,
        amounts: [
            {
                mcap: 50000,
                amnt: 0.01
            },
            {
                mcap: 100000,
                amnt: 0.005
            },
            {
                mcap: 1000000,
                amnt: 0.001
            },

        ],
        slippage: 1, 
        cron: "* * * * *" // every minute
    }
];
