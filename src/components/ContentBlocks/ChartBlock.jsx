import React from 'react'

export default function ChartBlock({ data, title, unit = '%', source }) {
  const maxVal = Math.max(...data.map(d => d.value))
  return (
    <div style={{ width: '100%' }}>
      {title && <h3 style={{ fontSize: 18, color: 'var(--color-text)', marginBottom: 20, fontWeight: 600 }}>{title}</h3>}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {data.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span style={{
              width: 130, fontSize: 14, color: 'var(--color-text-secondary)',
              textAlign: 'right', flexShrink: 0,
            }}>
              {item.label}
            </span>
            <div style={{
              flex: 1, height: 36,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 10, overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}>
              <div
                className="stagger-item"
                style={{
                  height: '100%',
                  width: `${(item.value / maxVal) * 100}%`,
                  background: item.color || 'linear-gradient(90deg, var(--color-primary), var(--color-primary-light))',
                  borderRadius: 10,
                  animationDelay: `${i * 0.15}s`,
                  display: 'flex', alignItems: 'center', justifyContent: 'flex-end',
                  paddingRight: 14,
                  boxShadow: '0 0 12px rgba(59,130,246,0.2)',
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
                  {item.value}{unit}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {source && (
        <p style={{
          marginTop: 16, fontSize: 11, color: 'var(--color-text-secondary)',
          opacity: 0.6, fontStyle: 'italic',
        }}>
          📊 数据来源：{source}
        </p>
      )}
    </div>
  )
}
