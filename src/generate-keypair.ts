import { Keypair } from "@solana/web3.js";
const keypair = Keypair.generate();
console.log(`The public key is: `, keypair.publicKey.toBase58());
// console.log(`The secret key is: `, keypair.secretKey.toLocaleString());
console.log(`The secret key is: `,  new TextDecoder().decode(keypair.secretKey));
console.log(`✅ Finished!`);

// getting from env
// import "dotenv/config"
// import { getKeypairFromEnvironment } from "@solana-developers/helpers";

// const keypair = getKeypairFromEnvironment("SECRET_KEY")
// console.log(keypair, "keypair")
// console.log("done");
