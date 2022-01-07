import * as web3 from '@solana/web3.js';
// Address: 9vpsmXhZYMpvhCKiVoX5U8b1iKpfwJaFpPEEXF7hRm9N
const DEMO_FROM_SECRET_KEY = new Uint8Array([
    37, 21, 197, 185, 105, 201, 212, 148, 164, 108, 251, 159, 174, 252, 43, 246,
    225, 156, 38, 203, 99, 42, 244, 73, 252, 143, 34, 239, 15, 222, 217, 91, 132,
    167, 105, 60, 17, 211, 120, 243, 197, 99, 113, 34, 76, 127, 190, 18, 91, 246,
    121, 93, 189, 55, 165, 129, 196, 104, 25, 157, 209, 168, 165, 149,
]);

// Construct a `Keypair` from secret key
const from: web3.Keypair = web3.Keypair.fromSecretKey(DEMO_FROM_SECRET_KEY);