# CLI Commands for Solana
This shows the CLI commands for setting solana node (deploy) & running the solana programs.

## Prerequisites
* [Installation](../README.md#installation)

## Commands
### Cluster (Node)
* Get config details of the cluster (connected to) via `$ solana config get`
```
Config File: /Users/abhi3700/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com 
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/abhi3700/.config/solana/id.json 
Commitment: confirmed 
```
* Set a URL for a cluster (connected to) via `$ solana config set --url localhost`
```
Config File: /Users/abhi3700/.config/solana/cli/config.yml
RPC URL: http://localhost:8899 
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/abhi3700/.config/solana/id.json 
Commitment: confirmed 
```
* Ensure local CLI version >= cluster's version
```console
$ solana --version
$ solana cluster-version
```

### Wallet
* Generate a new key pair for a contract via `$ solana-keygen new -o <path-to-idl-file-from-root>` e.g `$ solana-keygen new -o <target/deploy/crunchy_vs_smooth-keypair.json>`
* View your current local wallet address via `$ solana address`
* `$ solana-keygen pubkey <KEYPAIR>`: display wallet's address. It depends on the wallet type.
```console
$ solana-keygen pubkey /home/solana/my_Wallet.json
```


### Account
* View account details via `$ solana account <enter-address>`


### Compile Programs/Contracts
Install `rustc`, `cargo`, `rustfmt` (without Anchor). [Install with Anchor](../README.md#installation)
```
$ curl https://sh.rustup.rs -sSf | sh`
$ source $HOME/.cargo/env
$ rustup component add rustfmt 
```

`cargo`: Rust package manager
`rustc`: Rust compiler
`rustup`: Rust toolchain installer

For linux,
```console
$ sudo apt-get update
$ sudo apt-get install libssl-dev libudev-dev pkg-config zlib1g-dev llvm clang make
```

### Help
* `$ solana --help`: help for `solana`
* `$ solana <COMMAND> --help`: help for `solana` command(s)