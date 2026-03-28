import React from 'react'
import useMobile from '../../hooks/useMobile'

export default function ComparisonBlock({ before, after, beforeTitle = '传统方式', afterTitle = 'AIDLC方式' }) {
  const m = useMobile()
  const colBase = {
    flex: 1, borderRadius: 14, padding: m ? 16 : 24,
    display: 'flex', flexDirection: 'column', gap: 12,
    position: 'relative', overflow: 'hidden',
  }
  return (
    <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 14 : 24, width: '100%' }}>
      <div className="stagger-item" style={{
        ...colBase, animationDelay: '0.2s',
        background: 'linear-gradient(135deg, rgba(239,68,68,0.06), rgba(239,68,68,0.02))',
        border: '1px solid rgba(239,68,68,0.15)',
      }}>
        <h3 style={{ fontSize: m ? 15 : 17, color: 'var(--color-danger)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✕</span>
          {beforeTitle}
        </h3>
        <div style={{ fontSize: m ? 14 : 15, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{before}</div>
      </div>
      <div className="stagger-item" style={{
        ...colBase, animationDelay: '0.35s',
        background: 'linear-gradient(135deg, rgba(16,185,129,0.06), rgba(16,185,129,0.02))',
        border: '1px solid rgba(16,185,129,0.15)',
      }}>
        <h3 style={{ fontSize: m ? 15 : 17, color: 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600 }}>
          <span style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>✓</span>
          {afterTitle}
        </h3>
        <div style={{ fontSize: m ? 14 : 15, color: 'var(--color-text-secondary)', lineHeight: 1.8 }}>{after}</div>
      </div>
    </div>
  )
}
