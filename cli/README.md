# CLI Commands for Solana
This shows the CLI commands for setting solana node (deploy) & running the solana programs.

## Prerequisites
* [Installation](../README.md#installation)

## Commands
### Cluster
* Cluster: networks like mainnet, devnet, testnet, localnet.
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

> If getting the cluster's solana version, then run the localnet via `$ solana-test-validator` in one terminal & run `$ solana cluster-version` in another terminal.

* match with the `genesis-hash` of the network by running `$ solana genesis-hash`


### Wallet
#### Account
* Generate a new keypair (with a default dir: `~/.config/solana/id.json`)
```
// Use -f or --force
$ solana-keygen new -f
```
* Generate a new keypair with a custom location
```
$ solana-keygen new -o ~/.config/solana/id2.json
```
* Replace a new keypair with a custom location
```
$ solana-keygen new -o ~/.config/solana/id2.json -f
```
* View your default address. Here, the default path is set as `/Users/abhi3700/.config/solana/id.json`.
```
// M-1
$ solana address

// M-2
$ solana-keygen pubkey
```
* View account address from a custom wallet (stored other than default dir):
```
// M-1
$ solana address -k /Users/abhi3700/.config/solana/id2.json

// M-2
$ solana-keygen pubkey /Users/abhi3700/.config/solana/id2.json
```
* View private key in decoded (base-58) format:
```
❯ cat ./solanawallet.json
[48,231,161,248,233,119,70,246,86,82,71,126,72,190,181,231,195,121,143,71,25,128,161,178,199,187,254,11,146,96,171,3,108,114,29,216,101,19,93,51,118,136,39,169,132,234,242,15,133,109,58,134,180,16,10,78,228,91,33,156,252,70,94,107]
```
* View private key in encoded (base-58) format:
* Recover a pubkey from secret recovery phrase
```
❯ solana-keygen recover 'prompt://?key=0/0' -o ./solanawallet.json            ⏎
[recover] seed phrase: 
[recover] If this seed phrase has an associated passphrase, enter it now. Otherwise, press ENTER to continue: 
Recovered pubkey `8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc`. Continue? (y/n): y
Wrote recovered keypair to ./solanawallet.json

// Then, view the address
❯ solana-keygen pubkey ./solanawallet.json
8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc
```

#### Program
* Generate a new keypair for a program/contract
```
// path to idl file is either relative (w.r.t project root) or absolute
$ solana-keygen new -o <path-to-idl-file>

// e.g `$ solana-keygen new <target/deploy/crunchy_vs_smooth-keypair.json>`
``` 
* Generate a new program id: `--force` or `-f` is used if already a program-id exist.
```
❯ solana-keygen new -o target/deploy/crunchy_vs_smooth-keypair.json -f
```
* Get default path of the pubkey or keypair:
```
❯ solana config get keypair                                                                                                                                                        ⏎
Key Path: /Users/abhi3700/.config/solana/id.json
```
* View the default file storing the default private key. It looks like a serialized array.
```
❯ cat ~/.config/solana/id.json
[247,55,52,55,46,196,63,222,196,198,131,23,185,13,36,203,100,55,104,220,123,197,84,126,217,30,202,201,214,170,31,170,53,38,146,136,111,65,77,66,155,94,213,252,160,179,155,204,177,166,243,18,23,204,252,208,234,227,189,236,212,80,111,199]
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
```
$ anchor build
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