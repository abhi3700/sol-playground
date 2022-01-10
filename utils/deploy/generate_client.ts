/*
	SOURCE: https://project-serum.github.io/anchor/tutorials/tutorial-0.html#generating-a-client
*/

import * as fs from 'fs';

// Read the generated IDL.
// const idl = JSON.parse(require('fs').readFileSync('./target/idl/basic_0.json', 'utf8'));
const idl = JSON.parse(fs.readFileSync('./target/idl/basic_0.json', 'utf8'));

// Address of the deployed program.
const programId = new anchor.web3.PublicKey('<YOUR-PROGRAM-ID>');

// Generate the program client from IDL.
const program = new anchor.Program(idl, programId);

// Execute the RPC.
// NOTE: created the `initialize` method under the rpc namespace
await program.rpc.initialize();