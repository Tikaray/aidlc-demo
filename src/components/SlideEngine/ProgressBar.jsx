import React from 'react'

export default function ProgressBar({ current, total }) {
  const pct = ((current + 1) / total) * 100
  return (
    <div
      role="progressbar" aria-valuenow={current + 1} aria-valuemin={1} aria-valuemax={total}
      aria-label="演示进度"
      style={{ height: 3, background: 'var(--color-border)', position: 'relative', zIndex: 2 }}
    >
      <div style={{
        height: '100%', width: `${pct}%`,
        background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent), var(--color-success))',
        transition: 'width 0.4s cubic-bezier(0.16,1,0.3,1)',
        borderRadius: 2,
        boxShadow: '0 0 8px var(--color-primary-glow)',
      }} />
    </div>
  )
}
