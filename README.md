# Raydium DCA Bot
This bot runs a simple dollar cost averaging strategy to buy assets over a period of time. It utilizes Raydium DEX
 
## Install
```
yarn install
``` 
Note: the minimum interval is one minute.
## Run
```
yarn start
```
## Improvements
- transaction retries. Not great to fail on swaps that may occur once-a-week or biweekly.
- start and end dates.