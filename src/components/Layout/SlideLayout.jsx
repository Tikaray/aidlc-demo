import React from 'react'

export default function SlideLayout({ title, subtitle, children, tag }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-start', gap: 28,
    }}>
      <div>
        {tag && <span className="tag-badge stagger-item" style={{ animationDelay: '0s', marginBottom: 12 }}>{tag}</span>}
        <h1 className="stagger-item" style={{
          animationDelay: '0.05s',
          fontSize: 44, fontWeight: 700,
          color: 'var(--color-text)', lineHeight: 1.3,
          marginTop: tag ? 10 : 0,
        }}>{title}</h1>
        {subtitle && (
          <p className="stagger-item" style={{
            animationDelay: '0.1s',
            fontSize: 19, color: 'var(--color-text-secondary)', marginTop: 8,
          }}>{subtitle}</p>
        )}
        <div className="stagger-item" style={{
          animationDelay: '0.15s',
          height: 3, width: 60, marginTop: 14,
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
          borderRadius: 2,
        }} />
      </div>
      <div style={{ flex: 1, overflow: 'auto' }}>
        {children}
      </div>
    </div>
  )
}
