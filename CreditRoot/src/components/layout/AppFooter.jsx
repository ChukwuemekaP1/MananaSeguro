export function AppFooter() {
  return (
    <footer className="py-4"
      style={{ borderTop: '1px solid rgba(255,255,255,0.05)', backgroundColor: '#050505' }}>
      <div className="container d-flex flex-wrap justify-content-between align-items-center gap-3">

        <span className="fw-black" style={{ letterSpacing: '-1px', color: '#fff' }}>
          RETIRO<span style={{ color: '#3b82f6' }}>CHAIN</span>
        </span>

        <div className="d-flex gap-4 flex-wrap">
          <span className="text-white-50 small">React + Vite + Stellar SDK</span>
          <span className="text-white-50 small">Powered by Etherfuse</span>
          <span className="text-white-50 small">Stellar Testnet</span>
        </div>

      </div>
    </footer>
  )
}