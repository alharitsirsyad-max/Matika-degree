import React from 'react';

export default function SectionLabel({ title, accent = 'var(--text-bright)' }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '8px',
      gap: 'var(--sp-sm)'
    }}>
      <span style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        textTransform: 'uppercase',
        letterSpacing: '2.5px',
        color: accent
      }}>
        {title}
      </span>
      <div style={{
        height: '1px',
        flex: 1,
        backgroundColor: accent,
        opacity: 0.3
      }}></div>
    </div>
  );
}
