use solana_program::sysvar::clock::Clock;

fn get_time() -> Result<u32> {
    let now: u32 = Clock::get().expect("clock").unix_timestamp as u32;
    Ok(now)
}
