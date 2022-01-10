import * as anchor from '@project-serum/anchor';

// Read the deployed program from the workspace.
const program = anchor.workspace.Basic0;

// Execute the RPC.
await program.rpc.initialize();