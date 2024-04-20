import { getKeypairFromEnvironment } from "@solana-developers/helpers";
import borsh from "@project-serum/borsh";
import * as web3 from "@solana/web3.js";
import "dotenv/config";

const foodInstructionLayout = borsh.struct([
  borsh.u8("variant"),
  borsh.str("title"),
  borsh.str("description"),
  borsh.u8("rating"),
]);

const sendFoodTestReview = async (
  signer: web3.Keypair,
  programId: web3.PublicKey,
  connection: web3.Connection
) => {
  let buffer = Buffer.alloc(1000);
  const foodName = 'Paparazi Pizza';
  foodInstructionLayout.encode(
    {
      variant: 0,
      title: foodName,
      description: 'kya damiiii',
      rating: 4,
    },
    buffer
  );
  console.log(`foodInstructionLayout : ${foodInstructionLayout}`);

  buffer = buffer.slice(0, foodInstructionLayout.getSpan(buffer));
  console.log(`buffer: ${buffer}`);

  const [pda] = await web3.PublicKey.findProgramAddress(
    [signer.publicKey.toBuffer(), Buffer.from(foodName)],
    programId
  );
  console.log("PDA is:", pda.toBase58());

  const transaction = new web3.Transaction();
  const instruction = new web3.TransactionInstruction({
    programId,
    data: buffer,
    keys: [
      {
        pubkey: signer.publicKey,
        isSigner: true,
        isWritable: false,
      },
      {
        pubkey: pda,
        isSigner: false,
        isWritable: true,
      },
      {
        pubkey: web3.SystemProgram.programId,
        isSigner: false,
        isWritable: false,
      },
    ],
  });
  transaction.add(instruction);
  const txid = await web3.sendAndConfirmTransaction(connection, transaction, [
    signer,
  ]);
  console.log(`https://explorer.solana.com/tx/${txid}?cluster=devnet`);
};

async function main() {
  const payer = getKeypairFromEnvironment("SECRET_KEY");
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"));
  const programId = new web3.PublicKey(
    "GnSufddBLUPm63wcbdsifPPoyKges73VYtbgh1s4eJAY"
  );
  await sendFoodTestReview(payer, programId, connection);
}

main()
  .then(() => {
    console.log("Finished successfully");
  })
  .catch((error) => {
    console.error(error);
  });
