const stats = [
    { val: '32M', label: 'Mexicanos sin acceso a una AFORE', color: 'text-primary' },
    { val: '-75%', label: 'Pérdida del Peso vs Dólar en 20 años', color: 'text-danger' },
    { val: '9.25%', label: 'Rendimiento anual con Etherfuse CETES', color: 'text-success' },
]

function LandingStats() {
    return (
        <section className="container py-5">
            <div className="row g-4 text-center">
                {stats.map((s) => (
                    <div className="col-md-4" key={s.val}>
                        <h2 className={`fw-bold display-4 ${s.color}`}>{s.val}</h2>
                        <p className="text-white-50">{s.label}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}
export default LandingStats