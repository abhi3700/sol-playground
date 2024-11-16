decimals=6
mint_amount=2000000
amount=2000
name="Donut"
symbol="DONUT"
uri="https://donut.com"

echo "Creating token with metadata:"
echo "  • decimals: $decimals"
echo "  • name: $name"
echo "  • symbol: $symbol"
echo "  • uri: $uri"

owner=$(solana address -k ~/.config/solana/id.json)
echo "\nOwner:         $owner"

# Check if spl-token command is available
if ! command -v spl-token &> /dev/null; then
    echo "Error: spl-token command not found. Please ensure it is installed and in your PATH."
    exit 1
fi

# Owner considered as mint authority
mint_address=$(spl-token --program-id TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb create-token --enable-metadata --decimals $decimals | grep 'Creating token' | awk '{print $3}')

# Check if mint_address was successfully retrieved
if [ -z "$mint_address" ]; then
    echo "Error: Failed to retrieve mint address."
    exit 1
fi

echo "Token Mint:   $mint_address"

# Initialize token metadata
sig=$(spl-token initialize-metadata $mint_address $name $symbol $uri)

# Create an token account for the mint
token_account_address=$(spl-token create-account $mint_address | grep 'Creating account' | awk '{print $3}')

# Check if token_account_address was successfully retrieved
if [ -z "$token_account_address" ]; then
    echo "Error: Failed to retrieve account address."
    exit 1
fi

echo "Token Account:  $token_account_address\n"

echo "----------------------------------------------------------"
# Mint tokens to the token account
spl-token mint $mint_address $mint_amount
echo "----------------------------------------------------------"

# Fund Alice
alice_address=$(solana address -k ~/.config/solana/alice.json)
transfer_output=$(spl-token transfer --fund-recipient $mint_address $amount $alice_address --allow-unfunded-recipient)
alice_ata=$(echo "$transfer_output" | grep 'Recipient associated token account:' | awk '{print $5}')

echo "Alice:         $alice_address"
echo "Alice ATA:     $alice_ata"

# Fund Bob
bob_address=$(solana address -k ~/.config/solana/bob.json)
transfer_output=$(spl-token transfer --fund-recipient $mint_address $amount $bob_address --allow-unfunded-recipient)
bob_ata=$(echo "$transfer_output" | grep 'Recipient associated token account:' | awk '{print $5}')

echo "Bob:           $bob_address"
echo "Bob ATA:       $bob_ata"

token_balance=$(spl-token balance $mint_address)
alice_balance=$(spl-token balance --address $alice_ata)
bob_balance=$(spl-token balance --address $bob_ata)

echo "================"
echo "Balances:"
echo "  • Token: $token_balance"
echo "  • Alice: $alice_balance"
echo "  • Bob:   $bob_balance"

echo "\nDone! 🎉"