import { useEffect, useState } from 'react'
import { getBalances } from '../../../lib/stellar'
import freighterApi from '@stellar/freighter-api'

export function RetirementSnapshot() {
  const [balances, setBalances] = useState(null)
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function cargarDatos() {
      try {
        const { address } = await freighterApi.getAddress()
        if (!address) throw new Error('Wallet no conectada')
        setAddress(address)

        const data = await getBalances(address)
        const xlm = data.find(b => b.asset_type === 'native')
        const usdc = data.find(b => b.asset_code === 'USDC')

        setBalances({
          xlm: xlm ? parseFloat(xlm.balance).toFixed(2) : '0.00',
          usdc: usdc ? parseFloat(usdc.balance).toFixed(2) : '0.00',
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    cargarDatos()
  }, [])

  // Proyección simple: USDC actual * (1.09)^30
  const proyeccion = balances
    ? (parseFloat(balances.usdc) * Math.pow(1.09, 30)).toFixed(2)
    : '0.00'

  return (
    <div style={{ backgroundColor: '#050505', color: '#fff', fontFamily: "'Inter', sans-serif" }}>

      {/* Header del dashboard */}
      <div className="mb-4">
        <div className="badge rounded-pill px-3 py-2 mb-3"
          style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>
          📊 Tu ahorro en tiempo real
        </div>
        <h2 className="fw-bold mb-1" style={{ letterSpacing: '-2px' }}>Dashboard de Retiro</h2>
        {address && (
          <p className="text-white-50 small font-monospace mb-0">
            {address.slice(0, 8)}...{address.slice(-8)}
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary mb-3" role="status" />
          <p className="text-white-50 small">Cargando datos desde Stellar testnet...</p>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-4 mb-4 small"
          style={{ backgroundColor: 'rgba(220,53,69,0.1)', border: '1px dashed rgba(220,53,69,0.4)', color: '#ff6b6b' }}>
          ⚠️ {error} — Conecta tu wallet en la sección de inicio
        </div>
      )}

      {balances && (
        <>
          {/* Balances reales */}
          <div className="row g-3 mb-4">
            {[
              { label: 'Balance USDC', val: `$${balances.usdc}`, sub: 'En tu wallet testnet', color: '#3b82f6' },
              { label: 'Balance XLM', val: `${balances.xlm}`, sub: 'Para fees de transacción', color: 'rgba(255,255,255,0.6)' },
              { label: 'Proyección a 30 años', val: `$${Number(proyeccion).toLocaleString()}`, sub: 'Con 9% APY (Etherfuse)', color: '#22c55e' },
            ].map((stat) => (
              <div className="col-md-4" key={stat.label}>
                <div className="p-4 rounded-4 h-100"
                  style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="small text-white-50 mb-2">{stat.label}</div>
                  <div className="fs-3 fw-bold" style={{ color: stat.color }}>{stat.val}</div>
                  <div className="small text-white-50 mt-1">{stat.sub}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Barra de progreso hacia el retiro */}
          <div className="p-4 rounded-4 mb-4"
            style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="d-flex justify-content-between mb-3">
              <span className="fw-bold">Progreso hacia meta de retiro</span>
              <span className="text-white-50 small">Meta: $10,000 USDC</span>
            </div>
            <div className="progress rounded-pill mb-2" style={{ height: 8, backgroundColor: 'rgba(255,255,255,0.05)' }}>
              <div className="progress-bar rounded-pill"
                style={{
                  width: `${Math.min((parseFloat(balances.usdc) / 10000) * 100, 100)}%`,
                  background: 'linear-gradient(90deg, #2563eb, #3b82f6)'
                }}>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <span className="small text-white-50">${balances.usdc} USDC ahorrados</span>
              <span className="small" style={{ color: '#3b82f6' }}>
                {((parseFloat(balances.usdc) / 10000) * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {/* Info del contrato */}
          <div className="p-4 rounded-4 mb-4"
            style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h6 className="fw-bold mb-3">Estado del contrato</h6>
            <div className="row g-3">
              {[
                { label: 'Red', val: 'Stellar Testnet' },
                { label: 'Bloqueo', val: '30 años' },
                { label: 'Rendimiento', val: '~9% APY' },
                { label: 'Proveedor yield', val: 'Etherfuse CETES' },
              ].map((item) => (
                <div className="col-6" key={item.label}>
                  <div className="small text-white-50">{item.label}</div>
                  <div className="fw-bold small">{item.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="p-4 rounded-4"
            style={{ backgroundColor: 'rgba(59,130,246,0.05)', border: '1px dashed rgba(59,130,246,0.3)' }}>
            <h6 className="fw-bold mb-3" style={{ color: '#3b82f6' }}>Módulos en desarrollo</h6>
            <ul className="list-unstyled mb-0 d-flex flex-column gap-2">
              {[
                'Historial de aportaciones y rendimiento mensual',
                'Retiro de emergencia con oráculo médico via Soroban',
                'Movimientos on-chain y estado del contrato completo',
                'Integración real con Etherfuse API para yield on-chain',
              ].map((item) => (
                <li key={item} className="small text-white-50 d-flex align-items-start gap-2">
                  <span style={{ color: '#3b82f6' }}>→</span> {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  )
}