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

### Anchor [Know more](./anchor)
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

### 2. Error: Account 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6 has insufficient funds for spend (1.21953816 SOL) + fee (0.000885 SOL)
* _Cause_: This is because of insufficient fund in the program deployer account.
* _Solution_:Airdrop some tokens (a min. of `1.22042316 SOL`) `$ solana airdrop 5 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6` or `$ solana airdrop 5`

## References
* [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
* [Learning How to Build on Solana](https://www.brianfriel.xyz/learning-how-to-build-on-solana/)
* [ok so what the fuck is the deal with solana anyway](https://2501babe.github.io/posts/solana101.html)