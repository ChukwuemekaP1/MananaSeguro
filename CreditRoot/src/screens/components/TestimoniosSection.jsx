import { useEffect, useState } from 'react'

const testimonios = [
    { nombre: 'Carlos M.', profesion: 'Taxista, CDMX', texto: '"Empecé con $200 y ya llevo 6 meses ahorrando sin fallar."', inicial: 'C' },
    { nombre: 'Laura G.', profesion: 'Freelancer', texto: '"Nunca tuve AFORE. Esto sí me funciona."', inicial: 'L' },
    { nombre: 'Miguel R.', profesion: 'Vendedor, Monterrey', texto: '"Mi dinero está en dólares. Ya no le tengo miedo a la inflación."', inicial: 'M' },
]

function TestimoniosSection() {
    const [activo, setActivo] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActivo((prev) => (prev + 1) % testimonios.length)
        }, 5000)
        return () => clearInterval(interval)
    }, [])

    const t = testimonios[activo]

    return (
        <section className="container py-5 my-3 text-center">
            <span className="badge rounded-pill px-3 py-2 mb-4" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>
                Usuarios reales
            </span>
            <div className="mx-auto" style={{ maxWidth: '700px' }}>
                <p className="fs-4 mb-4" style={{ fontStyle: 'italic', fontWeight: '300', lineHeight: 1.6 }}>{t.texto}</p>
                <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                    <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold"
                        style={{ width: 45, height: 45, backgroundColor: '#3b82f6' }}>
                        {t.inicial}
                    </div>
                    <div className="text-start">
                        <div className="fw-bold">{t.nombre}</div>
                        <div className="text-white-50 small">{t.profesion}</div>
                    </div>
                </div>
                <div className="d-flex justify-content-center gap-2">
                    {testimonios.map((_, i) => (
                        <button key={i} onClick={() => setActivo(i)}
                            className="btn p-0 border-0 rounded-pill"
                            style={{ width: i === activo ? 24 : 8, height: 8, backgroundColor: i === activo ? '#3b82f6' : 'rgba(255,255,255,0.2)', transition: 'all 0.3s ease' }}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
export default TestimoniosSection