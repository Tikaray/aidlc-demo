import React from 'react'

export default function TitleSlide({ title, subtitle, meta, children }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', gap: 24, position: 'relative',
    }}>
      {/* Decorative glow orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '15%', right: '10%',
        width: 250, height: 250, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <h1 className="stagger-item" style={{
        animationDelay: '0.1s',
        fontSize: 60, fontWeight: 800,
        background: 'linear-gradient(135deg, #60a5fa 0%, #f59e0b 50%, #10b981 100%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
        animation: 'fadeInUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards, gradientShift 4s ease infinite',
        opacity: 0,
        lineHeight: 1.2,
      }}>{title}</h1>
      {subtitle && (
        <p className="stagger-item" style={{
          animationDelay: '0.25s',
          fontSize: 24, color: 'var(--color-text-secondary)',
          maxWidth: 750, lineHeight: 1.6,
        }}>{subtitle}</p>
      )}
      {meta && (
        <p className="stagger-item" style={{
          animationDelay: '0.4s',
          fontSize: 16, color: 'var(--color-text-secondary)',
          marginTop: 16, opacity: 0.5,
          padding: '6px 20px', borderRadius: 20,
          border: '1px solid var(--color-border)',
        }}>{meta}</p>
      )}
      {children}
    </div>
  )
}
