# sol-playground
A playground for writing, compiling, testing smart contracts on Solana chain(s): Mainnet, Testnet, Devnet.

## Installation
> The following is for Mac OS M1.

### `rustc`, `cargo`, `rustfmt`
* Install Rust i.e. `rustc`, `cargo`, `rustfmt`
```console
$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

This will download and install the official compiler for the Rust
programming language, and its package manager, Cargo.

Rustup metadata and toolchains will be installed into the Rustup
home directory, located at:

  /Users/abhi3700/.rustup

This can be modified with the RUSTUP_HOME environment variable.

The Cargo home directory located at:

  /Users/abhi3700/.cargo

This can be modified with the CARGO_HOME environment variable.

The cargo, rustc, rustup and other commands will be added to
Cargo's bin directory, located at:

  /Users/abhi3700/.cargo/bin

This path will then be added to your PATH environment variable by
modifying the profile files located at:

  /Users/abhi3700/.profile
  /Users/abhi3700/.zshenv

You can uninstall at any time with rustup self uninstall and
these changes will be reverted.
```

```console
❯ rustup component add rustfmt                                                ⏎
info: component 'rustfmt' for target 'aarch64-apple-darwin' is up to date
```

`cargo`: Rust package manager
`rustc`: Rust compiler
`rustup`: Rust toolchain installer

* Update: `$ rustup update stable`
* Uninstall Rust i.e. `rustc`, `cargo`, `rustfmt`
```
$ rustup self uninstall
```

### [Learn Solana concepts](https://github.com/abhi3700/My_Learning_Solana)

### Solana
This is for compiling solana contracts

