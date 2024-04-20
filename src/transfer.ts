import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import "dotenv/config";

const suppliedPublicKey = process.argv[2] || null;
if (!suppliedPublicKey) {
  console.log("supplied public key not provided");
  process.exit();
}

const senderKeypair = getKeypairFromEnvironment("SECRET_KEY");
const toPubkey = new PublicKey(suppliedPublicKey);
console.log("supplying to: ", toPubkey);

const conn = new Connection("https://api.devnet.solana.com", "confirmed");

const oldBalance = await conn.getBalance(toPubkey);
console.log(`${oldBalance} old balance of ${toPubkey}`);

const oldBalanceSender = await conn.getBalance(senderKeypair.publicKey);
console.log(`${oldBalanceSender} balance of ${senderKeypair.publicKey}`);

const transaction = new Transaction();
const LAMPORTS_TO_SEND = 10000;
const sendSolInstruction = SystemProgram.transfer({
  fromPubkey: senderKeypair.publicKey,
  toPubkey,
  lamports: LAMPORTS_TO_SEND,
});
transaction.add(sendSolInstruction);
const signature = await sendAndConfirmTransaction(conn, transaction, [
  senderKeypair,
]);
console.log(
  `💸 Finished! Sent ${LAMPORTS_TO_SEND} to the address ${toPubkey}. `
);
console.log(`transaction signature: ${signature}`);

const newBalance = await conn.getBalance(toPubkey);
console.log(`${newBalance} old balance of ${toPubkey}`);
