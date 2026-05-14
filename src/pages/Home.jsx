import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionLabel from '../components/SectionLabel';
import BulletPoint from '../components/BulletPoint';
import MathBackground from '../components/MathBackground';

const chapters = [
  {
    id: '01',
    title: 'Fungsi Invers',
    desc: 'Membalik cara kerja fungsi. Mengubah y kembali menjadi x melalui pencerminan.',
    path: '/invers',
    accent: 'var(--cyan)',
    rgbAccent: '34, 211, 238',
    preview: 'x → y  ⇒  y → x'
  },
  {
    id: '02',
    title: 'Fungsi Komposisi',
    desc: 'Fungsi berantai. Hasil fungsi pertama menjadi input bagi fungsi berikutnya.',
    path: '/komposisi',
    accent: 'var(--orange)',
    rgbAccent: '251, 146, 60',
    preview: 'x → g(x) → f(x)'
  },
  {
    id: '03',
    title: 'Lingkaran',
    desc: 'Bentuk geometri dengan jarak konstan ke pusat. Membahas radius, diameter, luas.',
    path: '/lingkaran',
    accent: 'var(--violet)',
    rgbAccent: '192, 132, 252',
    preview: 'r, d, K, L'
  }
];

function ChapterCard({ chapter, delay }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  return (
    <div 
      className="pu"
      style={{
        animationDelay: `${delay}ms`,
        backgroundColor: hover ? `rgba(${chapter.rgbAccent}, 0.06)` : 'var(--navy-base)',
        borderTop: `2px solid ${hover ? chapter.accent : 'transparent'}`,
        padding: '40px 32px',
        cursor: 'pointer',
        transition: 'background 0.25s, border-top 0.25s, opacity 0.2s',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px'
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => navigate(chapter.path)}
    >
      <div>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '10px',
          color: chapter.accent,
          display: 'block',
          marginBottom: '12px'
        }}>
          BAB {chapter.id}
        </span>
        <h2 style={{
          fontFamily: "'Fraunces', serif",
          fontSize: '32px',
          fontWeight: 700,
          color: 'var(--text-bright)',
          marginBottom: '16px'
        }}>
          {chapter.title}
        </h2>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '14px',
          color: 'var(--text-dim)',
          lineHeight: 1.6
        }}>
          {chapter.desc}
        </p>
      </div>

      <div style={{
        marginTop: 'auto',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: chapter.accent,
        opacity: hover ? 1 : 0.5,
        transition: 'opacity 0.2s'
      }}>
        {chapter.preview}
      </div>

      <button style={{
        marginTop: '16px',
        alignSelf: 'flex-start',
        borderBottom: `1px solid ${hover ? chapter.accent : 'var(--border)'}`,
        paddingBottom: '4px',
        fontFamily: "'Syne', sans-serif",
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: hover ? chapter.accent : 'var(--text-dim)',
        transition: 'all 0.2s'
      }}>
        Buka Materi →
      </button>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ paddingBottom: '100px', position: 'relative', overflow: 'hidden' }}>
      <MathBackground />

      {/* Hero Section */}
      <section className="container pu" style={{
        paddingTop: 'var(--sp-hero)',
        paddingBottom: 'var(--sp-hero)',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 className="type-home" style={{ position: 'relative' }}>
          Blueprint Lab.<br/>
          <em>MATIKA° v2</em>
          {/* Glow dekoratif */}
          <span style={{
            position: 'absolute',
            top: '-20px',
            left: '0',
            fontSize: '120px',
            color: 'var(--text-faint)',
            zIndex: -1,
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            opacity: 0.2
          }}>
            LABORATORIUM
          </span>
        </h1>
        <p style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '16px',
          color: 'var(--text-dim)',
          maxWidth: '600px',
          lineHeight: 1.8
        }}>
          Satu halaman, satu materi. Setiap bab punya dunianya sendiri.
          Eksplorasi matematika dalam format laboratorium sains digital yang gelap,
          presisi, dan elektrik. Pilih salah satu materi di bawah untuk memulai.
        </p>
      </section>

      {/* Chapters Grid */}
      <section className="container" style={{ position: 'relative', zIndex: 1 }}>
        <SectionLabel title="Daftar Materi" accent="var(--text-dim)" />
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1px',
          backgroundColor: 'var(--border)',
          marginTop: 'var(--sp-md)',
          border: '1px solid var(--border)'
        }}>
          {chapters.map((chapter, index) => (
            <ChapterCard key={chapter.id} chapter={chapter} delay={index * 80} />
          ))}
        </div>
      </section>

      {/* Fitur Section */}
      <section className="container pu" style={{ marginTop: 'var(--sp-xxl)', animationDelay: '200ms', position: 'relative', zIndex: 1 }}>
        <SectionLabel title="Fitur Platform" accent="var(--text-dim)" />
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '24px',
          marginTop: 'var(--sp-lg)'
        }}>
          <div style={{
            background: 'var(--navy-mid)',
            padding: '32px',
            border: '1px solid var(--border)',
            transition: 'border-color 0.3s'
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '32px',
              color: 'var(--cyan)',
              marginBottom: '16px'
            }}>
              ∫
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              color: 'var(--text-bright)',
              marginBottom: '12px'
            }}>
              Visualisasi Interaktif
            </h3>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              Grafik dinamis yang bisa di-zoom, di-pan, dan dimanipulasi secara real-time untuk pemahaman yang lebih mendalam.
            </p>
          </div>

          <div style={{
            background: 'var(--navy-mid)',
            padding: '32px',
            border: '1px solid var(--border)',
            transition: 'border-color 0.3s'
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '32px',
              color: 'var(--orange)',
              marginBottom: '16px'
            }}>
              ∘
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              color: 'var(--text-bright)',
              marginBottom: '12px'
            }}>
              Simulator Langsung
            </h3>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              Ubah parameter fungsi dan lihat hasilnya secara instant. Eksperimen tanpa batas untuk eksplorasi konsep.
            </p>
          </div>

          <div style={{
            background: 'var(--navy-mid)',
            padding: '32px',
            border: '1px solid var(--border)',
            transition: 'border-color 0.3s'
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '32px',
              color: 'var(--violet)',
              marginBottom: '16px'
            }}>
              π
            </div>
            <h3 style={{
              fontFamily: "'Fraunces', serif",
              fontSize: '20px',
              color: 'var(--text-bright)',
              marginBottom: '12px'
            }}>
              Penjelasan Lengkap
            </h3>
            <p style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: '14px',
              color: 'var(--text-dim)',
              lineHeight: 1.8
            }}>
              Kamus istilah, rumus-rumus penting, dan contoh soal dengan penyelesaian step-by-step yang detail.
            </p>
          </div>
        </div>
      </section>

      {/* Tentang Proyek */}
      <section className="container pu" style={{ marginTop: 'var(--sp-xxl)', animationDelay: '250ms', position: 'relative', zIndex: 1 }}>
        <SectionLabel title="Tentang Proyek" accent="var(--text-dim)" />
        <div style={{
          background: 'var(--navy-mid)',
          padding: '40px',
          border: '1px solid var(--border)',
          marginTop: 'var(--sp-lg)'
        }}>
          <p style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: '16px',
            color: 'var(--text-dim)',
            lineHeight: 1.8,
            marginBottom: '24px'
          }}>
            <strong style={{ color: 'var(--text-bright)' }}>MATIKA°</strong> adalah platform pembelajaran matematika interaktif yang dirancang khusus untuk memvisualisasikan konsep-konsep matematika tingkat lanjut. Proyek ini menggabungkan desain modern dengan teknologi web interaktif untuk menciptakan pengalaman belajar yang engaging dan efektif.
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '24px',
            marginTop: '32px'
          }}>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Teknologi
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '14px',
                color: 'var(--text-bright)'
              }}>
                React, Vite, MathJS
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Desain System
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '14px',
                color: 'var(--text-bright)'
              }}>
                Blueprint Lab v2
              </div>
            </div>
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '11px',
                color: 'var(--text-faint)',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                Materi
              </div>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '14px',
                color: 'var(--text-bright)'
              }}>
                3 Bab Matematika
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Penutup */}
      <section className="container pu" style={{ marginTop: 'var(--sp-xl)', animationDelay: '300ms', position: 'relative', zIndex: 1 }}>
        <BulletPoint accent="var(--text-dim)">
          Website interaktif edukasi matematika. Proyek Semester Matematika Kelas XI SIJA 1.
        </BulletPoint>
        <BulletPoint accent="var(--text-dim)">
          Pilih salah satu materi di atas untuk melihat visualisasi dan interaksi spesifik.
        </BulletPoint>
        <BulletPoint accent="var(--text-dim)">
          Dibuat oleh Irsyad Abdul Jabbar Al Harits - 2026.
        </BulletPoint>
      </section>
    </div>
  );
}
