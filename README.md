![OSEANDAO](https://osean.online/theme-assets/images/bannerBridge.jpg)

## What is OSEAN DAO project
The first Multichain #RWA cryptocurrency, designed to invest in Yachting.
Launched on both BSC and ETH, the project aims to offer a low entry point into the yachting industry and generate revenue for the OSEAN DAO investors.

**LIVE Website:** [OSEAN WEBSITE](https://dapp.osean.online/dex) 

**OSEAN CONTRACTS:** [OSEAN CONTRACT REPO](https://github.com/chrisTyacht/oseandao-dev)

## Front end Sections

Our front end is built with Next JS and typescript. We are using Thirdweb hooks and pass all our on-chain calls through Thirdweb Provider wrap. 

### Swap
Our swap is connected directly to Pancakeswap and Uniswap routers using Thirdweb wallet connect and [Thirdweb](https://thirdweb.com) hooks. Chain selector is also available and you can switch to your favorite chain to trade $OSEAN from your favorite liquidity pool.

### Stake
OSEAN is using Thirdweb Staking contracts for ERC20 and ERC721. Staking contracts have been altered so only holders of our project can stake!

### Marketplace
### DAO
### Bridge

## Getting Started

- Clone this repository
- Install dependencies

```bash
yarn install
```

- Create .env and get your API keys from Thirdweb

## Dev enviroment

```bash
yarn dev
```

## Build

```bash
yarn build
```

## Production

```bash
yarn start
```
