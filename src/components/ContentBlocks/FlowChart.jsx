import React from 'react'
import useMobile from '../../hooks/useMobile'

export default function FlowChart({ steps, activeIndex = -1 }) {
  const m = useMobile()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, flexWrap: 'wrap', flexDirection: m ? 'column' : 'row' }}>
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <div
            className={`stagger-item ${i === activeIndex ? 'pulse-glow' : ''}`}
            style={{
              animationDelay: `${i * 0.12}s`,
              background: i === activeIndex
                ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))'
                : 'var(--color-surface)',
              border: `2px solid ${i === activeIndex ? 'transparent' : 'var(--color-border)'}`,
              borderRadius: 14, padding: '18px 28px',
              textAlign: 'center', minWidth: 140,
              boxShadow: i === activeIndex ? '0 8px 30px rgba(59,130,246,0.25)' : '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{step.icon}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text)' }}>{step.title}</div>
            {step.desc && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 4 }}>{step.desc}</div>}
          </div>
          {i < steps.length - 1 && (
            <div className="stagger-item" style={{
              animationDelay: `${i * 0.12 + 0.06}s`,
              fontSize: 22, color: 'var(--color-primary-light)', padding: m ? '4px 0' : '0 10px',
              textShadow: '0 0 10px var(--color-primary-glow)',
              transform: m ? 'rotate(90deg)' : 'none',
            }}>→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}
