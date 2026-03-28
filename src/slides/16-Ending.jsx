import React from 'react'
import TitleSlide from '../components/Layout/TitleSlide'

export default function Ending() {
  return (
    <TitleSlide
      title="拥抱AI，提升效率"
      subtitle="让AI成为你的超级助手，而不是你的替代者"
    >
      <div className="stagger-item" style={{
        animationDelay: '0.3s',
        marginTop: 40,
        display: 'flex', gap: 48, justifyContent: 'center',
      }}>
        {[
          { num: '55%', label: '编码速度提升', sub: 'GitHub Research' },
          { num: '3h', label: '每篇内容节省', sub: 'Landbase Survey' },
          { num: '72%', label: '企业已采用AI', sub: 'McKinsey 2025' },
        ].map((item, i) => (
          <div key={i} className="count-up" style={{
            animationDelay: `${0.5 + i * 0.15}s`,
            textAlign: 'center',
            padding: '20px 28px',
            background: 'var(--color-surface)',
            borderRadius: 16,
            border: '1px solid var(--color-border)',
            minWidth: 160,
          }}>
            <div style={{ fontSize: 38, fontWeight: 800, color: 'var(--color-accent)' }}>{item.num}</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>{item.label}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', opacity: 0.4, marginTop: 4 }}>{item.sub}</div>
          </div>
        ))}
      </div>
      <p className="stagger-item" style={{
        animationDelay: '0.8s',
        marginTop: 48, fontSize: 20,
        color: 'var(--color-text-secondary)', opacity: 0.6,
      }}>
        感谢聆听 · 欢迎交流
      </p>
    </TitleSlide>
  )
}
