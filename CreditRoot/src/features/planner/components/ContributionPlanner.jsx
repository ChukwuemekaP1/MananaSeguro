import { useState } from 'react'
import { plannerDefaults } from '../../../data/retirementContent'
import { useRetirementProjection } from '../../../hooks/useRetirementProjection'
import { formatCurrencyMxn, formatCurrencyUsd, formatPercentage } from '../../../utils/formatters'
import { lockFunds, enviarTransaccion } from '../../../lib/stellar'
import { firmarTransaccion } from '../../../lib/wallet'
import freighterApi from '@stellar/freighter-api'

export function ContributionPlanner() {
  const { scenario, projection, updateScenario } = useRetirementProjection(plannerDefaults)
  const [estado, setEstado] = useState(null)
  const [txHash, setTxHash] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  async function handleBloquear() {
    try {
      setEstado('loading')
      setErrorMsg(null)
      const { address } = await freighterApi.getAddress()
      if (!address) throw new Error('Conecta tu wallet primero')
      const tx = await lockFunds(address, scenario.monthlyDepositUsd)
      const signedXdr = await firmarTransaccion(tx.toXDR())
      const hash = await enviarTransaccion(signedXdr)
      setTxHash(hash)
      setEstado('success')
    } catch (err) {
      setErrorMsg(err.message)
      setEstado('error')
    }
  }

  const txUrl = txHash ? 'https://stellar.expert/explorer/testnet/tx/' + txHash : null
  const txLabel = txHash ? txHash.slice(0, 16) + '...' : ''

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="row g-4">

        {/* Simulador */}
        <div className="col-lg-6">
          <div className="p-4 rounded-4 h-100"
            style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h5 className="fw-bold mb-4">Simulador base</h5>

            <div className="d-flex flex-column gap-4">
              <div>
                <div className="d-flex justify-content-between mb-2">
                  <label className="small text-white-50">Aportación mensual en USDC</label>
                  <span className="fw-bold small">{formatCurrencyUsd(scenario.monthlyDepositUsd)}</span>
                </div>
                <input type="number" className="form-control bg-transparent text-white border-secondary rounded-3"
                  min="1" step="1"
                  value={scenario.monthlyDepositUsd}
                  onChange={(e) => updateScenario('monthlyDepositUsd', e.target.value)}
                />
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <label className="small text-white-50">Años al retiro</label>
                  <span className="fw-bold small">{scenario.yearsToRetirement} años</span>
                </div>
                <input type="number" className="form-control bg-transparent text-white border-secondary rounded-3"
                  min="1" step="1"
                  value={scenario.yearsToRetirement}
                  onChange={(e) => updateScenario('yearsToRetirement', e.target.value)}
                />
              </div>

              <div>
                <div className="d-flex justify-content-between mb-2">
                  <label className="small text-white-50">Rendimiento anual proyectado</label>
                  <span className="fw-bold small">{formatPercentage(scenario.annualYieldRate)}</span>
                </div>
                <input type="number" className="form-control bg-transparent text-white border-secondary rounded-3"
                  min="1" max="20" step="0.5"
                  value={scenario.annualYieldRate}
                  onChange={(e) => updateScenario('annualYieldRate', e.target.value)}
                />
              </div>
            </div>

            <p className="text-white-50 small mt-4 mb-0">
              Referencia: {formatCurrencyMxn(200)} pueden ser una microaportación recurrente en la demo.
            </p>
          </div>
        </div>

        {/* Proyección */}
        <div className="col-lg-6">
          <div className="p-4 rounded-4 h-100"
            style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h5 className="fw-bold mb-4">Lectura rápida del escenario</h5>

            <div className="row g-3 mb-4">
              <div className="col-6">
                <div className="p-3 rounded-4" style={{ backgroundColor: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <div className="small text-white-50 mb-1">Balance al retiro</div>
                  <div className="fw-bold fs-5" style={{ color: '#3b82f6' }}>{formatCurrencyUsd(projection.projectedBalance)}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 rounded-4" style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div className="small text-white-50 mb-1">Ganancia estimada</div>
                  <div className="fw-bold fs-5" style={{ color: '#22c55e' }}>{formatCurrencyUsd(projection.growthAmount)}</div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column gap-2 mb-4">
              {[
                { label: 'Aportado por ti', val: formatCurrencyUsd(projection.investedAmount) },
                { label: 'Ingreso mensual estimado', val: formatCurrencyUsd(projection.estimatedMonthlyIncome) },
                { label: 'Tasa usada', val: formatPercentage(scenario.annualYieldRate) },
              ].map((item) => (
                <div key={item.label} className="d-flex justify-content-between py-2"
                  style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <span className="small text-white-50">{item.label}</span>
                  <span className="small fw-bold">{item.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bloquear */}
        <div className="col-12">
          <div className="p-4 rounded-4"
            style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
            <h5 className="fw-bold mb-2">Bloquear ahorro en Stellar</h5>
            <p className="text-white-50 small mb-4">
              Confirma tu aportación de {formatCurrencyUsd(scenario.monthlyDepositUsd)} en USDC.
              El dinero quedará bloqueado en testnet con memo RetiroChain.
            </p>

            <button
              className="btn btn-primary btn-lg px-5 py-3 rounded-4 fw-bold"
              style={{ background: estado === 'success' ? 'rgba(34,197,94,0.15)' : 'linear-gradient(45deg, #2563eb, #3b82f6)', border: estado === 'success' ? '1px solid rgba(34,197,94,0.3)' : 'none', color: estado === 'success' ? '#22c55e' : '#fff' }}
              onClick={handleBloquear}
              disabled={estado === 'loading' || estado === 'success'}
            >
              {estado === 'loading' ? (
                <span className="d-flex align-items-center gap-2">
                  <span className="spinner-border spinner-border-sm" /> Procesando...
                </span>
              ) : estado === 'success' ? '✓ Ahorro bloqueado' : '🔒 Bloquear ahorro en Stellar'}
            </button>

            {estado === 'success' && txHash && (
              <div className="mt-3 p-3 rounded-4 small"
                style={{ backgroundColor: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                <div className="fw-bold mb-1" style={{ color: '#22c55e' }}>✅ Transacción confirmada en testnet</div>
                <a href={txUrl} target="_blank" rel="noreferrer"
                  style={{ color: '#3b82f6' }}>
                  Ver en Stellar Expert → {txLabel}
                </a>
              </div>
            )}

            {estado === 'error' && (
              <div className="mt-3 p-3 rounded-4 small"
                style={{ backgroundColor: 'rgba(220,53,69,0.1)', border: '1px dashed rgba(220,53,69,0.4)', color: '#ff6b6b' }}>
                ⚠️ {errorMsg}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}