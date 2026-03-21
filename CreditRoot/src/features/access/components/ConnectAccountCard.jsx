import { useState } from 'react'
import { conectarWallet } from '../../../lib/wallet'
import { getBalances } from '../../../lib/stellar'

export function ConnectAccountCard() {
  const [wallet, setWallet] = useState(null)
  const [balance, setBalance] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleConectar() {
    try {
      setLoading(true)
      setError(null)
      const address = await conectarWallet()
      setWallet(address)

      const balances = await getBalances(address)
      const xlm = balances.find(b => b.asset_type === 'native')
      const usdc = balances.find(b => b.asset_code === 'USDC')

      setBalance({
        xlm: xlm ? parseFloat(xlm.balance).toFixed(2) : '0',
        usdc: usdc ? parseFloat(usdc.balance).toFixed(2) : '0',
      })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* Header */}
      <div className="mb-4">
        <div className="badge rounded-pill px-3 py-2 mb-3"
          style={{ backgroundColor: wallet ? 'rgba(34,197,94,0.1)' : 'rgba(59,130,246,0.1)', color: wallet ? '#22c55e' : '#3b82f6', border: `1px solid ${wallet ? 'rgba(34,197,94,0.2)' : 'rgba(59,130,246,0.2)'}` }}>
          {wallet ? '✓ Wallet conectada' : '🔐 Conecta tu wallet'}
        </div>
        <h3 className="fw-bold mb-2" style={{ letterSpacing: '-1px' }}>Freighter · Stellar</h3>
        <p className="text-white-50 small mb-0">
          Conecta Freighter para acceder a tu ahorro voluntario en RetiroChain.
        </p>
      </div>

      {/* Botón */}
      <button
        className="btn btn-primary w-100 py-3 rounded-4 fw-bold mb-4"
        style={{ background: wallet ? 'rgba(34,197,94,0.15)' : 'linear-gradient(45deg, #2563eb, #3b82f6)', border: wallet ? '1px solid rgba(34,197,94,0.3)' : 'none', color: wallet ? '#22c55e' : '#fff' }}
        onClick={handleConectar}
        disabled={!!wallet || loading}
      >
        {loading ? (
          <span className="d-flex align-items-center justify-content-center gap-2">
            <span className="spinner-border spinner-border-sm" /> Conectando...
          </span>
        ) : wallet ? '✓ Wallet Conectada' : 'Conectar Freighter'}
      </button>

      {/* Error */}
      {error && (
        <div className="p-3 rounded-4 mb-4 small"
          style={{ backgroundColor: 'rgba(220,53,69,0.1)', border: '1px dashed rgba(220,53,69,0.4)', color: '#ff6b6b' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Panels */}
      <div className="row g-2">
        {[
          { label: 'Estado', val: wallet ? 'Conectada ✓' : 'Pendiente', color: wallet ? '#22c55e' : 'rgba(255,255,255,0.3)' },
          { label: 'Balance XLM', val: balance ? `${balance.xlm} XLM` : '—', color: '#fff' },
          { label: 'Balance USDC', val: balance ? `$${balance.usdc}` : '—', color: '#3b82f6' },
          { label: 'Dirección', val: wallet ? `${wallet.slice(0, 6)}...${wallet.slice(-6)}` : '—', color: 'rgba(255,255,255,0.5)', mono: true },
        ].map((item) => (
          <div className="col-6" key={item.label}>
            <div className="p-3 rounded-4 h-100"
              style={{ backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-white-50 small mb-1">{item.label}</div>
              <div className={`fw-bold small ${item.mono ? 'font-monospace' : ''}`}
                style={{ color: item.color }}>
                {item.val}
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}