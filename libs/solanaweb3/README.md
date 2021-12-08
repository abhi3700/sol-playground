# Solana Web3 Examples

Various examples of how to use solana, inspired by [SecretJS-Templates](https://github.com/enigmampc/SecretJS-Templates).

## Getting Started
* Mention a cluster RPC url
	- M-1: mention in `.env` file & call as `config` in the scripts shown [here](./shared/config.ts)
	- M-2: Use `web3.clusterApiUrl('devnet')` like this:
```js
const connection = new web3.Connection(web3.clusterApiUrl('devnet'), 'confirmed');
```

* Connect to a node (say `devnet`)
```js
// the `.env` file contains the RPC url
const connection = new web3.Connection(config.cluster, 'confirmed');
```
* Get the cluster version
```js
const version = connection.getVersion();
console.log(`cluster version: ${version['solana-core']}`);
```
* Generate a random keypair
```js
const keypair = Keypair.generate();
```
* Get keypair from a secret key
```js
// parse the private/secret key inside
const keypair = Keypair.fromSecretKey(base58.decode(config.keypair));
```
* Get public key & private key
```js
const publicKey = keypair.publicKey.toBase58();

// M-1
const privateKey = base58.encode(keypair.secretKey);
// M-2
// here, the secret key is kept in array format, so to send it back to the client-side, we use JSON.stringify
const privateKey = JSON.stringify(Array.from(keypair.secretKey));
```
* Airdrop to an address
```js
// address parsed as string
const publicKey = new PublicKey(address);
const signature = await requestAirdrop(publicKey, LAMPORTS_PER_SOL);
await connection.confirmTransaction(signature);
```
* Get balance of an address
```js
// address parsed as string
const publicKey = new PublicKey(address);
// here, the unit is LAMPORTS
const balance = connection.getBalance(publicKey);
```
* transfer SOL from one account to another account - [script](./1-basic/3-send-sol.ts)
* get program info
```js
const publicKey = new PublicKey(programId);
const programInfo = await connection.getAccountInfo(publicKey);

// If none, then no account is linked to this address, meaning the program has not yet been deployed.
// else if account's executable property is true. If it is, then the specified account contains a loaded program.
```
* Create a greeter account by a program
```js
    const greetedPubkey = await PublicKey.createWithSeed(
      payer.publicKey,
      GREETING_SEED,
      programId,
    );

    const lamports = await connection.getMinimumBalanceForRentExemption(
      GREETING_SIZE,
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccountWithSeed({
        fromPubkey: payer.publicKey,
        basePubkey: payer.publicKey,
        seed: GREETING_SEED,
        newAccountPubkey: greetedPubkey,
        lamports,
        space: GREETING_SIZE,
        programId,
      }),
    );
    const hash = await sendAndConfirmTransaction(connection, transaction, [
      payer,
    ]);
```

## Installation and Setup

```bash
yarn install
```

You will also need to specify some environment variables in a `.env` file in the root of this project. An example can be found at `.env.example` - if you don't have a wallet yet you can create one on devnet and airdrop it by running:

```bash
yarn airdrop
```

Copy the _private key_ (also known as secret key in solana) and supply it as `SOLANA_PRIVATE_KEY` in `.env.example`.

## Running the Examples

Run the examples with `ts-node`.

```bash
npx ts-node examples/1-basic/1-airdrop.ts
```

Some shortcut scripts are set up if you prefer:
```bash
yarn 1-1
```
