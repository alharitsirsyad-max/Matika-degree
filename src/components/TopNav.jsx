import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Beranda', accent: 'var(--text-bright)' },
  { path: '/invers', label: '01. Invers', accent: 'var(--cyan)' },
  { path: '/komposisi', label: '02. Komposisi', accent: 'var(--orange)' },
  { path: '/lingkaran', label: '03. Lingkaran', accent: 'var(--violet)' },
];

export default function TopNav() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 200,
      background: 'rgba(255, 255, 255, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      height: '52px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 var(--sp-page)',
      width: '100%'
    }}>
      <Link 
        to="/" 
        style={{
          fontFamily: "'Fraunces', serif",
          fontWeight: 700,
          fontSize: '18px',
          color: 'var(--text-bright)',
          textDecoration: 'none'
        }}
      >
        MATIKA°
      </Link>

      {/* Desktop Menu */}
      <div style={{ display: 'flex', gap: 'var(--sp-sm)' }} className="desktop-nav">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                padding: '6px 14px',
                color: isActive ? 'var(--navy-deep)' : 'var(--text-dim)',
                backgroundColor: isActive ? item.accent : 'transparent',
                border: isActive ? `1px solid ${item.accent}` : '1px solid var(--border)',
                textDecoration: 'none',
                transition: 'all 0.2s',
                display: 'inline-block'
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button - simple styling, will hide on desktop via CSS later */}
      <button 
        className="mobile-nav-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: 'none',
          color: 'var(--text-bright)',
          fontFamily: "'Syne', sans-serif",
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px'
        }}
      >
        {menuOpen ? 'Tutup' : 'Menu'}
      </button>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '52px',
          left: 0,
          right: 0,
          background: 'var(--navy-deep)',
          borderBottom: '1px solid var(--border)',
          padding: 'var(--sp-md) var(--sp-page)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--sp-sm)',
          zIndex: 199
        }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  padding: '10px 14px',
                  color: isActive ? item.accent : 'var(--text-dim)',
                  borderLeft: isActive ? `3px solid ${item.accent}` : '3px solid transparent',
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
