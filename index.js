//Name: Paul 
//Description: Generate public, private keys and get 
//balances

const {
    Connection,
    PublicKey,
    clusterApiUrl,
    Keypair,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js")

const wallet = new Keypair()

//Public key
const publicKey = new PublicKey(wallet._keypair.publicKey)
//Secret Key
const secretKey = wallet._keypair.secretKey

//Get Wallet Balance 
const getWalletBalance = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const walletBalance = await connection.getBalance(publicKey)
        console.log(`Wallet balance is ${walletBalance}`)
    } catch(err) {
        console.error(err)
    }
}

//Get some sol 
const airDropSol = async() => {
    try {
        const connection = new Connection(clusterApiUrl('devnet'), 'confirmed')
        const fromAirDropSignature = await connection.requestAirdrop(publicKey, 2 * LAMPORTS_PER_SOL)
        await connection.confirmTransaction(fromAirDropSignature)
    } catch(err) {
        console.log(err)
    }
}
const main = async() => {
    await getWalletBalance()
    await airDropSol()
    await getWalletBalance()
}
main()

