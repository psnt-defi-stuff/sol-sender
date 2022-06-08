//Imports: firebase functions are just serverless cloud functions
//to execute this node.js code. The web3.js library is for interacting
//with Solana, and bs58 is just used to convert the private key into
//the format the fromSecretKey function expects

const functions = require('firebase-functions');
const web3 =  require("@solana/web3.js");
const bs58 = require('bs58');

//This creates a Firebase async function and populates with with WALLET_PRIVATE_KEY
//and NODE_URL environment variables. Firebase provides a way to call this
//function using JavaScript on the frontend.

exports.sendSolanaTransaction = functions.runWith({ secrets: ["WALLET_PRIVATE_KEY", "NODE_URL"] }).https.onCall(async (solanaAddress, context) => {


//When you export a key from Phantom wallet (which is like Metamask for Solana)
//is is encoded using base 58. I just use the bs58 library to convert it to a
//Uint8Array array of bytes which is what web3.Keypair.fromSecretKey(bytes)
//expects. process.env.WALLET_PRIVATE_KEY is just an environment variable 
//storing the key so I don't commit my private key into a public Github LOL

const bytes = bs58.decode(process.env.WALLET_PRIVATE_KEY);

//This takes an array of bytes which represents the private key of the Solana
//wallet the funds come from. Be careful not to commit your private key once
//again

const from = web3.Keypair.fromSecretKey(bytes);

  //Connect to Solana cluster. process.env.NODE_URL environment variable
  //is just the endpoint my Solana cluster is hosted on. I am using
  //https://www.quicknode.com/ to host the cluster but you can use a
  //free public one: https://docs.solana.com/cluster/rpc-endpoints

  const connection = new web3.Connection(
    process.env.NODE_URL,
    'confirmed',
  );

  //The transfer function is used transfer SOL from one address
  //to another. fromPubkey is the wallet I own and toPubkey
  //is just the Solana address that the user enters into the
  //textbox on the frontend. lamports are just a small amount of
  //SOL so the math I do transfers exactly 0.069 SOL.
  const transaction = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: from.publicKey,
      toPubkey: new web3.PublicKey(solanaAddress),
      lamports: web3.LAMPORTS_PER_SOL/(1/0.069)
    }),
  );

  //Sign, send and confirm a transaction created above. The array
  //includes my wallet ("from" variable) as the signer of the
  //transaction. Because I have signed this message with my private
  //key I am allowed to send this transaction.
  await web3.sendAndConfirmTransaction(
      connection,
      transaction,
      [from],
    );
    
    //Please reach out to psntnick#4092 if you have questions!
});

