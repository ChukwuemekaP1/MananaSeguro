import * as StellarSdk from "@stellar/stellar-sdk"

const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org")
export const networkPassphrase = StellarSdk.Networks.TESTNET

export const USDC_ASSET = new StellarSdk.Asset(
  "USDC",
  "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
)

export async function getBalances(publicKey) {
  const account = await server.loadAccount(publicKey)
  return account.balances
}

/*export async function lockFunds(sourcePublicKey, amountUSDC) {
  const account = await server.loadAccount(sourcePublicKey)

  return new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: sourcePublicKey, // ← se envía a sí mismo
        asset: USDC_ASSET,
        amount: amountUSDC.toString(),
      })
    )
    .addMemo(StellarSdk.Memo.text("RetiroChain:lock:30y"))
    .setTimeout(30)
    .build()
}*/
export async function lockFunds(sourcePublicKey, amountUSDC) {
  const account = await server.loadAccount(sourcePublicKey)

  return new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      StellarSdk.Operation.payment({
        destination: sourcePublicKey,
        asset: StellarSdk.Asset.native(),
        amount: amountUSDC.toString(),
      })
    )
    .addMemo(StellarSdk.Memo.text("RetiroChain:lock:30y"))
    .setTimeout(30)
    .build()
}

export async function enviarTransaccion(signedXdr) {
  const tx = StellarSdk.TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
  const result = await server.submitTransaction(tx)
  return result.hash
}