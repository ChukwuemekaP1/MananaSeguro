import { useEffect, useState } from 'react'

function RetiroCalculadora() {
    const [cuota, setCuota] = useState(500)
    const [anios, setAnios] = useState(25)
    const [resultado, setResultado] = useState(0)

    useEffect(() => {
        const r = 0.08 / 12
        const n = anios * 12
        const total = cuota * (((Math.pow(1 + r, n)) - 1) / r)
        setResultado(Math.round(total))
    }, [cuota, anios])

    return (
        <div className="p-1 rounded-5" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)' }}>
            <div className="p-4 p-md-5 rounded-5" style={{ backgroundColor: '#0c0c0c' }}>
                <span className="text-white-50 small text-uppercase mb-2 d-block">Proyección estimada</span>
                <h2 className="display-4 fw-bold mb-4" style={{ color: '#3b82f6' }}>
                    ${resultado.toLocaleString()} <span className="fs-6 text-white-50">MXN</span>
                </h2>
                <div className="mb-4">
                    <div className="d-flex justify-content-between mb-2">
                        <label className="small text-white-50">Aporte mensual</label>
                        <span className="fw-bold">${Number(cuota).toLocaleString()}</span>
                    </div>
                    <input type="range" className="form-range" min="100" max="10000" step="100"
                        value={cuota} onChange={(e) => setCuota(Number(e.target.value))} />
                </div>
                <div className="mb-5">
                    <div className="d-flex justify-content-between mb-2">
                        <label className="small text-white-50">Tiempo de ahorro</label>
                        <span className="fw-bold">{anios} años</span>
                    </div>
                    <input type="range" className="form-range" min="1" max="40"
                        value={anios} onChange={(e) => setAnios(Number(e.target.value))} />
                </div>
                <div className="p-3 rounded-4 text-center" style={{ backgroundColor: 'rgba(59,130,246,0.05)', border: '1px dashed rgba(59,130,246,0.3)' }}>
                    <p className="small text-white-50 mb-0">Basado en rendimiento proyectado del 8% anual con Etherfuse.</p>
                </div>
            </div>
        </div>
    )
}
export default RetiroCalculadora