import React from 'react'
import useMobile from '../../hooks/useMobile'

export default function SlideLayout({ title, subtitle, children, tag }) {
  const m = useMobile()
  return (
    <div style={{
      width: '100%', height: m ? 'auto' : '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-start', gap: m ? 18 : 28,
    }}>
      <div>
        {tag && <span className="tag-badge stagger-item" style={{ animationDelay: '0s', marginBottom: m ? 8 : 12 }}>{tag}</span>}
        <h1 className="stagger-item" style={{
          animationDelay: '0.05s',
          fontSize: m ? 26 : 44, fontWeight: 700,
          color: 'var(--color-text)', lineHeight: 1.3,
          marginTop: tag ? 10 : 0,
        }}>{title}</h1>
        {subtitle && (
          <p className="stagger-item" style={{
            animationDelay: '0.1s',
            fontSize: m ? 14 : 19, color: 'var(--color-text-secondary)', marginTop: 8,
          }}>{subtitle}</p>
        )}
        <div className="stagger-item" style={{
          animationDelay: '0.15s',
          height: 3, width: m ? 40 : 60, marginTop: m ? 10 : 14,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          borderRadius: 2,
        }} />
      </div>
      <div style={{ flex: 1, overflow: m ? 'visible' : 'auto' }}>
        {children}
      </div>
    </div>
  )
}
