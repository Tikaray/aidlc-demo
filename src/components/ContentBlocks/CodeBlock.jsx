import React from 'react'

export default function CodeBlock({ code, language = '', title }) {
  return (
    <div className="shimmer" style={{
      background: 'var(--color-code-bg)',
      borderRadius: 14,
      border: '1px solid var(--color-border)',
      overflow: 'hidden',
      boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
    }}>
      {title && (
        <div style={{
          padding: '10px 18px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid var(--color-border)',
          fontSize: 13, color: 'var(--color-text-secondary)',
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ display: 'flex', gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
          </span>
          <span style={{ marginLeft: 4 }}>{title}</span>
          {language && <span style={{ marginLeft: 'auto', opacity: 0.4, fontSize: 12 }}>{language}</span>}
        </div>
      )}
      <pre style={{
        padding: 20, fontSize: 14, lineHeight: 1.75,
        overflow: 'auto', color: '#e2e8f0', margin: 0,
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
