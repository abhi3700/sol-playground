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
* Generate a new key pair for a program/contract
```
$ solana-keygen new -o <path-to-idl-file-from-root>

// e.g `$ solana-keygen new <target/deploy/crunchy_vs_smooth-keypair.json>`
``` 
* View your current active local wallet address via `$ solana address`
* `$ solana-keygen pubkey <KEYPAIR>`: display wallet's address. It depends on the wallet type.
```console
$ solana-keygen pubkey /home/solana/my_Wallet.json
```
* Generate a new key pair for account. `--force` is used if already a pubkey exist. And then view the new address via `$ solana address`
```
❯ solana-keygen new --force                                                                                                                                                        ⏎
Generating a new keypair

For added security, enter a BIP39 passphrase

NOTE! This passphrase improves security of the recovery seed phrase NOT the
keypair file itself, which is stored as insecure plain text

BIP39 Passphrase (empty for none): 
Enter same passphrase again: 

Wrote new keypair to /Users/abhi3700/.config/solana/id.json
===============================================================================
pubkey: 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6
===============================================================================
Save this seed phrase and your BIP39 passphrase to recover your new keypair:
parade there water toddler differ flat candy panel maximum crystal express slow
===============================================================================
```
* Generate a new program id: `--force` is used if already a program-id exist.
```
❯ solana-keygen new -o target/deploy/crunchy_vs_smooth-keypair.json --force
```
* Get path of the pubkey or keypair:
```
❯ solana config get keypair                                                                                                                                                        ⏎
Key Path: /Users/abhi3700/.config/solana/id.json
```

### Token
> Pre-requisites: The cluster (connected to) must be live & working.

* verify the address tokens being given to via `$ solana address`. If giving to some specific address, then `$ solana airdrop 5 <pubkey>`
* Airdrop 100 tokens: 

Successful airdrop

```
❯ solana airdrop 5
Requesting airdrop of 5 SOL

Signature: 5F5uBXZ8W6AQACudCkALgi2bqXAhE6HF9RrrUt1Fe5ieqzJeYjwnjV9xhTXz8tLy5NfSCb3L76Wv9X6wuoNL7pHA

9 SOL
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
* Get details of an account
```
❯ solana account 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6

Public Key: 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6
Balance: 2.69073484 SOL
Owner: 11111111111111111111111111111111
Executable: false
Rent Epoch: 226
```
* Get details of a program id/account
```
❯ solana account EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS

Public Key: EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS
Balance: 0.00114144 SOL
Owner: BPFLoaderUpgradeab1e11111111111111111111111
Executable: true
Rent Epoch: 226
Length: 36 (0x24) bytes
0000:   02 00 00 00  d2 e5 35 b6  f2 c0 64 a5  96 69 5b 4a   ......5...d..i[J
0010:   64 ef e7 db  d3 c9 d1 3c  be 52 1a b6  28 b5 d1 dc   d......<.R..(...
0020:   a3 d3 27 06                                          ..'.
```


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

### Deploy
* To new program-id
```
// M-1
$ anchor deploy --provider.cluster devnet

// M-2
$ solana program deploy target/deploy/counter.so
```
* Upgrade code to a program-id
```
// M-1
$ solana program deploy target/deploy/counter.so --program-id 8KFj2uwBQ3gtDX2xLcnm7SXgyzdyPNutnrZTsqoeDe6t

// M-2
$ anchor upgrade target/deploy/counter.so --provider.cluster devnet --program-id 8KFj2uwBQ3gtDX2xLcnm7SXgyzdyPNutnrZTsqoeDe6t
```

> `$ anchor deploy` for localnet

### Help
* `$ solana --help`: help for `solana`
* `$ solana <COMMAND> --help`: help for `solana` command(s)