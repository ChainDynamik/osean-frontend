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
OSEAN is using Thirdweb Staking contracts for ERC20 and ERC721. Staking contracts have been altered so only holders of our project can stake.

### Marketplace
Our Front end is designed to support 2 ERC721 collections with collection switcher and a mint interface for both of them. 

### DAO
OSEAN DAO is apart of 2 contracts DAO contract based on Thirdweb vote and ERC721 Governance token based on Thirdweb's DropERC71. Vote contract has been altered to support swap interfaces for $OSEAN, $BNB and $USDT, so through voting DAO can swap our Treasury balance!

**What our DAO members can do:**

- Vote on Proposals
- Submit premade proposals
- Check DAO proposal Archive
- Decode proposals
- Check Treasury balance
- Delegate votes
- See current DAO member voting power

GOVERNANCE NFT TOKEN has been altered to support OpenZeppeling ERC721VotesUpgradeable extension. You can find more information and deploy our Governance NFT here:
[OSEAN GOVERNANCE NFT](https://thirdweb.com/0x4cAC359ab2A020CF212D82C1b66fC8abF81b1Dd0/OseanNFT)

### Bridge

Our Bridge will allow our members to transfer OSEAN from BSC to ETH and vice versa. Our bridge is based on [SOCKET](https://socket.tech) bridge. OSEAN dev has deployed necessary socket and vault contracts necessary to bridge $OSEAN token between the 2 chains.

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
