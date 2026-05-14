import { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import FormulaBox from '../components/FormulaBox';
import BulletPoint from '../components/BulletPoint';
import MathBackground from '../components/MathBackground';

function TwoColumn({ children, borderBottom = true }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: 'var(--sp-xl)',
      borderBottom: borderBottom ? '1px solid var(--border)' : 'none',
      paddingBottom: 'var(--sp-xl)',
      marginBottom: 'var(--sp-xl)'
    }}>
      {children}
    </div>
  );
}

function CircleExplorer({ r, setR, accent }) {
  const [activePart, setActivePart] = useState('pusat');
  const [angle, setAngle] = useState(90);

  // Pan/Zoom state
  const [vx, setVx] = useState(0);
  const [vy, setVy] = useState(0);
  const [vw, setVw] = useState(400);
  const [vh, setVh] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const zoomIn = () => { setVx(vx + vw*0.1); setVy(vy + vh*0.1); setVw(vw*0.8); setVh(vh*0.8); };
  const zoomOut = () => { setVx(vx - vw*0.1); setVy(vy - vh*0.1); setVw(vw*1.2); setVh(vh*1.2); };

  const onMouseDown = (e) => { 
    setIsDragging(true); 
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY }); 
  };
  
  const onMouseMove = (e) => {
    if (!isDragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const dx = clientX - dragStart.x;
    const dy = clientY - dragStart.y;
    setVx(vx - (dx / 500) * vw);
    setVy(vy - (dy / 500) * vh);
    setDragStart({ x: clientX, y: clientY });
  };
  
  const onMouseUp = () => setIsDragging(false);

  // Constants
  const cx = 200;
  const cy = 200;
  
  const clampedR = Math.max(1, r);
  const visualR = Math.min((clampedR / 60) * 180, 180);
  
  // Math calculations
  const d = 2 * r;
  const K = 2 * Math.PI * r;
  const L = Math.PI * r * r;

  const rad = (angle * Math.PI) / 180;
  const endX = cx + visualR * Math.cos(rad);
  const endY = cy - visualR * Math.sin(rad); // SVG Y is inverted
  const largeArcFlag = angle > 180 ? 1 : 0;

  // Real world math for display
  const LuasJuring = ((angle / 360) * L).toFixed(2);
  const PanjangBusur = ((angle / 360) * K).toFixed(2);
  const TaliBusur = (2 * r * Math.sin((angle * Math.PI) / 360)).toFixed(2);
  const LuasSegitiga = 0.5 * r * r * Math.sin(rad);
  const LuasTembereng = (((angle / 360) * L) - LuasSegitiga).toFixed(2);

  const Grid = () => (
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke={`rgba(124, 58, 237, 0.05)`} strokeWidth="1"/>
    </pattern>
  );

  return (
    <div className="circle-explorer-desktop" style={{
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '0',
      backgroundColor: 'var(--navy-base)',
      border: '1px solid var(--border)',
      marginBottom: 'var(--sp-xl)'
    }}>
      {/* Visualization - Show First on Mobile */}
      <div 
        style={{ 
          backgroundColor: '#FFFFFF', 
          padding: 'var(--sp-md)', 
          minHeight: '400px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden',
          position: 'relative',
          cursor: isDragging ? 'grabbing' : 'grab',
          userSelect: 'none',
          WebkitUserSelect: 'none',
          order: 1
        }}
        className="circle-viz"
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onMouseDown}
        onTouchMove={onMouseMove}
        onTouchEnd={onMouseUp}
      >
        {/* Zoom Controls */}
        <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: '4px', zIndex: 10 }}>
          <button onClick={zoomIn} style={{ width: 32, height: 32, background: '#FFF', border: '1px solid var(--border)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
          <button onClick={zoomOut} style={{ width: 32, height: 32, background: '#FFF', border: '1px solid var(--border)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
        </div>

        <svg width="100%" height="100%" viewBox={`${vx} ${vy} ${vw} ${vh}`} preserveAspectRatio="xMidYMid meet">
          <defs>
            <Grid />
          </defs>
          <rect x={vx} y={vy} width={vw} height={vh} fill="url(#grid)" />
          
          {/* Base Circle */}
          <circle cx={cx} cy={cy} r={visualR} stroke="var(--text-bright)" strokeWidth="3" fill="none" style={{ transition: 'r 0.3s cubic-bezier(0.4, 0, 0.2, 1)', opacity: 0.2 }} />
          
          {/* Juring */}
          {activePart === 'juring' && (
            <path d={`M ${cx} ${cy} L ${cx + visualR} ${cy} A ${visualR} ${visualR} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`} fill={`rgba(124, 58, 237, 0.15)`} stroke={accent} strokeWidth="2" style={{ transition: 'd 0.3s' }} />
          )}

          {/* Tembereng */}
          {activePart === 'tembereng' && (
            <path d={`M ${cx + visualR} ${cy} A ${visualR} ${visualR} 0 ${largeArcFlag} 0 ${endX} ${endY} Z`} fill={`rgba(22, 163, 74, 0.2)`} stroke="var(--green)" strokeWidth="2" style={{ transition: 'd 0.3s' }} />
          )}

          {/* Busur */}
          {activePart === 'busur' && (
            <path d={`M ${cx + visualR} ${cy} A ${visualR} ${visualR} 0 ${largeArcFlag} 0 ${endX} ${endY}`} fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round" style={{ transition: 'd 0.3s' }} />
          )}

          {/* Tali Busur */}
          {activePart === 'tali-busur' && (
            <line x1={cx + visualR} y1={cy} x2={endX} y2={endY} stroke="var(--blue-light)" strokeWidth="3.5" style={{ transition: 'x2 0.3s, y2 0.3s' }} />
          )}

          {/* Diameter */}
          {activePart === 'diameter' && (
            <line x1={cx - visualR} y1={cy} x2={cx + visualR} y2={cy} stroke="var(--yellow)" strokeWidth="3.5" style={{ transition: 'x1 0.3s, x2 0.3s' }} />
          )}

          {/* Jari-jari */}
          {activePart === 'jari-jari' && (
            <line x1={cx} y1={cy} x2={cx + visualR} y2={cy} stroke="var(--red)" strokeWidth="3.5" style={{ transition: 'x2 0.3s' }} />
          )}

          {/* Pusat */}
          {(activePart === 'pusat' || activePart === 'jari-jari' || activePart === 'diameter' || activePart === 'juring') && (
            <circle cx={cx} cy={cy} r="5" fill="var(--text-bright)" />
          )}
        </svg>
      </div>

      {/* Controls - Show Second on Mobile */}
      <div style={{ borderTop: '1px solid var(--border)', padding: 'var(--sp-lg)', display: 'flex', flexDirection: 'column', backgroundColor: '#FAFAFA', order: 2 }} className="circle-controls">
        <SectionLabel title="Panel Kontrol" accent={accent} />
        
        {/* Gambar 1: Radius Control */}
        <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border)', padding: '24px', marginBottom: '24px', marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '13px', color: 'var(--text-dim)' }}>
              RADIUS (R)
            </label>
            <div style={{ border: `1px solid ${accent}`, padding: '4px 8px', color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: '18px' }}>
              <input 
                type="number" 
                value={r} 
                onChange={(e) => setR(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                  }
                }}
                style={{ width: '60px', border: 'none', outline: 'none', background: 'transparent', color: 'inherit', textAlign: 'center', fontFamily: 'inherit' }}
              />
            </div>
          </div>
          <input 
            type="range" 
            min="1" max="60" step="0.5"
            value={r} 
            onChange={(e) => setR(Number(e.target.value))}
            style={{ accentColor: accent, width: '100%', cursor: 'pointer' }}
          />
        </div>

        {/* Gambar 2: Inspeksi Unsur */}
        <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '24px' }}>
          {['pusat', 'jari-jari', 'diameter', 'busur', 'tali-busur', 'juring', 'tembereng'].map(part => (
            <button
              key={part}
              onClick={() => setActivePart(part)}
              style={{
                textAlign: 'left',
                padding: '12px 16px',
                fontFamily: "'Syne', sans-serif",
                fontSize: '14px',
                color: activePart === part ? '#FFF' : 'var(--text-bright)',
                backgroundColor: activePart === part ? accent : '#FFF',
                border: '1px solid var(--border)',
                marginTop: '-1px', // overlap borders
                textTransform: 'capitalize',
                transition: 'all 0.15s ease'
              }}
            >
              {part.replace('-', ' ')}
            </button>
          ))}
        </div>
        
        {/* Sudut Input (Dynamic) */}
        {['juring', 'tembereng', 'busur', 'tali-busur'].includes(activePart) && (
          <div style={{ backgroundColor: '#FFF', border: '1px solid var(--border)', padding: '16px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: 'var(--text-dim)' }}>
                SUDUT PUSAT (θ)
              </label>
              <div style={{ border: `1px solid ${accent}`, padding: '4px 8px', color: accent, fontFamily: "'JetBrains Mono', monospace", fontSize: '14px' }}>
                <input 
                  type="number" 
                  value={angle} 
                  onChange={(e) => setAngle(Number(e.target.value))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                    }
                  }}
                  style={{ width: '40px', border: 'none', outline: 'none', background: 'transparent', color: 'inherit', textAlign: 'center', fontFamily: 'inherit' }}
                />°
              </div>
            </div>
            <input 
              type="range" 
              min="10" max="350" step="1"
              value={angle} 
              onChange={(e) => setAngle(Number(e.target.value))}
              style={{ accentColor: accent, width: '100%', cursor: 'pointer', marginTop: '12px' }}
            />
          </div>
        )}

        {/* Dynamic Calculation Output */}
        <div style={{ marginTop: 'auto' }}>
          {activePart === 'jari-jari' && (
            <FormulaBox 
              label="Panjang (r)" 
              formula={r} 
              accent={accent} rgbAccent="124, 58, 237" 
              steps={[`Diketahui dari input slider: ${r}`]} 
            />
          )}
          {activePart === 'diameter' && (
            <FormulaBox 
              label="Diameter (d=2r)" 
              formula={d} 
              accent="var(--yellow)" rgbAccent="202, 138, 4" 
              steps={[`d = 2 × r`, `d = 2 × ${r}`, `d = ${d}`]}
            />
          )}
          {activePart === 'busur' && (
            <FormulaBox 
              label="Panjang Busur" 
              formula={PanjangBusur} 
              accent={accent} rgbAccent="124, 58, 237" 
              steps={[`Busur = (θ/360) × Keliling`, `Busur = (${angle}/360) × ${K.toFixed(2)}`, `Busur = ${PanjangBusur}`]}
            />
          )}
          {activePart === 'tali-busur' && (
            <FormulaBox 
              label="Tali Busur" 
              formula={TaliBusur} 
              accent="var(--blue-light)" rgbAccent="37, 99, 235" 
              steps={[`Tali Busur = 2 × r × sin(θ/2)`, `Tali Busur = 2 × ${r} × sin(${angle/2}°)`, `Tali Busur = ${TaliBusur}`]}
            />
          )}
          {activePart === 'juring' && (
            <FormulaBox 
              label="Luas Juring" 
              formula={LuasJuring} 
              accent={accent} rgbAccent="124, 58, 237" 
              steps={[`Luas Juring = (θ/360) × Luas Total`, `Luas Juring = (${angle}/360) × ${L.toFixed(2)}`, `Luas Juring = ${LuasJuring}`]}
            />
          )}
          {activePart === 'tembereng' && (
            <FormulaBox 
              label="Luas Tembereng" 
              formula={LuasTembereng} 
              accent="var(--green)" rgbAccent="22, 163, 74" 
              steps={[`Luas Tembereng = Luas Juring - Luas Segitiga`, `Luas Segitiga = ½ × r² × sin(θ) = ${LuasSegitiga.toFixed(2)}`, `Luas Tembereng = ${LuasJuring} - ${LuasSegitiga.toFixed(2)} = ${LuasTembereng}`]}
            />
          )}
          {activePart === 'pusat' && (
            <>
              <FormulaBox 
                label="Keliling Total" 
                formula={K.toFixed(2)} 
                accent={accent} 
                steps={[`K = 2 × π × r`, `K = 2 × 3.14159... × ${r}`, `K = ${K.toFixed(2)}`]}
              />
              <FormulaBox 
                label="Luas Total" 
                formula={L.toFixed(2)} 
                accent={accent} 
                steps={[`L = π × r²`, `L = 3.14159... × ${r}²`, `L = ${L.toFixed(2)}`]}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Circle() {
  const accent = 'var(--violet)';
  const rgbAccent = '192, 132, 252';

  const [rVal, setRVal] = useState(5);

  return (
    <div className="pu" style={{ color: 'var(--text-bright)', userSelect: 'none', WebkitUserSelect: 'none', position: 'relative' }}>
      <MathBackground />
      {/* Hero Band */}
      <section className="container" style={{
        paddingTop: 'var(--sp-hero)',
        paddingBottom: 'var(--sp-hero)',
        borderBottom: '1px solid var(--border)',
        marginBottom: 'var(--sp-xl)',
        position: 'relative'
      }}>
        <SectionLabel title="Bab 03" accent={accent} />
        <h1 className="type-hero" style={{ marginTop: 'var(--sp-md)', marginBottom: 'var(--sp-md)' }}>
          Lingkaran & Geometri
        </h1>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '24px',
          color: accent,
          opacity: 0.8
        }}>
          r, d, K, L
        </div>
      </section>

      <div className="container">
        {/* Sections 0 & 1 */}
        <TwoColumn>
          <div>
            <SectionLabel title="0. Orientasi Materi" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Lebih dari Sekadar Garis Lengkung</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.8 }}>
              Secara matematis, lingkaran bukanlah sebuah "luasan", melainkan <strong>kumpulan titik (lokus)</strong> 
              yang memiliki jarak yang persis sama terhadap satu titik tertentu (titik pusat). 
              Titik-titik ini saling terhubung membentuk suatu kurva tertutup sempurna yang tidak memiliki sudut.
            </p>
          </div>
          <div>
            <SectionLabel title="1. Anatomi Lingkaran" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Konstanta Universal (π)</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.8 }}>
              Dalam perhitungan lingkaran, kita selalu melibatkan <strong>π (Pi) ≈ 3.14159...</strong> 
              Pi bukanlah sembarang angka, melainkan rasio mutlak antara keliling lingkaran dengan diameternya.
              Tidak peduli sebesar apa pun lingkaran di alam semesta, jika Anda membagi kelilingnya dengan diameternya, 
              hasilnya selalu Pi.
            </p>
          </div>
        </TwoColumn>

        {/* Interactive Section */}
        <SectionLabel title="Laboratorium Visual" accent={accent} />
        <h2 className="type-section" style={{ marginBottom: '24px' }}>Eksplorasi Dinamis</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', maxWidth: '800px', lineHeight: 1.8 }}>
          Ubah nilai radius pada panel kontrol di bawah ini. Anda dapat menggunakan <em>slider</em> atau langsung mengetik angka pada kotak <em>input</em>.
          Arahkan kursor (hover) pada tombol-tombol inspeksi untuk melihat sorotan langsung ke anatomi lingkaran.
        </p>
        
        <CircleExplorer r={rVal} setR={setRVal} accent={accent} />

        {/* Sections 2 & 3 */}
        <TwoColumn>
          <div style={{ background: 'var(--navy-mid)', padding: '32px', border: '1px solid var(--border)' }}>
            <SectionLabel title="2. Pemisahan Unsur" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '24px', fontSize: '24px' }}>Garis vs Luasan</h2>
            <div style={{ color: 'var(--text-dim)', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p>Unsur lingkaran dibagi menjadi dua dimensi utama:</p>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Elemen Satu Dimensi (Garis):</strong>
                <BulletPoint accent={accent}><strong>Jari-jari (r):</strong> Jarak fundamental dari pusat ke kurva.</BulletPoint>
                <BulletPoint accent={accent}><strong>Diameter (d):</strong> Jarak terjauh antar dua sisi kurva (d=2r).</BulletPoint>
                <BulletPoint accent={accent}><strong>Tali Busur:</strong> Garis lurus yang memotong lingkaran.</BulletPoint>
                <BulletPoint accent={accent}><strong>Busur:</strong> Segmen lengkung pada keliling.</BulletPoint>
              </div>
              <div>
                <strong style={{ color: 'var(--text-bright)' }}>Elemen Dua Dimensi (Luasan):</strong>
                <BulletPoint accent={accent}><strong>Juring:</strong> Bidang diapit dua jari-jari dan satu busur (seperti pizza).</BulletPoint>
                <BulletPoint accent={accent}><strong>Tembereng:</strong> Bidang diapit satu tali busur dan busurnya.</BulletPoint>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <SectionLabel title="3. Dimensi Linear" accent={accent} />
              <h2 className="type-section" style={{ marginBottom: '16px', fontSize: '24px' }}>Keliling & Diameter</h2>
              <p style={{ color: 'var(--text-dim)' }}>
                Pertumbuhan keliling bersifat proporsional terhadap jari-jari. Jika Anda melipatgandakan jari-jari (misal r=2 ke r=4), keliling juga akan naik tepat dua kali lipat.
              </p>
              <FormulaBox formula="K = 2·π·r  atau  K = π·d" accent={accent} rgbAccent={rgbAccent} />
            </div>
            <div>
              <SectionLabel title="4. Dimensi Kuadratik" accent={accent} />
              <h2 className="type-section" style={{ marginBottom: '16px', fontSize: '24px' }}>Luas Area</h2>
              <p style={{ color: 'var(--text-dim)' }}>
                Pertumbuhan luas bersifat eksponensial (kuadrat). Perubahan kecil pada radius akan menghasilkan lonjakan besar pada luas area.
              </p>
              <FormulaBox formula="L = π·r²" accent={accent} rgbAccent={rgbAccent} />
            </div>
          </div>
        </TwoColumn>

        {/* Insight, Eksperimen, Kesalahan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', backgroundColor: 'var(--border)', border: '1px solid var(--border)' }}>
          <div style={{ backgroundColor: 'var(--navy-mid)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Insight Eksponensial" accent={accent} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', color: 'var(--text-bright)', lineHeight: 1.8, marginTop: '16px' }}>
              Jika Anda memesan pizza berukuran 20cm dan teman Anda memesan 40cm, pizza 40cm sebenarnya <strong style={{ color: accent }}>4 kali lipat lebih besar</strong>, bukan hanya 2 kali. (Karena luas r²)
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--navy-mid)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Pembuktian Pi" accent={accent} />
            <div style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.8, marginTop: '16px' }}>
              <p style={{ marginBottom: '12px' }}>
                <strong>Contoh Klasik:</strong><br/>
                Jika <span style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}>r = 7</span>, maka:<br/>
                Diameter = 14<br/>
                Keliling ≈ 44 (22/7 × 14)<br/>
                Luas ≈ 154 (22/7 × 7²)
              </p>
              <p>
                Pada panel kontrol, Anda juga bisa mencoba atur <span style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}>r = 5</span>.<br/>
                Diameternya = 10.<br/>
                Kelilingnya = 31.42.<br/>
                Coba bagi 31.42 / 10. Hasilnya adalah 3.14 (π).
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--navy-base)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Miskonsepsi" accent="var(--red)" />
            <div style={{ marginTop: '16px' }}>
              <BulletPoint accent="var(--red)">Mengira Juring dan Tembereng adalah garis, padahal mereka adalah luas (bidang).</BulletPoint>
              <BulletPoint accent="var(--red)">Menggunakan 22/7 untuk semua angka. Padahal 22/7 hanyalah pendekatan, bukan nilai Pi sebenarnya yang irasional.</BulletPoint>
            </div>
          </div>
        </div>
        {/* Kumpulan Rumus Section */}
        <div style={{ marginTop: 'var(--sp-xl)' }}>
          <SectionLabel title="Kumpulan Rumus" accent={accent} />
          <h2 className="type-section" style={{ marginBottom: '24px' }}>Lembar Referensi Lengkap</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '16px'
          }}>
            <FormulaBox label="Diameter (d)" formula="d = 2r" accent="var(--text-bright)" />
            <FormulaBox label="Keliling (K)" formula="K = 2πr = πd" accent="var(--text-bright)" />
            <FormulaBox label="Luas (L)" formula="L = πr²" accent="var(--text-bright)" />
            <FormulaBox label="Panjang Busur" formula="(θ/360) × 2πr" accent="var(--text-bright)" />
            <FormulaBox label="Luas Juring" formula="(θ/360) × πr²" accent="var(--text-bright)" />
            <FormulaBox label="Tali Busur" formula="2r × sin(θ/2)" accent="var(--text-bright)" />
            <FormulaBox label="Luas Segitiga Pusat" formula="½r² × sin(θ)" accent="var(--text-bright)" />
            <FormulaBox label="Luas Tembereng" formula="Luas Juring - Luas Segitiga" accent="var(--text-bright)" />
          </div>
        </div>

      </div>
    </div>
  );
}
