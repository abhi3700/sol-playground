import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { HelloSolana } from "../target/types/hello_solana";

describe("hello-solana", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.HelloSolana as Program<HelloSolana>;

  it("Is initialized!", async () => {
    // Add your test here.
    let new_name = "Hello, Solana!";
    const tx = await program.methods.initialize(new_name).rpc();
    console.log("Your transaction signature", tx);
  });
});
