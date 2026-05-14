import { useState } from 'react';
import SectionLabel from '../components/SectionLabel';
import FormulaBox from '../components/FormulaBox';
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

const MiniParabola = ({ isUp, dType }) => {
  const points = [];
  for (let x = -20; x <= 20; x++) {
    let mathY = isUp ? (x * x * 0.1) : (-x * x * 0.1);
    if (dType === 'pos') mathY += (isUp ? -10 : 10);
    if (dType === 'neg') mathY += (isUp ? 10 : -10);
    points.push(`${x === -20 ? 'M' : 'L'} ${x} ${-mathY}`);
  }
  return (
    <svg width="100%" height="110" viewBox="-22 -55 44 110" style={{ overflow: 'visible', margin: '8px 0', display: 'block' }}>
      <line x1="-20" y1="0" x2="20" y2="0" stroke="var(--border)" strokeWidth="1.5" />
      <path d={points.join(' ')} fill="none" stroke="var(--blue-light)" strokeWidth="2.5" />
      {dType === 'pos' && (<><circle cx="-10" cy="0" r="1.5" fill="var(--red)" /><circle cx="10" cy="0" r="1.5" fill="var(--red)" /></>)}
      {dType === 'zero' && <circle cx="0" cy="0" r="1.5" fill="var(--red)" />}
    </svg>
  );
};

// InputRow defined OUTSIDE component to prevent remount on every render
const InputRow = ({ label, value, onChange, accent }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
    <label style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-dim)', width: '30px' }}>{label}=</label>
    <input
      type="number"
      value={value}
      onChange={onChange}
      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      style={{
        background: '#FFF',
        border: '1px solid var(--border)',
        color: 'var(--text-bright)',
        fontFamily: "'JetBrains Mono', monospace",
        padding: '6px 12px',
        width: '80px',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.borderColor = accent}
      onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
    />
  </div>
);

