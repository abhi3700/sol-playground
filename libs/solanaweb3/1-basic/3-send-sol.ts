import { Keypair, LAMPORTS_PER_SOL, sendAndConfirmTransaction, SystemProgram, Transaction } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import base58 from 'bs58';

import config from '../shared/config';
import { printLamports } from '../shared/utils';

const senderKeypair: Keypair = web3.Keypair.generate();
const transferAmount: number = 1;

(async () => {
	const connection = new web3.Connection(config.cluster, 'confirmed');
	const receiverKeypair = web3.Keypair.fromSecretKey(base58.decode(config.keypair));

	// Request airdrop, sign with signers PK
	console.log('requesting airdrop...');
	let airdropSignature = await connection.requestAirdrop(
		senderKeypair.publicKey,
		LAMPORTS_PER_SOL * 4 // airdrop 4 SOL
	);
	await connection.confirmTransaction(airdropSignature);

	// Sender details before transfer
	await connection.getBalance(senderKeypair.publicKey).then((balance) => {
		console.log(`Sender details before transfer: \n\t public key: ${senderKeypair.publicKey.toBase58()}, \n\t SOL balance: ${printLamports(balance)}`);
	});

	// Receiver details before transfer
	await connection.getBalance(receiverKeypair.publicKey).then((balance) => {
		console.log(`receiver details before transfer: \n\t public key: ${receiverKeypair.publicKey.toBase58()}, \n\t SOL balance: ${printLamports(balance)}`);
	});

	// Create the transaction (instruction array)
	const transaction = new Transaction().add(
		SystemProgram.transfer({
			fromPubkey: senderKeypair.publicKey,
			toPubkey: receiverKeypair.publicKey,
			lamports: (LAMPORTS_PER_SOL / 100) * transferAmount,
		})
	);

	// console.log("lamports per sol: ", LAMPORTS_PER_SOL);

	// Sign transaction, broadcast, and confirm
	const signature: string = await sendAndConfirmTransaction(
		connection, 
		transaction, 
		[senderKeypair]);

	console.log('tx signature:', signature);

	console.log("Sender balance after transfer: ", )
	console.log("Receiver balance after transfer: ", )

	// Sender details before transfer
	await connection.getBalance(senderKeypair.publicKey).then((balance) => {
		console.log(`Sender details after transfer: \n\t public key: ${senderKeypair.publicKey.toBase58()}, \n\t SOL balance: ${printLamports(balance)}`);
	});
	
	// Receiver details before transfer
	await connection.getBalance(receiverKeypair.publicKey).then((balance) => {
		console.log(`receiver details after transfer: \n\t public key: ${receiverKeypair.publicKey.toBase58()}, \n\t SOL balance: ${printLamports(balance)}`);
	});

})();
