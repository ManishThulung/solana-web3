import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

// to get the address from terminal => cmd = npx esrun check-balance.ts (some wallet address)
// const suppliedPublicKey = process.argv[2];
// if (!suppliedPublicKey) {
//   throw new Error("Provide a public key to check the balance of!");
// }

const address = new PublicKey("HfM9kBAJB7YYbT6WTbRVJYGYHp4TxknXTkG5Diq5rH9B")

const conn = new Connection("https://api.devnet.solana.com", "confirmed")

const balance = await conn.getBalance(address)

const balanceInSol = balance/LAMPORTS_PER_SOL

console.log(balance, "in lamports")

console.log(balanceInSol, "in sol")
