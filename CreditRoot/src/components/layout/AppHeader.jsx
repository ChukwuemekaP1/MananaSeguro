import { navigationItems } from '../../app/navigation'

export function AppHeader({ usuario }) {
  return (
    <nav className="navbar sticky-top px-4 py-3"
      style={{ backdropFilter: 'blur(15px)', backgroundColor: 'rgba(5,5,5,0.85)', borderBottom: '1px solid rgba(255,255,255,0.05)', zIndex: 1000 }}>
      <div className="container d-flex justify-content-between align-items-center">

        <span className="fw-black fs-4" style={{ letterSpacing: '-1.5px', color: '#fff' }}>
          RETIRO<span style={{ color: '#3b82f6' }}>CHAIN</span>
        </span>

        <div className="d-flex align-items-center gap-4">
          {navigationItems.map((item) => (
            <a key={item.href} href={item.href}
              className="text-decoration-none small fw-medium"
              style={{ color: 'rgba(255,255,255,0.5)' }}>
              {item.label}
            </a>
          ))}
        </div>

        {usuario && (
          <div className="d-flex align-items-center gap-2">
            <div className="rounded-circle d-flex align-items-center justify-content-center fw-bold small"
              style={{ width: 32, height: 32, backgroundColor: '#3b82f6', fontSize: '0.75rem' }}>
              {usuario.nombre.charAt(0).toUpperCase()}
            </div>
            <span className="small text-white-50">{usuario.nombre.split(' ')[0]}</span>
          </div>
        )}

      </div>
    </nav>
  )
}