const comparacion = [
    { label: 'Rendimiento anual', afore: '~4%', retiro: '~9% APY', barAfore: 30, barRetiro: 80 },
    { label: 'Reemplazo salarial', afore: '40-50%', retiro: 'hasta 80%', barAfore: 40, barRetiro: 80 },
    { label: 'Cobertura informal', afore: '0%', retiro: '100%', barAfore: 0, barRetiro: 100 },
    { label: 'Comisiones', afore: 'Ocultas', retiro: '0%', barAfore: 60, barRetiro: 5 },
]

function ComparacionSection() {
    return (
        <section className="container py-5 my-3">
            <div className="row g-5 align-items-center">
                <div className="col-lg-4">
                    <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>
                        La comparación
                    </span>
                    <h2 className="display-5 fw-bold mb-3" style={{ letterSpacing: '-2px' }}>
                        AFORE vs<br />RetiroChain
                    </h2>
                    <p className="text-white-50">Los números no mienten. Compara qué sistema trabaja más para ti.</p>
                </div>
                <div className="col-lg-8">
                    <div className="d-flex flex-column gap-4">
                        {comparacion.map((item) => (
                            <div key={item.label}>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="small fw-bold text-white">{item.label}</span>
                                    <div className="d-flex gap-4">
                                        <span className="text-white-50 small">AFORE: {item.afore}</span>
                                        <span style={{ color: '#3b82f6' }} className="small fw-bold">RC: {item.retiro}</span>
                                    </div>
                                </div>
                                <div className="d-flex flex-column gap-1">
                                    <div className="progress rounded-pill" style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                        <div className="progress-bar rounded-pill" style={{ width: `${item.barAfore}%`, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                    </div>
                                    <div className="progress rounded-pill" style={{ height: 6, backgroundColor: 'rgba(255,255,255,0.05)' }}>
                                        <div className="progress-bar rounded-pill" style={{ width: `${item.barRetiro}%`, backgroundColor: '#3b82f6' }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="d-flex gap-4 mt-2">
                            <div className="d-flex align-items-center gap-2">
                                <div className="rounded-circle" style={{ width: 10, height: 10, backgroundColor: 'rgba(255,255,255,0.2)' }}></div>
                                <span className="text-white-50 small">AFORE tradicional</span>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <div className="rounded-circle" style={{ width: 10, height: 10, backgroundColor: '#3b82f6' }}></div>
                                <span className="text-white-50 small">RetiroChain</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ComparacionSection