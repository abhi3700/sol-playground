import * as web3 from "@solana/web3.js";

// Generate a new random public key
const keypair: web3.Keypair = web3.Keypair.generate();

// get the private key in Uint8Array
const privkey = keypair.secretKey;
/*
-->
[80,32,160,248,1,144,47,54,69,71,225,143,204,222,88,242,231,177,210,195,81,237,133,63,24,52,36,114,20,58,110,57,140,212,214,252,91,145,234,255,238,3,213,131,39,17,166,55,60,203,79,227,111,9,188,59,5,54,140,20,253,246,199,116]
*/

// get the private key in `base58` string from `Uint8Array`
const privkeyStr = bs58.encode(keypair.secretKey);
