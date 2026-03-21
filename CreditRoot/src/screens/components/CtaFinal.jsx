function CtaFinal({ onLogin, onRegister }) {
    return (
        <section className="py-5 my-3" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(59,130,246,0.05))' }}>
            <div className="container text-center py-4">
                <h2 className="display-4 fw-bold mb-3" style={{ letterSpacing: '-2px' }}>
                    ¿Vas a esperar a que<br />el AFORE te falle?
                </h2>
                <p className="text-white-50 fs-5 mb-5">Empieza hoy. Sin banco. Sin IMSS. Sin excusas.</p>
                <div className="d-flex gap-3 justify-content-center flex-wrap">
                    <button className="btn btn-primary btn-lg px-5 py-3 rounded-4 fw-bold"
                        style={{ background: 'linear-gradient(45deg, #2563eb, #3b82f6)', border: 'none' }}
                        onClick={onRegister}>
                        Crear mi cuenta →
                    </button>
                    <button className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-4 fw-bold" onClick={onLogin}>
                        Ya tengo cuenta
                    </button>
                </div>
            </div>
        </section>
    )
}
export default CtaFinal