import * as StellarSdk from "@stellar/stellar-sdk"

// Horizon (pagos normales)
const server = new StellarSdk.Horizon.Server("https://horizon-testnet.stellar.org")
export const networkPassphrase = StellarSdk.Networks.TESTNET

// Soroban RPC (smart contract)
const rpc = new StellarSdk.rpc.Server("https://soroban-testnet.stellar.org")
const CONTRACT_ID = "CBLNB5UA4EWR57RBKNJJBU4QFEXNLAYOZMELAHFIHJB4RKNDKTESVJN2"

export const USDC_ASSET = new StellarSdk.Asset(
  "USDC",
  "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5"
)

export async function getBalances(publicKey) {
  const account = await server.loadAccount(publicKey)
  return account.balances
}

export async function lockFunds(sourcePublicKey, amountUSDC) {
  const contract = new StellarSdk.Contract(CONTRACT_ID)
  const account = await rpc.getAccount(sourcePublicKey)

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(
      contract.call(
        "depositar",
        StellarSdk.nativeToScVal(Number(amountUSDC), { type: "u64" })
      )
    )
    .setTimeout(30)
    .build()

  const sim = await rpc.simulateTransaction(tx)
  if (StellarSdk.rpc.Api.isSimulationError(sim)) {
    throw new Error(sim.error)
  }

  return StellarSdk.rpc.assembleTransaction(tx, sim).build()
}

export async function enviarTransaccion(signedXdr) {
  const tx = StellarSdk.TransactionBuilder.fromXDR(signedXdr, networkPassphrase)
  const result = await server.submitTransaction(tx)
  return result.hash
}

export async function verBalanceContrato(publicKey) {
  const contract = new StellarSdk.Contract(CONTRACT_ID)
  const account = await rpc.getAccount(publicKey)

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(contract.call("ver_balance"))
    .setTimeout(30)
    .build()

  const sim = await rpc.simulateTransaction(tx)
  if (StellarSdk.rpc.Api.isSimulationError(sim)) {
    throw new Error(sim.error)
  }

  return StellarSdk.scValToNative(sim.result?.retval)
}

export async function verFechaRetiro(publicKey) {
  const contract = new StellarSdk.Contract(CONTRACT_ID)
  const account = await rpc.getAccount(publicKey)

  const tx = new StellarSdk.TransactionBuilder(account, {
    fee: StellarSdk.BASE_FEE,
    networkPassphrase,
  })
    .addOperation(contract.call("ver_retiro"))
    .setTimeout(30)
    .build()

  const sim = await rpc.simulateTransaction(tx)
  if (StellarSdk.rpc.Api.isSimulationError(sim)) {
    throw new Error(sim.error)
  }

  const timestamp = StellarSdk.scValToNative(sim.result?.retval)
  return new Date(Number(timestamp) * 1000).toLocaleDateString('es-MX', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}