import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import * as web3 from "@solana/web3.js";
import "dotenv/config";

const programId = new web3.PublicKey(
  "BCWb3u9HZ6j2RRETiCdirc9ra51GzKX7ACGZGUvdVL3s"
);
const connection = new web3.Connection(web3.clusterApiUrl("devnet"));

async function main() {
  // const secret = JSON.parse(process.env.SECRET_KEY ?? "") as number[];
  // const secretKey = Uint8Array.from(secret);
  // const payer = web3.Keypair.fromSecretKey(secretKey);
  const payer = getKeypairFromEnvironment("SECRET_KEY")

  const txid = await sayHello(payer);
  console.log(
    `Transaction: https://explorer.solana.com/tx/${txid}?cluster=devnet`
  );
}

main()
  .then(() => {
    console.log("Finished successfully");
  })
  .catch((error) => {
    console.error(error);
  });

async function sayHello(
  payer: web3.Keypair
): Promise<web3.TransactionSignature> {
  const transaction = new web3.Transaction();
  const instruction = new web3.TransactionInstruction({
    keys: [],
    programId,
  });

  transaction.add(instruction);
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [payer]
  );
  return signature;
}
