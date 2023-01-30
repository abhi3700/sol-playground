// wrapper around standard
use anchor_lang::prelude::*;

// get the program-id after build via `$ solana address -k target/deploy/hello_solana-keypair.json` or `$ anchor keys list`
declare_id!("BTc32GfyocV5yZvSqvLvyefkLftyHfG92Sxao2KaLqiD");

#[program]
pub mod hello_solana {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, new_name: String) -> Result<()> {
        let my_data = &mut ctx.accounts.data;
        msg!("old: {}", my_data.name);
        my_data.name = (*new_name).to_string();

        msg!("new: {}", &new_name);

        msg!("The Program id: {}", crate::ID);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(init, payer = author, space= 8+4+200)]
    data: Account<'info, MyData>,
    #[account(mut)]
    author: Signer<'info>,
    system_program: Program<'info, System>,
}

#[account]
pub struct MyData {
    person: Pubkey,
    name: String,
}
