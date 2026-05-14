import { useState } from 'react';
import { evaluate } from 'mathjs';
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

function MachineRow({ x, gFunc, fFunc, accent }) {
  // Use mathjs to evaluate safely
  const evalMath = (expr, scope) => {
    try {
      // Small formatting fixes
      const cleanExpr = expr.replace(/X/g, 'x').trim();
      if (!cleanExpr) return '?';
      const result = evaluate(cleanExpr, scope);
      if (typeof result === 'number' && !isNaN(result)) {
        return Math.round(result * 100) / 100; // round to 2 decimals
      }
      return '?';
    } catch (e) {
      return 'Err';
    }
  };

  const gResult = evalMath(gFunc, { x });
  const fResult = typeof gResult === 'number' ? evalMath(fFunc, { x: gResult }) : 'Err';

  const BoxIO = ({ val }) => (
    <div style={{
      background: 'var(--navy-mid)',
      border: '1px solid var(--border)',
      padding: '16px 24px',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '24px',
      color: 'var(--text-bright)',
      minWidth: '80px',
      textAlign: 'center',
      position: 'relative'
    }}>
      {val}
    </div>
  );

  const BoxFunc = ({ label, func }) => (
    <div style={{
      background: `rgba(251, 146, 60, 0.15)`,
      border: `1px solid rgba(251, 146, 60, 0.4)`,
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: '160px'
    }}>
      <span style={{
        fontFamily: "'Fraunces', serif",
        fontSize: '18px',
        color: accent,
        fontWeight: 700,
        marginBottom: '8px'
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: 'var(--text-bright)',
        opacity: 0.8
      }}>
        {func}
      </span>
    </div>
  );

  const Arrow = () => (
    <div style={{
      color: `rgba(251, 146, 60, 0.5)`,
      fontSize: '24px',
      fontFamily: "'JetBrains Mono', monospace"
    }}>
      →
    </div>
  );

  return (
    <div className="machine-row-desktop" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      overflowX: 'auto',
      padding: '40px 16px',
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid var(--border)',
      minHeight: '200px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Input Awal</span>
        <BoxIO val={x} />
      </div>
      <Arrow />
      <BoxFunc label="Mesin 1" func={gFunc} />
      <Arrow />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Hasil G(x)</span>
        <BoxIO val={gResult} />
      </div>
      <Arrow />
      <BoxFunc label="Mesin 2" func={fFunc} />
      <Arrow />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: '10px', color: accent, textTransform: 'uppercase', fontWeight: 700 }}>Output Akhir</span>
        <BoxIO val={fResult} />
      </div>
    </div>
  );
}

const InputControl = ({ label, value, onChange, type = "text", accent }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: '150px' }}>
    <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
      {label}
    </label>
    <input 
      type={type}
      value={value}
      onChange={onChange}
      onKeyDown={(e) => { if (e.key === 'Enter') e.preventDefault(); }}
      style={{
        background: 'var(--navy-deep)',
        border: `1px solid var(--border)`,
        color: 'var(--text-bright)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '16px',
        padding: '12px',
        width: '100%',
        outline: 'none'
      }}
      onFocus={(e) => e.target.style.borderColor = accent}
      onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
    />
  </div>
);

