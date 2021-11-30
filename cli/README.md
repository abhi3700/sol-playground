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

### Token
> Pre-requisites: The cluster (connected to) must be live & working.

* verify the address tokens being given to via `$ solana address`. If giving to some specific address, then `$ solana airdrop 5 <pubkey>`
* Airdrop 100 tokens: 

Successful airdrop

```
❯ solana airdrop 4                                                                                          
Requesting airdrop of 4 SOL

Signature: 5HuPVcRwQapBBQiRGiGm1kwJJKd8egHLbfkzW8EGdqBGHKX6gwe46aHmbTxm9N9Z9yFnfUANNszKwYCDrQwXgR45

4 SOL
```

Unsuccessful airdrop

```
❯ solana airdrop 6
Requesting airdrop of 6 SOL

Signature: 5ff5XVoYnyHAvGpfMsDrfdD6VBc8dTewDc7ArSa78GYXQmFaVgag5q7PyVX829LLcaRi5T8g5PtL6RJc13wW8yE7

Balance unchanged
Run `solana confirm -v 5ff5XVoYnyHAvGpfMsDrfdD6VBc8dTewDc7ArSa78GYXQmFaVgag5q7PyVX829LLcaRi5T8g5PtL6RJc13wW8yE7` for more info
```

### Transaction
* Get the status of transaction via `$ solana `
```
❯ solana confirm -v 5LJvzmbv3fUUHUEGcPedXgkSF4ysjFGZZEPX8RDg3XcvXbxKoAguJoSP3RHzWFFyL647JyTr3Dz5TN7ojiMzcsKe
RPC URL: https://api.devnet.solana.com
Default Signer Path: /Users/abhi3700/.config/solana/id.json
Commitment: confirmed

Transaction executed in slot 97784172:
  Block Time: 2021-11-30T23:34:38+05:30
  Recent Blockhash: AkJX1WedZNfEpJeyxJBRZTbsyGbnow2LJHExfdV9SinA
  Signature 0: 5LJvzmbv3fUUHUEGcPedXgkSF4ysjFGZZEPX8RDg3XcvXbxKoAguJoSP3RHzWFFyL647JyTr3Dz5TN7ojiMzcsKe
  Account 0: srw- 9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g (fee payer)
  Account 1: -r-x MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr
  Instruction 0
    Program:   MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr (1)
    Data: "request too large; req: ◎10, cap: ◎5"
  Status: Ok
    Fee: ◎0.000005
    Account 0 balance: ◎155772.641593511 -> ◎155772.641588511
    Account 1 balance: ◎0.52149888
  Log Messages:
    Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr invoke [1]
    Program log: Memo (len 40): "request too large; req: ◎10, cap: ◎5"
    Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr consumed 33081 of 200000 compute units
    Program MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr success

Finalized
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