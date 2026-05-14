import React from 'react';

export default function BulletPoint({ children, accent = 'var(--text-bright)' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      paddingTop: '8px',
      paddingBottom: '8px',
      borderTop: '1px solid var(--border)'
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: accent,
        marginTop: '2px'
      }}>
        //
      </div>
      <div style={{
        fontFamily: "'Syne', sans-serif",
        fontSize: '13px',
        color: 'var(--text-dim)',
        lineHeight: 1.65
      }}>
        {children}
      </div>
    </div>
  );
}