export default function Composition() {
  const accent = 'var(--orange)';
  const rgbAccent = '251, 146, 60';

  const [funcType, setFuncType] = useState('linear'); // linear or quadratic
  const [xVal, setXVal] = useState(2);
  
  // Linear default
  const [fInputLinear, setFInputLinear] = useState('2 * x');
  const [gInputLinear, setGInputLinear] = useState('x + 1');
  
  // Quadratic default
  const [fInputQuadratic, setFInputQuadratic] = useState('x^2');
  const [gInputQuadratic, setGInputQuadratic] = useState('x + 2');
  
  const [order, setOrder] = useState('fog'); // fog = g runs first, then f

  // Use appropriate inputs based on funcType
  const fInput = funcType === 'linear' ? fInputLinear : fInputQuadratic;
  const gInput = funcType === 'linear' ? gInputLinear : gInputQuadratic;
  const setFInput = funcType === 'linear' ? setFInputLinear : setFInputQuadratic;
  const setGInput = funcType === 'linear' ? setGInputLinear : setGInputQuadratic;

  const currentFunc1 = order === 'fog' ? gInput : fInput;
  const currentFunc2 = order === 'fog' ? fInput : gInput;

  return (
    <div style={{ color: 'var(--text-bright)', userSelect: 'none', WebkitUserSelect: 'none', position: 'relative' }}>
      <MathBackground />
      {/* Hero Band */}
      <section className="pu container" style={{
        paddingTop: 'var(--sp-hero)',
        paddingBottom: 'var(--sp-hero)',
        borderBottom: '1px solid var(--border)',
        marginBottom: 'var(--sp-xl)',
        position: 'relative'
      }}>
        <SectionLabel title="Bab 02" accent={accent} />
        <h1 className="type-hero" style={{ marginTop: 'var(--sp-md)', marginBottom: 'var(--sp-md)' }}>
          Fungsi <em>Komposisi</em>
        </h1>
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '24px',
          color: accent,
          opacity: 0.8
        }}>
          (f ∘ g)(x) = f(g(x))
        </div>
      </section>

      <div className="container">
        {/* Kamus Istilah */}
        <div style={{ backgroundColor: '#F8FAFC', padding: 'var(--sp-xl)', border: '1px solid var(--border)', marginBottom: 'var(--sp-xxl)' }}>
          <SectionLabel title="Kamus Istilah Penting" accent={accent} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', marginTop: '16px' }}>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Fungsi Komposisi</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Operasi menggabungkan dua fungsi atau lebih secara berurutan. Output fungsi pertama menjadi input fungsi kedua.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>(f ∘ g)(x)</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Notasi komposisi, dibaca "f bundaran g dari x". Sama dengan f(g(x)). Kerjakan g terlebih dahulu, lalu f.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Fungsi Dalam (Inner)</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Fungsi yang dikerjakan pertama kali. Dalam (f∘g)(x), fungsi g adalah fungsi dalam.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Fungsi Luar (Outer)</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Fungsi yang dikerjakan terakhir. Dalam (f∘g)(x), fungsi f adalah fungsi luar yang membungkus hasil g.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Komutatif</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Sifat operasi yang hasilnya sama meskipun urutan dibalik. Komposisi fungsi TIDAK komutatif: f∘g ≠ g∘f.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Asosiatif</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Sifat operasi yang hasilnya sama meskipun pengelompokan berbeda. Komposisi fungsi bersifat asosiatif: (f∘g)∘h = f∘(g∘h).</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Domain Komposisi</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Himpunan nilai x yang membuat komposisi terdefinisi. Range fungsi dalam harus masuk ke domain fungsi luar.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Substitusi</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Proses mengganti variabel x dalam fungsi dengan ekspresi lain. Kunci utama dalam menghitung komposisi.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Pipelining</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Istilah dalam programming untuk proses berantai. Data mengalir dari satu fungsi ke fungsi berikutnya secara berurutan.</p>
            </div>
            <div>
              <strong style={{ color: 'var(--text-bright)', fontSize: '15px' }}>Fungsi Identitas I(x)</strong>
              <p style={{ color: 'var(--text-dim)', fontSize: '14px', marginTop: '4px', lineHeight: 1.6 }}>Fungsi khusus I(x) = x yang tidak mengubah input. Berlaku: f∘I = I∘f = f.</p>
            </div>
          </div>
        </div>

        {/* Sections 0 & 1 */}
        <TwoColumn>
          <div>
            <SectionLabel title="0. Orientasi Materi" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Mekanisme Rantai</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.8 }}>
              Bayangkan fungsi sebagai sebuah pabrik manufaktur. Komposisi adalah proses merangkaikan beberapa pabrik sekaligus.
              Produk setengah jadi dari Pabrik 1 langsung dimasukkan ke jalur perakitan Pabrik 2 tanpa henti.
              Di dunia komputasi dan programming, ini identik dengan konsep <em>pipelining</em>.
            </p>
          </div>
          <div>
            <SectionLabel title="1. Anatomi Komposisi" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Garis Waktu Operasi</h2>
            <p style={{ color: 'var(--text-dim)', marginBottom: '16px', lineHeight: 1.8 }}>
              Secara matematis, komposisi terjadi ketika sebuah fungsi <strong>menelan fungsi lain</strong> sebagai masukannya.
              Jika fungsi normal menelan angka <code style={{color:accent}}>f(2)</code>, fungsi komposisi menelan operasi lain <code style={{color:accent}}>f( g(2) )</code>.
            </p>
            <div style={{ background: 'var(--navy-mid)', padding: '16px', borderLeft: `2px solid ${accent}` }}>
              <p style={{ color: 'var(--text-dim)', marginBottom: '8px' }}>Contoh:</p>
              <FormulaBox formula="g(x) = x + 1" accent={accent} rgbAccent={rgbAccent} />
              <FormulaBox formula="f(x) = 2x" accent={accent} rgbAccent={rgbAccent} />
              <p style={{ color: 'var(--text-dim)', marginTop: '8px', lineHeight: 1.8 }}>
                Jika kita mulai dengan <code style={{color:accent}}>x = 2</code>, maka:<br/>
                Mesin pertama memproses: <code style={{color:accent}}>2 → 3</code> (karena 2+1=3).<br/>
                Mesin kedua memproses: <code style={{color:accent}}>3 → 6</code> (karena 2*3=6).<br/>
                Alurnya adalah: <strong style={{color:accent}}>2 → 3 → 6</strong>.
              </p>
            </div>
          </div>
        </TwoColumn>

        {/* Interactive Section */}
        <SectionLabel title="Laboratorium Komposisi" accent={accent} />
        <h2 className="type-section" style={{ marginBottom: '24px' }}>Rakit Mesin Anda Sendiri</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', maxWidth: '800px', lineHeight: 1.8 }}>
          Di bawah ini adalah simulator mesin komposisi. Anda dapat <strong>mengganti persamaan matematika</strong> untuk f(x) dan g(x) secara bebas (contoh: <code style={{color:accent}}>x^2</code>, <code style={{color:accent}}>2*x+5</code>, <code style={{color:accent}}>sin(x)</code>).
          Ubah nilai input x dan amati bagaimana angka mengalir melalui mesin-mesin tersebut.
          <br/><br/>
          <strong>Pilih tab "Fungsi Linear"</strong> untuk contoh sederhana seperti <code style={{color:accent}}>f(x) = 2x</code> dan <code style={{color:accent}}>g(x) = x + 1</code>.
          <br/>
          <strong>Pilih tab "Fungsi Kuadrat"</strong> untuk contoh yang lebih kompleks seperti <code style={{color:accent}}>f(x) = x^2</code> dan <code style={{color:accent}}>g(x) = x + 2</code>.
        </p>

        <div style={{ marginBottom: 'var(--sp-xl)' }}>
          {/* Tab Selector */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <button 
              onClick={() => setFuncType('linear')}
              style={{
                flex: 1, padding: '12px', fontFamily: "'Syne', sans-serif", fontSize: '14px',
                background: funcType === 'linear' ? accent : 'var(--navy-mid)',
                color: funcType === 'linear' ? '#FFF' : 'var(--text-bright)',
                border: `1px solid ${funcType === 'linear' ? accent : 'var(--border)'}`,
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              Fungsi Linear
            </button>
            <button 
              onClick={() => setFuncType('quadratic')}
              style={{
                flex: 1, padding: '12px', fontFamily: "'Syne', sans-serif", fontSize: '14px',
                background: funcType === 'quadratic' ? accent : 'var(--navy-mid)',
                color: funcType === 'quadratic' ? '#FFF' : 'var(--text-bright)',
                border: `1px solid ${funcType === 'quadratic' ? accent : 'var(--border)'}`,
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
            >
              Fungsi Kuadrat
            </button>
          </div>

          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '24px', 
            marginBottom: '1px', 
            background: 'var(--navy-mid)', 
            padding: '24px', 
            border: '1px solid var(--border)',
            borderBottom: 'none'
          }}>
            <InputControl 
              label="Fungsi f(x)" 
              value={fInput} 
              onChange={(e) => setFInput(e.target.value)}
              accent={accent}
            />
            <InputControl 
              label="Fungsi g(x)" 
              value={gInput} 
              onChange={(e) => setGInput(e.target.value)}
              accent={accent}
            />
            <InputControl 
              label="Nilai Input (x)" 
              type="number"
              value={xVal} 
              onChange={(e) => setXVal(Number(e.target.value))}
              accent={accent}
            />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: '150px' }}>
              <label style={{ fontFamily: "'Syne', sans-serif", fontSize: '12px', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                Urutan Operasi
              </label>
              <button 
                onClick={() => setOrder(order === 'fog' ? 'gof' : 'fog')}
                style={{
                  background: 'transparent',
                  border: `1px solid ${accent}`,
                  color: accent,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '16px',
                  padding: '12px',
                  width: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={e => { e.target.style.background = `rgba(${rgbAccent}, 0.1)`; }}
                onMouseLeave={e => { e.target.style.background = 'transparent'; }}
              >
                {order === 'fog' ? '(f ∘ g)(x)' : '(g ∘ f)(x)'}
              </button>
            </div>
          </div>

          <MachineRow 
            x={xVal} 
            gFunc={currentFunc1} 
            fFunc={currentFunc2} 
            accent={accent} 
          />
        </div>

        {/* Sections 2, 3 & 4 */}
        <TwoColumn>
          <div>
            <SectionLabel title="2. Dekode Notasi" accent={accent} />
            <h2 className="type-section" style={{ marginBottom: '16px' }}>Aturan Membaca (f∘g)(x)</h2>
            <div style={{ background: 'var(--navy-mid)', padding: '24px', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
                Banyak siswa terkecoh. Simbol <strong>(f∘g)(x)</strong> dibaca dari kiri ke kanan, 
                tetapi <strong style={{ color: accent }}>dikerjakan dari kanan ke kiri</strong>.
                <br/><br/>
                Operasi ini persis sama dengan:
              </p>
              <FormulaBox formula="f( g(x) )" accent={accent} rgbAccent={rgbAccent} />
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8, marginTop: '16px' }}>
                Jadi, kerjakan yang paling dalam (g) terlebih dahulu, baru bungkus dengan yang luar (f).
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div>
              <SectionLabel title="3. Hukum Komutatif" accent={accent} />
              <h2 className="type-section" style={{ marginBottom: '16px' }}>f∘g Berbeda dengan g∘f</h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
                Berbeda dengan perkalian (2×3 = 3×2), fungsi komposisi <strong>tidak berlaku komutatif</strong>. 
                Memakai kaus kaki lalu sepatu, berbeda hasilnya dengan memakai sepatu lalu kaus kaki. Urutan adalah segalanya.
              </p>
            </div>
            <div>
              <SectionLabel title="4. Syarat Komposisi" accent={accent} />
              <h2 className="type-section" style={{ marginBottom: '16px' }}>Kesesuaian Domain</h2>
              <p style={{ color: 'var(--text-dim)', lineHeight: 1.8 }}>
                Tidak semua fungsi bisa dikomposisikan! Syarat mutlaknya adalah: <strong>Daerah Hasil (Range) dari mesin pertama harus berada di dalam rentang Daerah Asal (Domain) mesin kedua.</strong> 
                Jika mesin kedua tidak bisa menerima bahan dari mesin pertama, rantai akan terputus.
              </p>
            </div>
          </div>
        </TwoColumn>

        {/* Insight, Eksperimen, Kesalahan */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1px', backgroundColor: 'var(--border)', border: '1px solid var(--border)', marginBottom: 'var(--sp-xxl)' }}>
          <div style={{ backgroundColor: 'var(--navy-mid)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Mental Model" accent={accent} />
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '15px', color: 'var(--text-bright)', lineHeight: 1.8, marginTop: '16px' }}>
              Jangan anggap "x" sebagai angka mati. Anggap "x" sebagai sebuah <strong>kotak kosong</strong> (placeholder). Saat Anda menyubstitusi g(x) ke dalam f(x), Anda sedang memindahkan seluruh struktur g(x) ke dalam setiap kotak "x" yang ada di f.
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--navy-mid)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Eksperimen Sendiri" accent={accent} />
            <div style={{ color: 'var(--text-dim)', fontSize: '14px', lineHeight: 1.8, marginTop: '16px' }}>
              Gunakan panel di atas. Atur:<br/>
              <span style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}>f(x) = x^2</span><br/>
              <span style={{ color: accent, fontFamily: "'JetBrains Mono', monospace" }}>g(x) = x + 2</span><br/>
              Lalu hitung (f∘g)(3). Hasilnya 25. Lalu tekan tombol "Tukar Urutan" menjadi (g∘f)(3). Hasilnya 11. Terbukti tidak komutatif!
            </div>
          </div>
          <div style={{ backgroundColor: 'var(--navy-base)', padding: 'var(--sp-xl)' }}>
            <SectionLabel title="Area Berbahaya" accent="var(--red)" />
            <div style={{ marginTop: '16px' }}>
              <BulletPoint accent="var(--red)">Mengira (f∘g)(x) sama dengan f(x) * g(x). Komposisi <strong>BUKAN</strong> perkalian!</BulletPoint>
              <BulletPoint accent="var(--red)">Lupa memberikan tanda kurung saat substitusi kuadrat, misal x^2 diisi (x+2) malah jadi x+2^2 alih-alih (x+2)^2.</BulletPoint>
            </div>
          </div>
        </div>

        {/* Rumus-Rumus Penting */}
        <SectionLabel title="Kumpulan Rumus" accent={accent} />
        <h2 className="type-section" style={{ marginBottom: '16px' }}>Rumus-Rumus Fungsi Komposisi</h2>
        <p style={{ color: 'var(--text-dim)', marginBottom: '24px', lineHeight: 1.8 }}>
          Berikut adalah rumus-rumus dan sifat-sifat penting dalam fungsi komposisi:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: 'var(--sp-xl)' }}>
          <FormulaBox 
            label="Definisi Dasar" 
            formula="(f ∘ g)(x) = f(g(x))" 
            accent={accent}
            steps={['Kerjakan g(x) terlebih dahulu', 'Hasil g(x) masukkan ke f', 'Urutan: dari dalam ke luar', '', 'Contoh: f(x) = 2x, g(x) = x + 1', '(f ∘ g)(3) = f(g(3)) = f(4) = 8']}
          />
          <FormulaBox 
            label="Tidak Komutatif" 
            formula="f ∘ g ≠ g ∘ f" 
            accent={accent}
            steps={['Urutan sangat penting', 'f(g(x)) ≠ g(f(x))', 'Kecuali kasus khusus tertentu', '', 'Contoh: f(x) = x², g(x) = x + 2', '(f∘g)(x) = (x+2)² ≠ (g∘f)(x) = x²+2']}
          />
          <FormulaBox 
            label="Sifat Asosiatif" 
            formula="(f ∘ g) ∘ h = f ∘ (g ∘ h)" 
            accent={accent}
            steps={['Pengelompokan tidak masalah', 'Urutan tetap: h → g → f', 'Berlaku untuk 3+ fungsi', '', 'Contoh: f(x)=2x, g(x)=x+1, h(x)=x²', 'Keduanya menghasilkan 2(x²+1)']}
          />
          <FormulaBox 
            label="Fungsi Identitas" 
            formula="f ∘ I = I ∘ f = f" 
            accent={accent}
            steps={['I(x) = x (fungsi identitas)', 'Tidak mengubah fungsi lain', 'Seperti mengalikan dengan 1', '', 'Contoh: f(x) = 3x + 2', 'f(I(x)) = f(x) = 3x + 2']}
          />
          <FormulaBox 
            label="Komposisi dengan Invers" 
            formula="f ∘ f⁻¹ = f⁻¹ ∘ f = I" 
            accent={accent}
            steps={['Fungsi dan inversnya saling membatalkan', 'Menghasilkan fungsi identitas', 'f(f⁻¹(x)) = x', '', 'Contoh: f(x) = 2x + 1, f⁻¹(x) = (x-1)/2', 'f(f⁻¹(x)) = 2((x-1)/2) + 1 = x']}
          />
          <FormulaBox 
            label="Invers Komposisi" 
            formula="(f ∘ g)⁻¹ = g⁻¹ ∘ f⁻¹" 
            accent={accent}
            steps={['Urutan invers dibalik', 'Seperti melepas sepatu lalu kaus kaki', 'Penting untuk soal kompleks', '', 'Contoh: Jika pakai g dulu lalu f', 'Maka lepasnya f⁻¹ dulu lalu g⁻¹']}
          />
        </div>

      </div>
    </div>
  );
}
