## Interview Questions
### Q1
* How to implement this Solidity snippet into Solana?
```c
struct Staking {
  bool status,
  uint256 startTimestamp,
  uint256 maturityTimestamp
}

// mapping(user => mapping(id => Staking))
mapping(address => mapping(uint256 => Staking)) userStaking;
```

### A1
* Implement each `Staking` struct into multiple PDA(s) for different users.
* In order to calculate PDA address, use this:
```rs
seeds = [b"staking", seedkey.as_ref(), user.as_ref(), id.to_string().as_bytes()],
```
where,

`seedkey` - is constant for the solana program which is used to create unique address.

* Hence, the final data structure looks like this:
```rs
// used for the function which is going to use this
#[derive(Accounts)]
#[instruction(seedkey: Pubkey, user: Pubkey, id: u64)]
pub struct userStaking {
	#[account(
	    init,
			seeds = [b"staking", seedkey.as_ref(), user.as_ref(), id.to_string().as_bytes()],
			...
			...
	)]
	pub user_staking: AccountLoader<'a, Staking>,
}

// For PDA
#[account(zero_copy)]
#[derive(Default)] 
pub struct Staking {
	pub status: bool,
	pub start_timestamp: u32,
	pub maturity_timestamp: u32
}
```



