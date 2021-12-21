# Solang

## About
* Solidity Compiler for Solana, Substrate, and ewasm.
* This TypeScript library, inspired by `Ethers.js`, can deploy and interact with Solidity contracts on Solana.
* Target versions for [Solana](https://solang.readthedocs.io/en/latest/targets.html#solana), [Substrate](https://solang.readthedocs.io/en/latest/targets.html#parity-substrate), [ewasm](https://solang.readthedocs.io/en/latest/targets.html#hyperledger-burrow-ewasm)
* Solang needs a build of llvm with some extra patches. These patches make it possible to generate code for Solana, and fixes some concurrency issues in the lld linker.
* Features:
	- Compile, load, and deploy Solidity contracts
	- Redeploy and reuse existing contract programs
	- Call contract functions to read and write data
	- Subscribe to contract events and program logs

## Installation

> For Mac M1

* Install LLVM from [here](https://solang.readthedocs.io/en/latest/installing.html#installing-llvm-on-mac)
* Install solang from __crates.io__ using `$ cargo install solang`.