> NOTE: Install the latest version of Solana CLI either by using `stable` or `version_no.` [source](https://docs.solana.com/cli/install-solana-cli-tools)

> Unless, Solana officially solves the `solana-test-validator` issue for M1 processors, refer Error-3 in "Troubleshooting" header below for installation from source.

* Run `$ sh -c "$(curl -sSfL https://release.solana.com/v1.8.5/install)"`
* Check `$ solana --version`
* Update `$ solana-install update`
* Uninstall `$ rm -rf /Users/abhi3700/.local/share/solana/`

> NOTE: `solana-test-validator` might have an issue related to M1 compatibility. Please follow Troubleshooting guide below for Error-3.

### NodesJS
This is for writing unit tests using Javascript or Typescript.

* Install NodeJS
* Check `$ node --version && npm --version`

### Anchor 
[Know more](./anchor)

This is similar to Hardhat (for Solidity contracts)

* Run `$ cargo install --git https://github.com/project-serum/anchor --tag v0.18.2 anchor-cli --locked`
* Check `$ anchor --version`

> Troubleshoot: Might be due to version related issue. So, update nodejs, solana to minimum version.

## [CLI](./cli)

## Getting started
* [Greeting contract](https://learn.figment.io/tutorials/deploy-solana-program)
	- About: It's a simple program, all it does is increment a number every time it's called.
	- Here, fetch the greeting account's `counter` attribute >> increment by 1 >> store it back >> log the stored value


## Coding
### Program
* the account variable can only be edited if the account's owner public key matches with the `program_id`
```rs
if (account.owner == program_id) {
	//the variable can be edited.
}
```
* to detect whether an address is a program, just check the account info (fetched from outside the SC) is not `NULL` or check if the `program_id` has `is_executable` as `true` (can be done from inside/outside the SC). 

### SC Security
* Owner check
* Owner signer
* Tool: `Soteria` [source](https://medium.com/coinmonks/soteria-a-vulnerability-scanner-for-solana-smart-contracts-cc202cf17c99)


## Troubleshoot
### 1. Error: Balance unchanged
* _Cause_: This is because of exceeding 5 tokens as airdrop.
* _Solution_: try <=5 tokens as airdrop `$ solana airdrop 5`

### 2. Error: Account 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6 has insufficient funds for spend (1.21953816 SOL) + fee (0.000885 SOL)
* _Cause_: This is because of insufficient fund in the program deployer account.
* _Solution_:Airdrop some tokens (a min. of `1.22042316 SOL`) `$ solana airdrop 5 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6` or `$ solana airdrop 5`

### 3. Error: [1]    19521 illegal hardware instruction  solana-test-validator
* _Cause_: This happens on Mac M1 processor
* _Solution_: Uninstall Solana, Rust & then install from scratch using the following steps shown [here](https://dev.to/nickgarfield/how-to-install-solana-dev-tools-on-an-m1-mac-kfn)
	1. Make sure that "Open using Rosetta" is disabled in the terminal
		- Open Finder & search for "Terminal"
		- Right click on "Terminal" App & click "Get info"
		- Ensure that the "Open using Rosetta" option is diabled.
	1. Uninstall Solana: `$ rm -rf /Users/abhi3700/.local/share/solana/`
	1. Uninstall Rust: `$ rustup self uninstall`
	1. Setup Rosetta: `$ /usr/sbin/softwareupdate --install-rosetta --agree-to-license`
		- Now, we will create duplicate copy of "Terminal" App (search in finder)
		- Name it as "Terminal Rosetta"
		- Make sure the "Open using Rosetta" option is enabled.
	1. Now, use "Terminal Rosetta" from hereon. [OPTIONAL] Make the background color to something else by clicking <kbd>cmd+i</kbd> on opened terminal to make it look different.
	1. Install Rust, Cargo: `$ curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`
	1. Install Homebrew using the x86 instruction set. Note the prefix used `arch -x86_64`: `$ arch -x86_64 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"`
	1. Also install OpenSSL in x86 instruction set, but get error like this: 
```
// install openssl inside intel processor
❯ arch -x86_64 brew install openssl@1.1
Error: Cannot install under Rosetta 2 in ARM default prefix (/opt/homebrew)!
To rerun under ARM use:
    arch -arm64 brew install ...
To install under x86_64, install Homebrew into /usr/local.
```
	Then tried doing under ARM and it was success.
	```
	$ arch -arm64 brew install openssl@1.1
	```

	1. Create a new file via `$ touch ~/.cargo/config` and copy paste this:
```
[target.x86_64-apple-darwin]
rustflags = [
  "-C", "link-arg=-undefined",
  "-C", "link-arg=dynamic_lookup",
]

[target.aarch64-apple-darwin]
rustflags = [
  "-C", "link-arg=-undefined",
  "-C", "link-arg=dynamic_lookup",
]
```
	1. [For UPDATE, start from this step] Now, clone solana from source via `$ git clone https://github.com/solana-labs/solana.git`. NOTE: Do it in the home directory & won't be deleted by mistake.
		- first download the `tar.gz` file from [here](https://github.com/solana-labs/solana/releases) into home directory i.e. `/Users/abhi3700/`
		- Then, extract the folder via `$ tar -xzvf <filename.tar.gz>` into home directory. While writing, it's `1.8.5 version`.
		- Now, get `solana-1.8.5` folder from `solana-1.8.5.tar.gz`. You can delete the `tar.gz` file.
		- More to the folder: `$ cd solana-1.8.5`
	1. Build
```
$ cargo build
```
	1. Install coreutils
```	
❯ arch -arm64 brew install coreutils
```
	1. Install script to generate binaries into `./bin` folder. (takes `1123 seconds`)
```
❯ ./scripts/cargo-install-all.sh .
```
	1. Add the binaries folder into the PATH.
```
// open .zprofile in ST editor
$ subl ~/.zprofile

// Add this line to EOL
export PATH="/Users/abhi3700/solana-1.8.5"/bin:"$PATH"

// activate command
$ source ~/.zprofile
```
> NOTE: For multiple versions just open `~/.zprofile` file & change the version via commenting the previous version. Also, make sure that the path exist. Hence, it looks like this:
```
# export PATH="/Users/abhi3700/solana-1.8.0"/bin:"$PATH"
# export PATH="/Users/abhi3700/solana-1.8.5"/bin:"$PATH"
export PATH="/Users/abhi3700/solana-1.9.4"/bin:"$PATH"
```

	1. Run the commands like `solana`, `solana-test-validator`. NOTE: all the blocks will be stored in `test-ledger/` [Better to delete after the localnet running is done]. To shutdown this, press <kbd>ctrl+c</kbd> and then restart from the stopped block.
```
❯ solana-test-validator                                                       ⏎
Ledger location: test-ledger
Log: test-ledger/validator.log
Identity: 3RvvwAbhmFDeF8n9SgMKKTyphDev3s9Gx6mefR65o19N
Genesis Hash: DrFFgvyNjJXgfRBgPDcTgQ7WmyFE2BkX1aRK5s8twrod
Version: 1.8.5
Shred Version: 62237
Gossip Address: 127.0.0.1:1024
TPU Address: 127.0.0.1:1027
JSON RPC URL: http://127.0.0.1:8899
⠄ 00:00:10 | Processed Slot: 19 | Confirmed Slot: 19 | Finalized Slot: 0 | Snaps
```
	1. Now, during Anchor `build` might occur an issue related to `bpf` folder does not exist as the `solana` has been installed from source. So, follow "Error-4" for doing the additional step of copying `sdk/bpf/` folder into `~/.cargo/bin/`.

### 4. Error: BPF SDK path does not exist: /Users/abhi3700/.cargo/bin/sdk/bpf: No such file or directory (os error 2)
* _Cause_: This happens during `$ anchor build`. This error occurs as the `solana` has been installed from source.
* _Solution_: Just copy `~/solana-1.8.5/bin/sdk` to here: `~/.cargo/bin/`. Note: there might be `sdk` shortcut. Just replace this with the `sdk` folder containing `bpf/`. Then it would build successfully.

## References
* [Solana Wiki, comparison to Ethereum](https://solana.wiki/zh-cn/docs/ethereum-comparison/)
* [Solana vs Ethereum account](https://solana.wiki/zh-cn/docs/ethereum-comparison/account/)
* [Solana internals Part 1: what are the native on-chain programs and why do they matter?](https://medium.com/coinmonks/solana-internals-part-1-what-are-the-native-on-chain-programs-and-why-do-they-matter-61c981483e86)
* [Get started with Anchor](https://project-serum.github.io/anchor/tutorials/tutorial-0.html)
* [Solana Tutorial | Solana for Developers](https://www.youtube.com/watch?v=qNIhClYDjR8)
* [Building SmartContracts With #Solana and #Rust](https://www.youtube.com/watch?v=gA7hFdq2h9Q)
* [The Complete Guide to Full Stack Solana Development with React, Anchor, Rust, and Phantom](https://dev.to/dabit3/the-complete-guide-to-full-stack-solana-development-with-react-anchor-rust-and-phantom-3291)
* [Learning How to Build on Solana](https://www.brianfriel.xyz/learning-how-to-build-on-solana/)
* [ok so what the fuck is the deal with solana anyway](https://2501babe.github.io/posts/solana101.html)
* [Solana Development Tutorial: Key Concepts](https://solongwallet.medium.com/solana-development-tutorial-key-concepts-62b6d9077bb9)
* [Solana Transactions in Depth](https://medium.com/@asmiller1989/solana-transactions-in-depth-1f7f7fe06ac2)
* Solana 101:
	- [Introduction](https://learn.figment.io/tutorials/solana-101)
	- [Setup the project](https://learn.figment.io/tutorials/setup-the-project)
	- [Connect to the Solana Devnet](https://learn.figment.io/tutorials/connect-to-devnet)
	- [Create a Keypair](https://learn.figment.io/tutorials/create-solana-keypair)
	- [Fund the account](https://learn.figment.io/tutorials/fund-solana-account)
	- [Check the account balance](https://learn.figment.io/tutorials/check-solana-account-balance)
	- [Transfer SOL tokens](https://learn.figment.io/tutorials/transfer-sol-tokens)
	- [Deploy a program](https://learn.figment.io/tutorials/deploy-solana-program)
	- [Create a Greeter account](https://learn.figment.io/tutorials/how-to-store-state)
	- [Get Greetings' count](https://learn.figment.io/tutorials/get-greetings)
	- [Send Greetings](https://learn.figment.io/tutorials/send-greetings)

### Security
* [From Ethereum smart contracts to Solana programs: two common security pitfalls and beyond](https://medium.com/coinmonks/from-ethereum-smart-contracts-to-solana-programs-two-common-security-pitfalls-and-beyond-ea5b919ade1c)
* [Solana Smart Contracts: Common Pitfalls and How to Avoid Them](https://blog.neodyme.io/posts/solana_common_pitfalls)
* [Soteria — A vulnerability scanner for Solana smart contracts](https://medium.com/coinmonks/soteria-a-vulnerability-scanner-for-solana-smart-contracts-cc202cf17c99)