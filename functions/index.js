const functions = require('firebase-functions');
const admin = require('firebase-admin');
const web3 =  require("@solana/web3.js");
const bs58 = require('bs58');
admin.initializeApp();

// Saves a message to the Firebase Realtime Database but sanitizes the text by removing swearwords.
exports.sendSolanaTransaction = functions.runWith({ secrets: ["WALLET_PRIVATE_KEY", "NODE_URL"] }).https.onCall((data, context) => {
console.log("ready to dispatch tx");

const web3 =  require("@solana/web3.js");
const bs58 = require('bs58');


const bytes = bs58.decode(process.env.WALLET_PRIVATE_KEY);

// Generate a new random public key
const from = web3.Keypair.fromSecretKey(bytes);

(async () => {
  // Connect to cluster
  const connection = new web3.Connection(
    process.env.NODE_URL,
    'confirmed',
  );

  // Add transfer instruction to transaction
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: new web3.PublicKey("44XWdYHGVcYR1NEQzvpBtAWaccy4Cz3NTkULmyMFnWco"),
      lamports: web3.LAMPORTS_PER_SOL/100
    }),
  );


  // Sign transaction, broadcast, and confirm
  const signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [from],
  );
  console.log('SIGNATURE', signature);
})();








});

