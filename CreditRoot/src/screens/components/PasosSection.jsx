const pasos = [
    { num: '01', icon: '👤', titulo: 'Crea tu cuenta', desc: 'Solo tu nombre y CURP. Sin burocracia, sin cita, sin banco.' },
    { num: '02', icon: '🔐', titulo: 'Conecta tu wallet', desc: 'Usa Freighter en Stellar. Tú controlas tus claves, nadie más.' },
    { num: '03', icon: '💵', titulo: 'Deposita en USDC', desc: 'Desde $50 MXN. Protegido de la inflación del peso.' },
    { num: '04', icon: '📈', titulo: 'Bloquea y crece', desc: 'Tu ahorro genera yield real con CETES tokenizados por Etherfuse.' },
]

function PasosSection() {
    return (
        <section className="container py-5 my-3">
            <div className="text-center mb-5">
                <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>
                    Proceso simple
                </span>
                <h2 className="display-5 fw-bold" style={{ letterSpacing: '-2px' }}>En 4 pasos, tienes tu retiro.</h2>
                <p className="text-white-50 mt-2">Sin filas. Sin papeleo. Sin banco.</p>
            </div>
            <div className="row g-4">
                {pasos.map((p) => (
                    <div className="col-md-6 col-lg-3" key={p.num}>
                        <div className="p-4 h-100 rounded-4" style={{ backgroundColor: '#0c0c0c', border: '1px solid rgba(255,255,255,0.06)' }}>
                            <div className="fs-2 mb-3">{p.icon}</div>
                            <div className="fw-black mb-2" style={{ color: 'rgba(59,130,246,0.5)', fontSize: '0.85rem' }}>{p.num}</div>
                            <h6 className="fw-bold mb-2">{p.titulo}</h6>
                            <p className="text-white-50 small mb-0">{p.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default PasosSection