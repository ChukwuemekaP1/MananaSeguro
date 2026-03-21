import Footer from './components/Footer'
import LandingNavbar from './components/LandingNavbar'
import RetiroCalculadora from './components/RetiroCalculadora'
import LandingStats from './components/LandingStats'
import PasosSection from './components/PasosSection'
import ComparacionSection from './components/ComparacionSection'
import TestimoniosSection from './components/TestimoniosSection'
import CtaFinal from './components/CtaFinal'
import Divisor from './components/Divisor'

export function LandingScreen({ onLogin, onRegister }) {
    return (
        <div style={{ backgroundColor: '#050505', color: '#fff', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>

            <LandingNavbar onLogin={onLogin} onRegister={onRegister} />

            <header className="container py-5 mt-4">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6">
                        <div className="badge rounded-pill mb-3 px-3 py-2" style={{ backgroundColor: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }}>
                            🚀 Ahorro Inteligente en USDC · Stellar
                        </div>
                        <h1 className="display-2 fw-bold mb-4" style={{ lineHeight: 1, letterSpacing: '-3px' }}>
                            Tu retiro,<br /><span style={{ opacity: 0.4 }}>en tus manos.</span>
                        </h1>
                        <p className="fs-5 text-white-50 mb-5 pe-lg-5">
                            Calcula tu futuro hoy. Sin bancos, sin comisiones ocultas y con la transparencia de Stellar.
                        </p>
                        <div className="d-flex gap-3 flex-wrap">
                            <button className="btn btn-primary btn-lg px-5 py-3 rounded-4 fw-bold shadow"
                                style={{ background: 'linear-gradient(45deg, #2563eb, #3b82f6)', border: 'none' }}
                                onClick={onRegister}>
                                Comenzar ahora
                            </button>
                            <button className="btn btn-outline-secondary btn-lg px-5 py-3 rounded-4 fw-bold" onClick={onLogin}>
                                Ya tengo cuenta
                            </button>
                        </div>
                    </div>
                    <div className="col-lg-5 offset-lg-1">
                        <RetiroCalculadora />
                    </div>
                </div>
            </header>

            <LandingStats />
            <Divisor />
            <PasosSection />
            <Divisor />
            <ComparacionSection />
            <Divisor />
            <TestimoniosSection />
            <CtaFinal onLogin={onLogin} onRegister={onRegister} />
            <Footer />

        </div>
    )
}