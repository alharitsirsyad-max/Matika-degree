import { Link } from 'react-router-dom';

export default function GlobalFooter() {
  return (
    <footer style={{
      backgroundColor: 'var(--navy-deep)',
      borderTop: '1px solid var(--border)',
      marginTop: '80px'
    }}>
      <div className="container" style={{
        padding: '60px var(--sp-page)',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '48px'
      }}>
        {/* Brand Section */}
        <div>
          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--text-bright)',
            marginBottom: '16px'
          }}>
            MATIKA°
          </div>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '14px',
            color: 'var(--text-dim)',
            lineHeight: 1.8,
            marginBottom: '24px'
          }}>
            Platform pembelajaran matematika interaktif dengan visualisasi modern dan eksplorasi konsep yang mendalam.
          </p>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: 'var(--text-faint)',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            Blueprint Lab Design System
          </div>
        </div>

        {/* Materi Section */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '12px',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            Materi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link to="/invers" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-bright)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }} onMouseEnter={e => e.target.style.color = 'var(--cyan)'} onMouseLeave={e => e.target.style.color = 'var(--text-bright)'}>
              Fungsi Invers
            </Link>
            <Link to="/komposisi" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-bright)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }} onMouseEnter={e => e.target.style.color = 'var(--orange)'} onMouseLeave={e => e.target.style.color = 'var(--text-bright)'}>
              Fungsi Komposisi
            </Link>
            <Link to="/lingkaran" style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-bright)',
              textDecoration: 'none',
              transition: 'color 0.2s'
            }} onMouseEnter={e => e.target.style.color = 'var(--violet)'} onMouseLeave={e => e.target.style.color = 'var(--text-bright)'}>
              Lingkaran & Geometri
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div>
          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '12px',
            color: 'var(--text-dim)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '20px',
            fontWeight: 600
          }}>
            Informasi
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              <strong style={{ color: 'var(--text-bright)' }}>Dibuat oleh:</strong><br/>
              Irsyad Abdul Jabbar Al Harits
            </div>
            
            {/* Social Icons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
              marginTop: '8px',
              marginBottom: '8px'
            }}>
              <a href="mailto:irsyadabdul999@gmail.com" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s', opacity: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
                title="Email"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                </svg>
              </a>
              
              <a href="https://instagram.com/abdulll78880" target="_blank" rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s', opacity: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
                title="Instagram"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              
              <a href="https://github.com/irsyadalharits-max" target="_blank" rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s', opacity: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
                title="GitHub"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </a>
              
              <a href="https://wa.me/6289513766615" target="_blank" rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s', opacity: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
                title="WhatsApp"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="var(--text-bright)" stroke="none">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              
              <a href="https://www.linkedin.com/in/irsyad-abdul-jabbar-al-harits-963b97407?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" 
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textDecoration: 'none', transition: 'all 0.3s', opacity: 0.6 }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
                title="LinkedIn"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--text-bright)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
            
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              <strong style={{ color: 'var(--text-bright)' }}>Kelas:</strong><br/>
              XI SIJA 1 - Presensi 19
            </div>
            <div style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              <strong style={{ color: 'var(--text-bright)' }}>Tahun:</strong><br/>
              2026
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '24px var(--sp-page)',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: 'var(--text-faint)'
        }}>
          © 2026 MATIKA. Proyek Semester Matematika Kelas XI SIJA 1.
        </div>
      </div>
    </footer>
  );
}
