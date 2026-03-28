import React from 'react'

export default function Navigation({ current, total, onPrev, onNext }) {
  return (
    <nav role="navigation" aria-label="幻灯片导航" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      gap: 24, padding: '14px 0',
      background: 'rgba(10,14,26,0.8)',
      backdropFilter: 'blur(12px)',
      borderTop: '1px solid var(--color-border)',
      position: 'relative', zIndex: 2,
    }}>
      <button
        onClick={onPrev} disabled={current === 0} aria-label="上一页"
        style={{
          background: 'none', border: '1px solid var(--color-border)',
          color: current === 0 ? 'rgba(148,163,184,0.3)' : 'var(--color-text)',
          fontSize: 16, width: 42, height: 42, borderRadius: 10,
          cursor: current === 0 ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => { if (current > 0) { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = '0 0 16px var(--color-primary-glow)' }}}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
      >←</button>
      <span style={{
        color: 'var(--color-text-secondary)', fontSize: 13,
        minWidth: 70, textAlign: 'center',
        fontVariantNumeric: 'tabular-nums',
      }}>
        <span style={{ color: 'var(--color-primary-light)', fontWeight: 600 }}>{current + 1}</span>
        <span style={{ opacity: 0.4, margin: '0 6px' }}>/</span>
        <span>{total}</span>
      </span>
      <button
        onClick={onNext} disabled={current === total - 1} aria-label="下一页"
        style={{
          background: 'none', border: '1px solid var(--color-border)',
          color: current === total - 1 ? 'rgba(148,163,184,0.3)' : 'var(--color-text)',
          fontSize: 16, width: 42, height: 42, borderRadius: 10,
          cursor: current === total - 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
        onMouseEnter={e => { if (current < total - 1) { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'var(--color-primary)'; e.currentTarget.style.boxShadow = '0 0 16px var(--color-primary-glow)' }}}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none' }}
      >→</button>
    </nav>
  )
}
