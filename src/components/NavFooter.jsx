import React from 'react';
import { Link } from 'react-router-dom';

export default function NavFooter({ prev, next, accent = 'var(--text-bright)' }) {
  return (
    <div style={{
      backgroundColor: 'var(--navy-deep)',
      padding: '36px var(--sp-page)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '64px'
    }}>
      {prev ? (
        <Link to={prev.path} style={{
          padding: '10px 20px',
          border: '1px solid var(--border)',
          color: 'var(--text-dim)',
          fontFamily: "'Syne', sans-serif",
          fontSize: '12px',
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textDecoration: 'none'
        }}>
          ← {prev.label}
        </Link>
      ) : <div />}

      <Link to="/" style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '10px',
        color: 'var(--text-faint)',
        textDecoration: 'none',
        textTransform: 'uppercase'
      }}>
        Beranda
      </Link>

      {next ? (
        <Link to={next.path} style={{
          padding: '10px 20px',
          backgroundColor: accent,
          color: 'var(--navy-deep)',
          fontFamily: "'Syne', sans-serif",
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '1.5px',
          textDecoration: 'none'
        }}>
          {next.label} →
        </Link>
      ) : <div />}
    </div>
  );
}
