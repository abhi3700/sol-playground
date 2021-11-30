# sol-playground
A playground for writing, compiling, testing smart contracts on Solana chain(s): Mainnet, Testnet, Devnet.

## Installation
> The following is for Mac OS.

### Solana
This is for compiling solana contracts

> NOTE: Install the latest version of Solana CLI either by using `stable` or `version_no.` [source](https://docs.solana.com/cli/install-solana-cli-tools)

* Run `$ sh -c "$(curl -sSfL https://release.solana.com/v1.8.5/install)"`
* Check `$ solana --version`
* Update `$ solana-install update`

### NodesJS
This is for writing unit tests using Javascript or Typescript.

* Install NodeJS
* Check `$ node --version && npm --version`

### Anchor
This is similar to Hardhat (for Solidity contracts)

* Run `$ cargo install --git https://github.com/project-serum/anchor --tag v0.18.2 anchor-cli --locked`
* Check `$ anchor --version`


> Troubleshoot: Might be due to version related issue. So, update nodejs, solana to minimum version.

## [CLI](./cli)

## Getting Started

## Troubleshoot
### 1. Error: Balance unchanged
* _Cause_: This is because of exceeding 5 tokens as airdrop.
* _Solution_: try <=5 tokens as airdrop `$ solana airdrop 5`