// All interactive state lives here — isolated from the static page
function InverseSimulator({ accent, rgbAccent }) {
  const [funcType, setFuncType] = useState('linear');
  const [aLin, setALin] = useState(2);
  const [bLin, setBLin] = useState(1);
  const [xLin, setXLin] = useState(3);
  const [aQuad, setAQuad] = useState(1);
  const [bQuad, setBQuad] = useState(0);
  const [cQuad, setCQuad] = useState(0);
  const [vx, setVx] = useState(-20);
  const [vy, setVy] = useState(-20);
  const [vw, setVw] = useState(40);
  const [vh, setVh] = useState(40);
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

  const aSafe = aLin === 0 ? 1 : aLin;
  const yLinResult = aLin * xLin + bLin;
  const linearSteps = [
    `f(${xLin}) = ${aLin}(${xLin}) ${bLin >= 0 ? '+' : '-'} ${Math.abs(bLin)} = ${yLinResult}`,
    `y = ${aLin}x ${bLin >= 0 ? '+' : '-'} ${Math.abs(bLin)}`,
    `x = ${aLin}y ${bLin >= 0 ? '+' : '-'} ${Math.abs(bLin)}`,
    `${aLin}y = x ${bLin >= 0 ? '-' : '+'} ${Math.abs(bLin)}`,
    `y = (x ${bLin >= 0 ? '-' : '+'} ${Math.abs(bLin)}) / ${aSafe}`,
    `f⁻¹(x) = (x ${bLin >= 0 ? '-' : '+'} ${Math.abs(bLin)}) / ${aSafe}`,
    `f⁻¹(${yLinResult}) = (${yLinResult} ${bLin >= 0 ? '-' : '+'} ${Math.abs(bLin)}) / ${aSafe} = ${xLin}`
  ];

  let tickInterval = 5;
  if (vw > 1000) tickInterval = 100;
  else if (vw > 400) tickInterval = 50;
  else if (vw > 100) tickInterval = 20;
  else if (vw > 50) tickInterval = 10;

  const plotStartX = vx - vw;
  const plotEndX = vx + vw * 2;
  const startX = Math.floor((vx - vw) / tickInterval) * tickInterval;
  const endX = Math.ceil((vx + vw * 2) / tickInterval) * tickInterval;
  const startY = Math.floor((vy - vh) / tickInterval) * tickInterval;
  const endY = Math.ceil((vy + vh * 2) / tickInterval) * tickInterval;
  const xLines = [];
  for (let i = startX; i <= endX; i += tickInterval) xLines.push(i);
  const yLines = [];
  for (let i = startY; i <= endY; i += tickInterval) yLines.push(i);

  return (
    <div className="interactive-section-desktop" style={{
      display: 'flex', flexDirection: 'column', gap: '1px',
      backgroundColor: 'var(--border)', border: '1px solid var(--border)', marginBottom: 'var(--sp-xl)'
    }}>
      {/* Visual */}
      <div style={{ backgroundColor: '#F8FAFC', minHeight: '400px', display: 'flex', alignItems: 'stretch', justifyContent: 'stretch', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{ width: '100%', height: '100%', position: 'relative', cursor: isDragging ? 'grabbing' : 'grab', userSelect: 'none', WebkitUserSelect: 'none' }}
          onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
          onTouchStart={onMouseDown} onTouchMove={onMouseMove} onTouchEnd={onMouseUp}
        >
          <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: '4px', zIndex: 10 }}>
            <button onClick={zoomIn} style={{ width: 32, height: 32, background: '#FFF', border: '1px solid var(--border)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>+</button>
            <button onClick={zoomOut} style={{ width: 32, height: 32, background: '#FFF', border: '1px solid var(--border)', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>-</button>
          </div>
          <svg width="100%" height="100%" viewBox={`${vx} ${vy} ${vw} ${vh}`} preserveAspectRatio="xMidYMid slice" style={{ overflow: 'hidden', display: 'block' }}>
            {xLines.map((pos) => pos === 0 ? null : (
              <g key={`x-${pos}`}>
                <line x1={pos} y1={vy - vh} x2={pos} y2={vy + vh*2} stroke="var(--navy-light)" strokeWidth={vw/400} />
                {pos % tickInterval === 0 && <text x={pos} y={vy + vh - vw*0.02} fontSize={vw/45} fontWeight="300" fill="var(--text-dim)" textAnchor="middle" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{pos}</text>}
              </g>
            ))}
            {yLines.map((pos) => pos === 0 ? null : (
              <g key={`y-${pos}`}>
                <line x1={vx - vw} y1={pos} x2={vx + vw*2} y2={pos} stroke="var(--navy-light)" strokeWidth={vw/400} />
                {pos % tickInterval === 0 && <text x={vx + vw*0.02} y={-pos + vw*0.01} fontSize={vw/45} fontWeight="300" fill="var(--text-dim)" textAnchor="start" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{pos}</text>}
              </g>
            ))}
            <line x1={vx - vw} y1="0" x2={vx + vw*2} y2="0" stroke="var(--text-dim)" strokeWidth={vw/200} />
            <line x1="0" y1={vy - vh} x2="0" y2={vy + vh*2} stroke="var(--text-dim)" strokeWidth={vw/200} />
            <text x={vw/80} y={vw/50} fontSize={vw/35} fill="var(--text-dim)" textAnchor="start" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>0</text>
            <line x1={plotStartX} y1={-plotStartX} x2={plotEndX} y2={-plotEndX} stroke="var(--text-dim)" strokeWidth={vw/250} strokeDasharray={`${vw/80},${vw/80}`} />
            {funcType === 'linear' && (<>
              <line x1={plotStartX} y1={-(aSafe * plotStartX + bLin)} x2={plotEndX} y2={-(aSafe * plotEndX + bLin)} stroke="var(--blue-light)" strokeWidth={vw/120} style={{ transition: 'all 0.3s' }} />
              <line x1={plotStartX} y1={-((plotStartX - bLin) / aSafe)} x2={plotEndX} y2={-((plotEndX - bLin) / aSafe)} stroke={accent} strokeWidth={vw/120} style={{ transition: 'all 0.3s' }} />
              <circle cx={xLin} cy={-yLinResult} r={vw/45} fill="var(--blue-light)" stroke="#FFFFFF" strokeWidth={vw/150} />
              <text x={xLin + vw/35} y={-yLinResult - vw/35} fontSize={vw/35} fill="var(--blue-light)" stroke="#FFFFFF" strokeWidth={vw/300} paintOrder="stroke" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '900' }}>({xLin}, {yLinResult})</text>
              <circle cx={yLinResult} cy={-xLin} r={vw/45} fill={accent} stroke="#FFFFFF" strokeWidth={vw/150} />
              <text x={yLinResult + vw/35} y={-xLin + vw/25} fontSize={vw/35} fill={accent} stroke="#FFFFFF" strokeWidth={vw/300} paintOrder="stroke" style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: '900' }}>({yLinResult}, {xLin})</text>
              <line x1={xLin} y1={-yLinResult} x2={yLinResult} y2={-xLin} stroke="var(--text-dim)" strokeWidth={vw/300} strokeDasharray={`${vw/50},${vw/50}`} />
            </>)}
            {funcType === 'square' && (<>
              <path d={[...Array(201)].map((_, i) => { const x = plotStartX + (i/200)*(plotEndX-plotStartX); const y = aQuad*x*x + bQuad*x + cQuad; return `${i===0?'M':'L'} ${x} ${-y}`; }).join(' ')} fill="none" stroke="var(--blue-light)" strokeWidth={vw/120} style={{ transition: 'all 0.3s' }} />
              {aQuad !== 0 && (<>
                <line x1={plotStartX} y1={-Math.abs(cQuad + 4)} x2={plotEndX} y2={-Math.abs(cQuad + 4)} stroke="var(--red)" strokeWidth={vw/200} strokeDasharray={`${vw/50},${vw/50}`} />
                <text x="0" y={-Math.abs(cQuad + 4) - vw/50} fontSize={vw/35} textAnchor="middle" fill="var(--red)">Uji Garis Horizontal (Gagal)</text>
              </>)}
            </>)}
          </svg>
          <div style={{ position: 'absolute', bottom: '16px', right: '16px', fontFamily: "'JetBrains Mono', monospace", fontSize: '10px', color: 'var(--text-dim)', background: '#FFF', padding: '4px 8px', border: '1px solid var(--border)' }}>
            Biru: f(x) | <span style={{ color: accent }}>Cyan: f⁻¹(x)</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ backgroundColor: '#FFFFFF', padding: 'var(--sp-lg)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <SectionLabel title="Kontrol Grafik" accent={accent} />
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
            <button onClick={() => setFuncType('linear')} style={{ flex: 1, padding: '8px', fontFamily: "'Syne', sans-serif", fontSize: '12px', background: funcType === 'linear' ? accent : '#FFF', color: funcType === 'linear' ? '#FFF' : 'var(--text-bright)', border: `1px solid ${funcType === 'linear' ? accent : 'var(--border)'}`, transition: 'all 0.2s', cursor: 'pointer' }}>Fungsi Linear</button>
            <button onClick={() => setFuncType('square')} style={{ flex: 1, padding: '8px', fontFamily: "'Syne', sans-serif", fontSize: '12px', background: funcType === 'square' ? accent : '#FFF', color: funcType === 'square' ? '#FFF' : 'var(--text-bright)', border: `1px solid ${funcType === 'square' ? accent : 'var(--border)'}`, transition: 'all 0.2s', cursor: 'pointer' }}>Fungsi Kuadrat</button>
          </div>
          {funcType === 'linear' && (
            <div style={{ background: '#F8FAFC', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-bright)', marginBottom: '16px', fontSize: '15px' }}>f(x) = a·x + b</div>
              <InputRow label="a" value={aLin} onChange={(e) => setALin(Number(e.target.value))} accent={accent} />
              <InputRow label="b" value={bLin} onChange={(e) => setBLin(Number(e.target.value))} accent={accent} />
              <div style={{ borderTop: '1px solid var(--border)', margin: '12px 0' }} />
              <InputRow label="x" value={xLin} onChange={(e) => setXLin(Number(e.target.value))} accent={accent} />
            </div>
          )}
          {funcType === 'square' && (
            <div style={{ background: '#F8FAFC', padding: '16px', border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--text-bright)', marginBottom: '16px', fontSize: '15px' }}>f(x) = a·x² + b·x + c</div>
              <InputRow label="a" value={aQuad} onChange={(e) => setAQuad(Number(e.target.value))} accent={accent} />
              <InputRow label="b" value={bQuad} onChange={(e) => setBQuad(Number(e.target.value))} accent={accent} />
              <InputRow label="c" value={cQuad} onChange={(e) => setCQuad(Number(e.target.value))} accent={accent} />
              <div style={{
                marginTop: '12px',
                padding: '10px 12px',
                background: `rgba(2, 132, 199, 0.06)`,
                borderLeft: `2px solid ${accent}`,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-dim)',
                lineHeight: 1.8
              }}>
                <span style={{ color: accent, fontWeight: 600 }}>Contoh D &gt; 0 (gagal):</span><br/>
                a=1, b=5, c=4 → D=9 &gt; 0<br/>
                a=1, b=-3, c=2 → D=1 &gt; 0<br/>
                <br/>
                <span style={{ color: 'var(--green)', fontWeight: 600 }}>Contoh D ≤ 0 (bisa):</span><br/>
                a=1, b=0, c=1 → D=-4 ≤ 0<br/>
                a=1, b=2, c=5 → D=-16 ≤ 0
              </div>
            </div>
          )}
          <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }}>
            {funcType === 'linear' ? (
              <>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: 'var(--text-dim)', marginBottom: '12px', textTransform: 'uppercase' }}>Penyelesaian</div>
                <FormulaBox label="f⁻¹(x)" formula={`f⁻¹(x) = (x ${bLin >= 0 ? '-' : '+'} ${Math.abs(bLin)}) / ${aSafe}`} accent={accent} rgbAccent={rgbAccent} steps={linearSteps} />
              </>
            ) : (
              (() => {
                const D = bQuad * bQuad - 4 * aQuad * cQuad;
                const canInverse = D <= 0;
                return canInverse ? (
                  <div style={{ background: 'rgba(22, 163, 74, 0.05)', border: '1px solid var(--green)', padding: '12px', color: 'var(--green)', fontSize: '13px', lineHeight: 1.6 }}>
                    <strong>D = {D.toFixed(2)} ≤ 0</strong> — Parabola tidak memotong sumbu X di dua titik berbeda. Fungsi ini <strong>bisa diinverskan</strong> dengan membatasi domain.
                  </div>
                ) : (
                  <>
                    <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: 'var(--red)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700 }}>Mengapa Kuadrat Gagal Diinverskan?</div>
                    <div style={{ background: 'rgba(220, 38, 38, 0.05)', border: '1px solid var(--red)', padding: '12px', color: 'var(--red)', fontSize: '13px', lineHeight: 1.6 }}>
                      <strong>D = {D.toFixed(2)} &gt; 0</strong> — Parabola memotong sumbu X di <strong>dua titik berbeda</strong>. Satu nilai "y" dimiliki oleh dua nilai "x", sehingga fungsi ini <strong>tidak bisa diinverskan</strong> tanpa membatasi domain.
                      <br/><br/>
                      Coba ubah nilai a, b, c agar D ≤ 0 (contoh: a=1, b=0, c=1).
                    </div>
                  </>
                );
              })()
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Inverse() {
  const accent = 'var(--cyan)';
  const rgbAccent = '2, 132, 199';

  return (
    <div style={{ color: 'var(--text-bright)', userSelect: 'none', WebkitUserSelect: 'none', position: 'relative' }}>
      <MathBackground />
      <section className="pu container" style={{ paddingTop: 'var(--sp-hero)', paddingBottom: 'var(--sp-hero)', borderBottom: '1px solid var(--border)', marginBottom: 'var(--sp-xl)', position: 'relative' }}>
        <SectionLabel title="Bab 01" accent={accent} />
        <h1 className="type-hero" style={{ marginTop: 'var(--sp-md)', marginBottom: 'var(--sp-md)' }}>Fungsi <em>Invers</em></h1>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '24px', color: accent, opacity: 0.8 }}>f(x) → f⁻¹(x)</div>
      </section>

      <div className="container">
        <div style={{ backgroundColor: '#F8FAFC', padding: 'var(--sp-xl)', border: '1px solid var(--border)', marginBottom: 'var(--sp-xxl)' }}>
          <SectionLabel title="Kamus Istilah Dasar" accent={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginTop: '16px' }}>
            <div><strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Koefisien</strong><p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Angka pengali yang menempel pada variabel (misal angka 2 pada `2x`). Menentukan seberapa miring atau curam grafik tersebut.</p></div>
            <div><strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Konstanta</strong><p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Angka yang berdiri sendiri tanpa huruf variabel (misal `+ 5`). Angka ini menentukan di mana persisnya grafik memotong sumbu Y.</p></div>
            <div><strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Variabel</strong><p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Huruf (`x`, `y`) yang mewakili angka input dan output yang bisa berubah-ubah posisinya.</p></div>
            <div><strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Diskriminan (D)</strong><p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Nilai khusus pada persamaan kuadrat (`D = b² - 4ac`) yang memberitahu kita apakah kurva menabrak sumbu X atau malah melayang.</p></div>
          </div>
        </div>

        <TwoColumn>
          <div>
            <SectionLabel title="0. Orientasi Materi" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Menelusuri Jejak Mundur</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.8 }}>Setiap kali sebuah fungsi memanipulasi sebuah angka dari <em>input</em> menjadi <em>output</em>, fungsi invers bertugas sebagai detektif yang menelusuri jejak tersebut untuk mendapatkan angka aslinya kembali.</p>
          </div>
          <div>
            <SectionLabel title="1. Algoritma Dasar" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Cara Mencari Invers</h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>Proses mencari rumus fungsi invers selalu mengikuti 4 langkah baku ini:</p>
            <div style={{ color: 'var(--text-dim)', lineHeight: 1.8, marginTop: '16px', paddingLeft: '16px', borderLeft: `2px solid ${accent}` }}>
              1. <strong>Tulis Ulang:</strong> Ganti notasi f(x) dengan "y".<br/>
              2. <strong>Tukar Variabel:</strong> Ubah semua huruf "x" menjadi "y", dan "y" menjadi "x".<br/>
              3. <strong>Isolasi y:</strong> Pindahkan semua angka hingga huruf "y" sendirian di satu sisi persamaan.<br/>
              4. <strong>Finalisasi:</strong> Ganti huruf "y" baru tersebut menjadi f⁻¹(x).
            </div>
          </div>
        </TwoColumn>

        <SectionLabel title="Laboratorium Invers" accent={accent} />
        <h2 className="type-section" style={{ marginBottom: '24px' }}>Eksplorasi Pencerminan Grafik</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', maxWidth: '800px', lineHeight: 1.8 }}>
          Grafik fungsi invers adalah pencerminan (refleksi) fungsi aslinya terhadap garis diagonal imajiner <strong>y = x</strong>. Silakan <strong>atur nilai x</strong> di panel kanan. Grafik ini bisa <strong>ditarik (geser)</strong> dan <strong>di-zoom</strong> melalui tombol +/-.
        </p>

        <InverseSimulator accent={accent} rgbAccent={rgbAccent} />

        <div style={{ marginTop: 'var(--sp-xxl)' }}>
          <SectionLabel title="Karakteristik Parabola" accent={accent} />
          <h2 className="type-section" style={{ marginBottom: '16px' }}>Bentuk Grafik Fungsi Kuadrat</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '24px', lineHeight: 1.8 }}>Untuk fungsi kuadrat <code>f(x) = ax² + bx + c</code>, bentuk grafiknya sangat dipengaruhi oleh nilai <strong>Koefisien a</strong> dan <strong>Diskriminan D = b² - 4ac</strong>.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: 'var(--sp-xxl)' }}>
            <div style={{ background: '#FFF', border: '1px solid var(--border)', padding: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Fraunces', serif", color: 'var(--text-bright)', marginBottom: '12px' }}>Jika a &gt; 0 (Terbuka Ke Atas)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={true} dType="pos" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D &gt; 0:</strong> Parabola memotong sumbu X di 2 titik berbeda (Akar nyata).</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={true} dType="zero" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D = 0:</strong> Parabola tepat menyinggung sumbu X di 1 titik (Akar kembar).</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={true} dType="neg" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D &lt; 0:</strong> Parabola melayang di atas sumbu X (Definit Positif).</p></div>
            </div>
            <div style={{ background: '#FFF', border: '1px solid var(--border)', padding: '24px' }}>
              <div style={{ fontSize: '18px', fontWeight: 700, fontFamily: "'Fraunces', serif", color: 'var(--text-bright)', marginBottom: '12px' }}>Jika a &lt; 0 (Terbuka Ke Bawah)</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={false} dType="pos" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D &gt; 0:</strong> Parabola memotong sumbu X di 2 titik berbeda.</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={false} dType="zero" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D = 0:</strong> Parabola tepat menyinggung sumbu X di 1 titik.</p></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><MiniParabola isUp={false} dType="neg" /><p style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.5 }}><strong>D &lt; 0:</strong> Parabola melayang di bawah sumbu X (Definit Negatif).</p></div>
            </div>
          </div>

          <SectionLabel title="Kumpulan Rumus" accent={accent} />
          <h2 className="type-section" style={{ marginBottom: '16px' }}>3 Cara Menyelesaikan Persamaan Kuadrat</h2>
          <p style={{ color: 'var(--text-dim)', marginBottom: '24px', lineHeight: 1.8 }}>Untuk mencari di titik mana kurva menyentuh sumbu X, kita bisa menyelesaikan persamaan <code>ax² + bx + c = 0</code> menggunakan 3 rumus ini.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <FormulaBox label="1. Pemfaktoran (Angka Bulat)" formula="(x - x₁)(x - x₂) = 0" accent="var(--cyan)" steps={['Contoh: x² + 5x + 6 = 0', '(x + 2)(x + 3) = 0', 'x₁ = -2, x₂ = -3']} />
            <FormulaBox label="2. Kuadrat Sempurna" formula="(x + p)² = q" accent="var(--cyan)" steps={['Contoh: x² + 6x + 5 = 0', 'x² + 6x = -5', '(x + 3)² - 9 = -5', '(x + 3)² = 4', 'x + 3 = ±2', 'x₁ = -1, x₂ = -5']} />
            <FormulaBox label="3. Rumus ABC (Paling Ampuh)" formula="x = (-b ± √D) / 2a" accent="var(--cyan)" steps={['Contoh: 2x² - 5x - 3 = 0', 'x = (5 ± √(25 - 4(2)(-3))) / 4', 'x = (5 ± √49) / 4', 'x = (5 ± 7) / 4', 'x₁ = 3, x₂ = -0.5']} />
          </div>
        </div>
      </div>
    </div>
  );
}
