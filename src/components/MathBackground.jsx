import React from 'react';

export default function MathBackground() {
  return (
    <>
      {/* Math Symbols Background with Animation */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: 'none',
        opacity: 0.04,
        fontSize: '80px',
        fontFamily: "'JetBrains Mono', monospace",
        color: 'var(--text-bright)',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {/* Row 1 */}
        <div style={{ position: 'absolute', top: '5%', left: '3%', transform: 'rotate(-15deg)', animation: 'float 8s ease-in-out infinite' }}>∫</div>
        <div style={{ position: 'absolute', top: '8%', left: '25%', transform: 'rotate(10deg)', animation: 'float 10s ease-in-out infinite 1s' }}>∆</div>
        <div style={{ position: 'absolute', top: '12%', left: '50%', transform: 'rotate(-20deg)', animation: 'float 7s ease-in-out infinite 2s' }}>∑</div>
        <div style={{ position: 'absolute', top: '7%', left: '75%', transform: 'rotate(25deg)', animation: 'float 9s ease-in-out infinite 0.5s' }}>π</div>
        <div style={{ position: 'absolute', top: '10%', right: '5%', transform: 'rotate(-10deg)', animation: 'float 11s ease-in-out infinite 1.5s' }}>∞</div>
        
        {/* Row 2 */}
        <div style={{ position: 'absolute', top: '22%', left: '8%', transform: 'rotate(15deg)', animation: 'float 9s ease-in-out infinite 2.5s' }}>θ</div>
        <div style={{ position: 'absolute', top: '25%', left: '35%', transform: 'rotate(-12deg)', animation: 'float 8s ease-in-out infinite 1s', fontSize: '60px' }}>f(x)</div>
        <div style={{ position: 'absolute', top: '28%', left: '60%', transform: 'rotate(18deg)', animation: 'float 10s ease-in-out infinite 3s' }}>√</div>
        <div style={{ position: 'absolute', top: '20%', right: '10%', transform: 'rotate(-25deg)', animation: 'float 8s ease-in-out infinite 2s' }}>≈</div>
        
        {/* Row 3 */}
        <div style={{ position: 'absolute', top: '38%', left: '5%', transform: 'rotate(20deg)', animation: 'float 9s ease-in-out infinite 0.5s' }}>∂</div>
        <div style={{ position: 'absolute', top: '42%', left: '28%', transform: 'rotate(-18deg)', animation: 'float 11s ease-in-out infinite 1.5s' }}>∘</div>
        <div style={{ position: 'absolute', top: '40%', left: '52%', transform: 'rotate(12deg)', animation: 'float 8s ease-in-out infinite 2.5s', fontSize: '60px' }}>x²</div>
        <div style={{ position: 'absolute', top: '45%', right: '8%', transform: 'rotate(-15deg)', animation: 'float 9s ease-in-out infinite 1s' }}>Σ</div>
        
        {/* Row 4 */}
        <div style={{ position: 'absolute', top: '55%', left: '12%', transform: 'rotate(-22deg)', animation: 'float 10s ease-in-out infinite 2s' }}>α</div>
        <div style={{ position: 'absolute', top: '58%', left: '38%', transform: 'rotate(16deg)', animation: 'float 8s ease-in-out infinite 3s' }}>β</div>
        <div style={{ position: 'absolute', top: '52%', left: '65%', transform: 'rotate(-14deg)', animation: 'float 10s ease-in-out infinite 0.5s' }}>γ</div>
        <div style={{ position: 'absolute', top: '60%', right: '6%', transform: 'rotate(22deg)', animation: 'float 11s ease-in-out infinite 1.5s' }}>λ</div>
        
        {/* Row 5 */}
        <div style={{ position: 'absolute', top: '70%', left: '7%', transform: 'rotate(14deg)', animation: 'float 9s ease-in-out infinite 2.5s' }}>∇</div>
        <div style={{ position: 'absolute', top: '72%', left: '30%', transform: 'rotate(-20deg)', animation: 'float 9s ease-in-out infinite 1s', fontSize: '60px' }}>∫dx</div>
        <div style={{ position: 'absolute', top: '75%', left: '55%', transform: 'rotate(18deg)', animation: 'float 8s ease-in-out infinite 2s' }}>≠</div>
        <div style={{ position: 'absolute', top: '68%', right: '12%', transform: 'rotate(-16deg)', animation: 'float 10s ease-in-out infinite 3s' }}>≤</div>
        
        {/* Row 6 */}
        <div style={{ position: 'absolute', top: '85%', left: '10%', transform: 'rotate(25deg)', animation: 'float 8s ease-in-out infinite 0.5s' }}>≥</div>
        <div style={{ position: 'absolute', top: '88%', left: '40%', transform: 'rotate(-12deg)', animation: 'float 10s ease-in-out infinite 1.5s' }}>±</div>
        <div style={{ position: 'absolute', top: '82%', left: '70%', transform: 'rotate(20deg)', animation: 'float 9s ease-in-out infinite 2.5s' }}>÷</div>
        <div style={{ position: 'absolute', top: '90%', right: '8%', transform: 'rotate(-18deg)', animation: 'float 11s ease-in-out infinite 1s' }}>×</div>
        
        {/* Additional scattered symbols */}
        <div style={{ position: 'absolute', top: '15%', left: '18%', transform: 'rotate(-8deg)', animation: 'float 12s ease-in-out infinite 2s' }}>ω</div>
        <div style={{ position: 'absolute', top: '32%', left: '82%', transform: 'rotate(28deg)', animation: 'float 7s ease-in-out infinite 3s' }}>φ</div>
        <div style={{ position: 'absolute', top: '48%', left: '15%', transform: 'rotate(-24deg)', animation: 'float 9s ease-in-out infinite 0.5s' }}>ψ</div>
        <div style={{ position: 'absolute', top: '62%', left: '45%', transform: 'rotate(10deg)', animation: 'float 8s ease-in-out infinite 1.5s' }}>μ</div>
        <div style={{ position: 'absolute', top: '78%', left: '25%', transform: 'rotate(-15deg)', animation: 'float 10s ease-in-out infinite 2.5s' }}>σ</div>
        <div style={{ position: 'absolute', top: '35%', right: '18%', transform: 'rotate(22deg)', animation: 'float 9s ease-in-out infinite 1s', fontSize: '60px' }}>∞</div>
        <div style={{ position: 'absolute', top: '65%', right: '28%', transform: 'rotate(-19deg)', animation: 'float 10s ease-in-out infinite 2s', fontSize: '60px' }}>π</div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(var(--initial-rotation, 0deg));
          }
          25% {
            transform: translateY(-30px) rotate(calc(var(--initial-rotation, 0deg) + 8deg));
          }
          50% {
            transform: translateY(-15px) rotate(calc(var(--initial-rotation, 0deg) - 5deg));
          }
          75% {
            transform: translateY(-40px) rotate(calc(var(--initial-rotation, 0deg) + 12deg));
          }
        }
      `}</style>
    </>
  );
}
