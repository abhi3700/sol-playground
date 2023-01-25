// wrapper around standard
use anchor_lang::prelude::*;

// get the program-id after build via `$ solana address -k target/deploy/hello_solana-keypair.json`
declare_id!("BTc32GfyocV5yZvSqvLvyefkLftyHfG92Sxao2KaLqiD");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let b = true;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
