import React from 'react';

export default function FormulaBox({ label, formula, steps, accent = 'var(--text-bright)', rgbAccent }) {
  // We use rgbAccent if provided to do rgba(accent, 0.06), else fallback to a dark semi-transparent
  const bgColor = rgbAccent ? `rgba(${rgbAccent}, 0.06)` : 'rgba(255,255,255,0.02)';
  const borderColor = rgbAccent ? `rgba(${rgbAccent}, 0.25)` : 'var(--border)';

  return (
    <div style={{
      background: bgColor,
      border: `1px solid ${borderColor}`,
      borderLeft: `3px solid ${accent}`,
      padding: '14px 18px',
      margin: '14px 0',
      borderRadius: 0
    }}>
      {label && (
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          color: 'var(--text-dim)',
          marginBottom: '8px'
        }}>
          {label}
        </div>
      )}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '14px',
        color: accent,
        lineHeight: 1.8
      }}>
        {formula}
      </div>
      
      {/* Render Steps if provided */}
      {steps && steps.length > 0 && (
        <div style={{ 
          marginTop: '12px', 
          paddingTop: '12px', 
          borderTop: `1px dashed ${borderColor}` 
        }}>
          <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '10px', color: 'var(--text-dim)', textTransform: 'uppercase', marginBottom: '8px' }}>
            Cara Menjawab:
          </div>
          {steps.map((step, idx) => (
            <div key={idx} style={{ 
              fontFamily: "'JetBrains Mono', monospace", 
              fontSize: '12px', 
              color: 'var(--text-dim)', 
              lineHeight: 1.6 
            }}>
              {step}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
