# Anchor
A testing framework for Solana programs

## Commands
* Init a project: `$ anchor init <project-name>` (by default Typescript)
* Init a project using JS: `$ anchor init <project-name> --javascript`
* Project directory:
```
app - Where our frontend code will go

programs - This is where the Rust code lives for the Solana program

test - Where the JavaScript tests for the program live

migrations - A basic deploy script
```

## Build
* Example:
```
❯ anchor build                                               
BPF SDK: /Users/abhi3700/.local/share/solana/install/releases/1.8.5/solana-release/bin/sdk/bpf
cargo-build-bpf child: rustup toolchain list -v
cargo-build-bpf child: cargo +bpf build --target bpfel-unknown-unknown --release
    Finished release [optimized] target(s) in 0.33s
cargo-build-bpf child: /Users/abhi3700/.local/share/solana/install/releases/1.8.5/solana-release/bin/sdk/bpf/dependencies/bpf-tools/llvm/bin/llvm-readelf --dyn-symbols /Users/abhi3700/F/coding/github_repos/crunchy-vs-smooth/target/deploy/crunchy_vs_smooth.so

To deploy this program:
  $ solana program deploy /Users/abhi3700/F/coding/github_repos/crunchy-vs-smooth/target/deploy/crunchy_vs_smooth.so
The program address will default to this keypair (override with --program-id):
  /Users/abhi3700/F/coding/github_repos/crunchy-vs-smooth/target/deploy/crunchy_vs_smooth-keypair.json
```
* After this, 
	- `target/` folder gets generated.
	- IDL is found at `target/idl/<project-name>.json`, which is similar to ABI in solidity and will be using them in a similar way in our JavaScript tests and frontends to communicate with our Solana program via RPC.
	- `program-id` also gets generated. View via 
		+ M-1: `$ solana address -k target/deploy/crunchy_vs_smooth-keypair.json`
		+ M-2: `$ solana-keygen pubkey target/deploy/crunchy_vs_smooth-keypair.json`
		
* Replace the `program-id` in 2 places:

#### 1. `./programs/<project-name>/src/lib.rs`

```
declare_id!("EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS");
```

#### 2. `./Anchor.toml`

```
[programs.localnet]
crunchy_vs_smooth = "EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS"

[programs.devnet]
crunchy_vs_smooth = "EGzbH5pZmHhm26PBtEYA57WsLUkGA2vqn8vhsREenfNS"
```

## Test

## Deploy
* To __devnet__: Get the output file location from `$ anchor build`
```
❯ solana program deploy /Users/abhi3700/F/coding/github_repos/crunchy-vs-smooth/target/deploy/crunchy_vs_smooth.so
Program Id: G36EspggVjxkDEKfHGXjsrHjt2sLPJa2hhomSNijzuTx
```

> NOTE: the wallet account must have token balance for deployment. If not created 


