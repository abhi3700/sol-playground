# CLI Commands for Solana

This shows the CLI commands for setting solana node (deploy) & running the solana programs.

## Prerequisites

- [Installation](../README.md#installation)

## Commands

### Cluster

- Get cluster version: `$ solana --version`

```bash
$ solana cluster-version
```

- Cluster: networks like mainnet, devnet, testnet, localnet.
- Get config details of the cluster (connected to) via `$ solana config get`

```console
Config File: /Users/abhi3700/.config/solana/cli/config.yml
RPC URL: https://api.mainnet-beta.solana.com
WebSocket URL: wss://api.mainnet-beta.solana.com/ (computed)
Keypair Path: /Users/abhi3700/.config/solana/id.json
Commitment: confirmed
```

- Set a URL for a cluster (connected to) via `$ solana config set --url localhost`

```console
Config File: /Users/abhi3700/.config/solana/cli/config.yml
RPC URL: http://localhost:8899
WebSocket URL: ws://localhost:8900/ (computed)
Keypair Path: /Users/abhi3700/.config/solana/id.json
Commitment: confirmed
```

> You can airdrop as many as you want after running `solana-test-validator` command.

- Ensure local CLI version >= cluster's version

```console
$ solana --version
$ solana cluster-version
```

> If getting the cluster's solana version, then run the localnet via `$ solana-test-validator` in one terminal & run `$ solana cluster-version` in another terminal.

- match with the `genesis-hash` of the network by running `$ solana genesis-hash`

---

**Localnet**:

- Run a localnet node with a custom ledger location

```console
$ solana-test-validator --ledger ~/solana-ledger
```

- Run a localnet node with resetting the ledger

```console
$ solana-test-validator --reset
```

### Wallet

#### Account

- Generate a new keypair (with a default dir: `~/.config/solana/id.json`)

```console
// Use -f or --force
$ solana-keygen new -f
```

- Generate a new keypair with a custom location

```console
$ solana-keygen new -o ~/.config/solana/id2.json
```

- Replace a new keypair with a custom location

```console
$ solana-keygen new -o ~/.config/solana/id2.json -f
```

- View your default address. Here, the default path is set as `/Users/abhi3700/.config/solana/id.json`.

```console
// M-1
$ solana address

// M-2
$ solana-keygen pubkey
```

- View account address from a custom wallet (stored other than default dir): `solana address -k <KEYPAIR-FILE-LOCATION>`

```console
// M-1
$ solana address -k /Users/abhi3700/.config/solana/id2.json

// M-2
$ solana-keygen pubkey /Users/abhi3700/.config/solana/id2.json
```

- View private key in decoded (base-58) format: Refer this [script](../utils/privkey.py)

```console
❯ cat ./solanawallet.json
[48,231,161,248,233,119,70,246,86,82,71,126,72,190,181,231,195,121,143,71,25,128,161,178,199,187,254,11,146,96,171,3,108,114,29,216,101,19,93,51,118,136,39,169,132,234,242,15,133,109,58,134,180,16,10,78,228,91,33,156,252,70,94,107]
```

- Recover a pubkey from secret recovery phrase

```console
❯ solana-keygen recover 'prompt://?key=0/0' -o ./solanawallet.json            ⏎
[recover] seed phrase:
[recover] If this seed phrase has an associated passphrase, enter it now. Otherwise, press ENTER to continue:
Recovered pubkey `8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc`. Continue? (y/n): y
Wrote recovered keypair to ./solanawallet.json

// Then, view the address
❯ solana-keygen pubkey ./solanawallet.json
8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc
```

- Verify a pubkey. To verify you hold the private key for a given address, use this:

```console
// Success
❯ solana-keygen verify 8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc ./solanawallet.json
Verification for public key: 8JKxV9WFUN828KsN2ka7ejHaNfxUMM5hdo7WuMGEtwMc: Success

// Failed
❯ solana-keygen verify FuG41uzhDe25939PQeMcvUHBAfjstnyEDu46bLmpJ7vW ./solanawallet.json
Verification for public key: FuG41uzhDe25939PQeMcvUHBAfjstnyEDu46bLmpJ7vW: Failed
```

#### Program

- Generate a new keypair for a program/contract

```
// path to idl file is either relative (w.r.t project root) or absolute
$ solana-keygen new -o <path-to-idl-file>

// e.g `$ solana-keygen new <target/deploy/crunchy_vs_smooth-keypair.json>`
```

- Generate a new program id: `--force` or `-f` is used if already a program-id exist.

```
❯ solana-keygen new -o target/deploy/crunchy_vs_smooth-keypair.json -f
```

- Get default path of the pubkey or keypair:

```
❯ solana config get keypair                                                                                                                                                        ⏎
Key Path: /Users/abhi3700/.config/solana/id.json
```

- View the default file storing the default private key. It looks like a serialized array.

```
❯ cat ~/.config/solana/id.json
[247,55,52,55,46,196,63,222,196,198,131,23,185,13,36,203,100,55,104,220,123,197,84,126,217,30,202,201,214,170,31,170,53,38,146,136,111,65,77,66,155,94,213,252,160,179,155,204,177,166,243,18,23,204,252,208,234,227,189,236,212,80,111,199]
```

### Transaction

- Get the status of transaction via `$ solana `

  ```console
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

- View account details via `$ solana account <enter-address>`
- Get balance of an account via `$ solana balance <enter-address>` or `solana balance`
  > No need to parse the default address, otherwise need to.
- Get details of an account

  ```console
  ❯ solana account 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6

  Public Key: 4aUirUHybwAmuEJPorfeWeWNk4nTgujAkPo2aodNvTv6
  Balance: 2.69073484 SOL
  Owner: 11111111111111111111111111111111
  Executable: false
  Rent Epoch: 226
  ```

- Get details of a program account

  ```console
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

- Get details of a deployed program

```console
$ solana program show EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS
```

### Compile Programs/Contracts

```console
$ anchor build
```

For the 1st time, it's going to download BPF lib into the `bin` folder of the installation path of solana like this:

```console
BPF SDK: /Users/abhi3700/solana-1.13.3/bin/sdk/bpf
⠙[====================>                   ] 112.00MiB/221.80MiB (21s)
```

### Deploy

- To new program-id

  ```console
  // M-1
  $ anchor deploy --provider.cluster devnet

  // M-2
  $ solana program deploy target/deploy/counter.so
  ```

- Upgrade code to a program-id

  ```console
  // M-1
  $ anchor upgrade target/deploy/counter.so --provider.cluster devnet --program-id 8KFj2uwBQ3gtDX2xLcnm7SXgyzdyPNutnrZTsqoeDe6t

  // M-2
  $ solana program deploy target/deploy/counter.so --program-id 8KFj2uwBQ3gtDX2xLcnm7SXgyzdyPNutnrZTsqoeDe6t
  ```

- `$ anchor deploy` for localnet

### Token

> Pre-requisites: The cluster (connected to) must be live & working.

#### SOL

- verify the address tokens being given to via `$ solana address`. If giving to some specific address, then `$ solana airdrop 5 <pubkey>`
- Airdrop 100 tokens to address imported from this default keypair: `~/.config/solana/id.json`:

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

- Airdrop SOL to an address

```

❯ solana airdrop 5 FuG41uzhDe25939PQeMcvUHBAfjstnyEDu46bLmpJ7vW ⏎
Requesting airdrop of 5 SOL

Signature: 2Lrey9dnX61CLR13aVtyogySWxPqv9uM9qwbwjMZZGsJ51bxCRZh1JJjnBbJ2WqN91NGWDHyTm9YwecY5cWaeKWs

5 SOL

```

- transfer SOL to a new account. Here, use `--allow-unfunded-recipient` flag for a new account with `0 SOL` as balance.

```

❯ solana balance 3QhqiUgvejFwhWL4of8EA9McqJdkiRAXDidy5fL72oEG ⏎
0 SOL

❯ solana transfer -k ~/.config/solana/id.json 3QhqiUgvejFwhWL4of8EA9McqJdkiRAXDidy5fL72oEG 10 --allow-unfunded-recipient

Signature: 4LcZtMdZZrHR2LEwpnfEUksf2PkHyiehGSnbiPj4oMpBUixbG8swv6W18cMSZxRuVy6MzsJ2wU7XpSi27KvmkftD

❯ solana balance 3QhqiUgvejFwhWL4of8EA9McqJdkiRAXDidy5fL72oEG
10 SOL

```

- transfer SOL with fee paid by some other account

```

// Here, amount deducted from 1st KEYPAIR (file containing the private key) and the 2nd KEYPAIR gives the transaction fee.
❯ solana transfer -k ~/.config/solana/id.json 3QhqiUgvejFwhWL4of8EA9McqJdkiRAXDidy5fL72oEG 10 --fee-payer ./localwallet.json ⏎

Signature: 13h2crDKamLYwk1ZhvAPx4cnzxrreBB7xH6DtkdTi7ERSWe3LWdNFh8H3NAQ335BRYG5iKxMo1WCLeAPodEvoww

```

#### New token

- Here, there is no token contract/program deployment. Each new token contract is to be created on top of system token contract/program.
- Each token has a unique identifier i.e. token address which has a mint account which is to be created via `$ spl-token create-account <token-address>`

- Create new token

```

❯ spl-token create-token ⏎
Creating token GrTH3dLtPoS47rbBcYLvva4GaxuB7yNoLJ1dSFDX7ZEg

Signature: 4aavRWA8uvYGNqBFQ8whLn6SU5rq9MZGGMXLqsUYKhTMoyF9uL5LeR3y8L2LFdngHoFQVJNnRbTM5RxT4W4h2B6v

```

Here, the token created has an address: `GrTH3dLtPoS47rbBcYLvva4GaxuB7yNoLJ1dSFDX7ZEg` with `0` supply.

- View supply of a token

```

❯ spl-token supply GrTH3dLtPoS47rbBcYLvva4GaxuB7yNoLJ1dSFDX7ZEg ⏎
0

```

- mint token to an account (token holder)

```

// create an token holder account
❯ spl-token create-account eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D
Creating account 95KKssRvBW9ZYSXcwUSWHEVZs972L1VZZAUf7YDnWxux

Signature: 5EjQvFZWtXAckmF7JbeJcGFHxyKJicdKA9zBVGwf611KAjY6yXJCyUSNuJ6G1oXHgPk2AaGRLW5ttknotDG3CAv5

❯ spl-token mint eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D 100
Minting 100 tokens
Token: eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D
Recipient: 95KKssRvBW9ZYSXcwUSWHEVZs972L1VZZAUf7YDnWxux

Signature: 4GpudHGQSfnUSuzdrD8PF2Yir8cg5s1dZpBG6zfV8gXmE3BZRhJkrMNQRCr5d6P8xBK56maRsK8EY4Nn1ah8osKG

```

- Get info of a token account w/o mint authority

```

// create token without mint authority
❯ spl-token create-account eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D
Creating account 95KKssRvBW9ZYSXcwUSWHEVZs972L1VZZAUf7YDnWxux

Signature: 5EjQvFZWtXAckmF7JbeJcGFHxyKJicdKA9zBVGwf611KAjY6yXJCyUSNuJ6G1oXHgPk2AaGRLW5ttknotDG3CAv5

// get token details
❯ solana account eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D

Public Key: eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D
Balance: 0.0014616 SOL
Owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Executable: false
Rent Epoch: 229
Length: 82 (0x52) bytes
0000: 01 00 00 00 dd 66 d6 a0 82 8e ee f7 0d b7 00 a8 .....f..........
0010: 14 4b 89 59 bc a6 9f 30 28 1b 35 b0 b9 49 f4 de .K.Y...0(.5..I..
0020: 9d 9e c3 cf 00 e8 76 48 17 00 00 00 09 01 00 00 ......vH........
0030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0050: 00 00 ..

```

- Get info of a token account w mint authority

```

// create token with mint authority
❯ spl-token create-token --mint-authority ./localwallet.json ⏎
Creating token FUFdozikSVi9obyZBdZrXiawAYjdxmxKtnCR2dS4Atmu

Signature: 65DABPbwFLkM9pLq1h4uwBYuUpJRKJxj1BuumJfKvAJ1qL5Nv9UbPAp6bLXfP2gjFdLxYSW2coP9dFK5KdVJfqDL

// get token details
❯ solana account FUFdozikSVi9obyZBdZrXiawAYjdxmxKtnCR2dS4Atmu ⏎

Public Key: FUFdozikSVi9obyZBdZrXiawAYjdxmxKtnCR2dS4Atmu
Balance: 0.0014616 SOL
Owner: TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA
Executable: false
Rent Epoch: 229
Length: 82 (0x52) bytes
0000: 01 00 00 00 23 c9 e9 09 87 83 75 49 22 62 b3 77 ....#.....uI"b.w
0010: 67 79 8a a0 aa 2c ff c8 57 75 08 2d e4 1b 98 27 gy...,..Wu.-...'
0020: 95 14 3e 61 00 00 00 00 00 00 00 00 09 01 00 00 ..>a............
0030: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0040: 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 ................
0050: 00 00 ..

```

> In both the cases, the token owner is `TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA`. The owner is the token program (a program account), which is responsible for creating new tokens, minting tokens, and transferring tokens.

- View all tokens (and its balance) that you own

```

❯ spl-token accounts ⏎
Token Balance

---

FUFdozikSVi9obyZBdZrXiawAYjdxmxKtnCR2dS4Atmu 0
eGFhiefGF3wXK79MjWVewfVnDnX9ohXffa3wsAXFi1D 100

```

### Help

- `$ solana --help`: help for `solana`
- `$ solana <COMMAND> --help`: help for `solana` command(s)

```

```
