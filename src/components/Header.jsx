import { useState } from 'react'
import logoImg from '../assets/logo.png'

const Header = ({ currentView, setView }) => {
    const [mobileOpen, setMobileOpen] = useState(false)

    const navItems = [
        { id: 'home', label: 'Database' },
        { id: 'tools', label: 'Ferramentas' },
        { id: 'guides', label: 'Guias' },
        { id: 'glossary', label: 'Glossário' },
        { id: 'getting-started', label: 'Começar' },
    ]

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-logo" onClick={() => setView('home')}>
                    <img src={logoImg} alt="Silicon Redline" className="header-logo-img" />
                    <div className="header-logo-text">SILICON <span>REDLINE</span></div>
                </div>

                <button className="mobile-nav-toggle" onClick={() => setMobileOpen(!mobileOpen)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {mobileOpen
                            ? <path d="M18 6L6 18M6 6l12 12" />
                            : <path d="M3 12h18M3 6h18M3 18h18" />
                        }
                    </svg>
                </button>

                <nav className={`header-nav ${mobileOpen ? 'open' : ''}`}>
                    {navItems.map(item => (
                        <span
                            key={item.id}
                            className={`nav-link ${currentView === item.id ||
                                (item.id === 'guides' && currentView.startsWith('guide'))
                                ? 'active' : ''
                                }`}
                            onClick={() => { setView(item.id); setMobileOpen(false); }}
                        >
                            {item.label}
                        </span>
                    ))}
                </nav>
            </div>
        </header>
    )
}

export default Header
