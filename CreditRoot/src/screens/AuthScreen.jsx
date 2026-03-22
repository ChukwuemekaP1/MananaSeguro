import { useState } from 'react'
import Footer from './components/Footer'
import LandingNavbar from './components/LandingNavbar'

export function AuthScreen({ modo, onAuth, onVolver }) {
    const [form, setForm] = useState({ nombre: '', curp: '', pin: '' })
    const [error, setError] = useState(null)
    const [showPin, setShowPin] = useState(false)
    const [isFocused, setIsFocused] = useState(null)
    const eyeIconStyle = {
        width: '20px',
        height: '20px',
        display: 'block'
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (!form.nombre || !form.curp || !form.pin) {
            setError('Todos los campos son obligatorios para tu seguridad.')
            return
        }
        if (form.curp.length < 10) {
            setError('CURP inválido. Revisa el formato.')
            return
        }
        onAuth({ nombre: form.nombre, curp: form.curp })
    }

    const getInputStyle = (id) => ({
        transition: 'all 0.3s ease',
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: isFocused === id ? '1px solid #f59e0b' : '1px solid rgba(255,255,255,0.1)',
        outline: 'none',
        color: '#fff',
        padding: '12px 20px',
        fontSize: '1.1rem'
    })

    return (
        <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>

            <LandingNavbar soloVolver onVolver={onVolver} />
            <div className="container py-5 mt-lg-4">
                <div className="row align-items-center g-5">

                    <div className="col-lg-6 d-none d-lg-block">
                        <div className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#f59e0b', border: '1px solid rgba(59,130,246,0.2)' }}>
                            🛡️ Seguridad de Grado Bancario On-Chain
                        </div>
                        <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: 1, letterSpacing: '-3px' }}>
                            {modo === 'login' ? 'Bienvenido de' : 'Crea tu cuenta'}<br />
                            <span style={{ opacity: 0.4 }}>{modo === 'login' ? 'vuelta.' : 'en 1 minuto.'}</span>
                        </h1>
                        <p className="fs-5 text-white-50 mb-0">
                            Accede a la red financiera del futuro. Tus USDC te esperan bajo el resguardo de la red Stellar.
                        </p>
                    </div>

                    <div className="col-lg-5 offset-lg-1">
                        <div className="p-1 rounded-5" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)' }}>
                            <div className="p-4 p-md-5 rounded-5" style={{ backgroundColor: '#0c0c0c' }}>

                                <h3 className="fw-bold mb-4 fs-2">{modo === 'login' ? 'Identifícate' : 'Regístrate'}</h3>

                                <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
                                    <div>
                                        <label className="small text-white-50 mb-2 d-block">NOMBRE COMPLETO</label>
                                        <input className="w-100 rounded-4" style={getInputStyle('nombre')}
                                            placeholder="Ej. Juan Pérez"
                                            onFocus={() => setIsFocused('nombre')}
                                            onBlur={() => setIsFocused(null)}
                                            value={form.nombre}
                                            onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="small text-white-50 mb-2 d-block">CURP (MOCK)</label>
                                        <input className="w-100 rounded-4 font-monospace" style={getInputStyle('curp')}
                                            placeholder="ABCD123456XXXXXX"
                                            onFocus={() => setIsFocused('curp')}
                                            onBlur={() => setIsFocused(null)}
                                            value={form.curp}
                                            onChange={(e) => setForm({ ...form, curp: e.target.value.toUpperCase() })}
                                        />
                                    </div>

                                    <div>
                                        <label className="small text-white-50 mb-2 d-block">PIN DE ACCESO</label>
                                        <div className="position-relative">
                                        <input type={showPin ? 'text' : 'password'}
                                            className="w-100 rounded-4 fs-4" style={{ ...getInputStyle('pin'), paddingRight: '56px' }}
                                            placeholder="••••••" maxLength={6}
                                            onFocus={() => setIsFocused('pin')}
                                            onBlur={() => setIsFocused(null)}
                                            value={form.pin}
                                            onChange={(e) => setForm({ ...form, pin: e.target.value })}
                                        />
                                        <button type="button"
                                            className="position-absolute p-0 d-flex align-items-center justify-content-center pin-toggle-btn"
                                            onClick={() => setShowPin(!showPin)}
                                            aria-label={showPin ? 'Ocultar PIN' : 'Mostrar PIN'}
                                            style={{
                                                top: '50%',
                                                right: '16px',
                                                transform: 'translateY(-50%)',
                                                width: '28px',
                                                height: '28px',
                                                border: 'none',
                                                background: 'none',
                                                color: 'rgba(255,255,255,0.55)'
                                            }}>
                                            {showPin ? (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={eyeIconStyle}>
                                                    <path d="M3 3l18 18" />
                                                    <path d="M10.58 10.58a2 2 0 0 0 2.83 2.83" />
                                                    <path d="M9.88 5.09A9.77 9.77 0 0 1 12 4.91c5 0 9.27 3.11 11 7.5a11.8 11.8 0 0 1-4.24 5.09" />
                                                    <path d="M6.61 6.61A11.76 11.76 0 0 0 1 12.41c1.12 2.83 3.33 5.08 6.08 6.25" />
                                                </svg>
                                            ) : (
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={eyeIconStyle}>
                                                    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
                                                    <circle cx="12" cy="12" r="3" />
                                                </svg>
                                            )}
                                        </button>
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="p-3 rounded-4 text-center small" style={{ backgroundColor: 'rgba(220,53,69,0.1)', border: '1px dashed rgba(220,53,69,0.4)', color: '#ff6b6b' }}>
                                            ⚠️ {error}
                                        </div>
                                    )}

                                    <button type="submit"
                                        className="btn btn-primary btn-lg w-100 py-3 rounded-4 fw-bold shadow mt-2"
                                        style={{ background: 'linear-gradient(45deg, #d97706, #f59e0b)', border: 'none' }}>
                                        {modo === 'login' ? 'Entrar a mi Retiro' : 'Crear mi Cuenta'}
                                    </button>

                                    <p className="text-center small text-white-50 mb-0">
                                        ¿No tienes acceso? <span className="text-primary fw-bold" style={{ cursor: 'pointer' }}>Contáctanos</span>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            <style>{`
                input::placeholder { color: rgba(255,255,255,0.2); }
                .fw-black { font-weight: 900; }
                .pin-toggle-btn:hover { color: rgba(255,255,255,0.85) !important; }
            `}</style>
        </div>
    )
}
