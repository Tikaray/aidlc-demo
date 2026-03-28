import React from 'react'
import TitleSlide from '../components/Layout/TitleSlide'
import useMobile from '../hooks/useMobile'

export default function Ending() {
  const m = useMobile()
  return (
    <TitleSlide
      title="拥抱AI，提升效率"
      subtitle="让AI成为你的超级助手，而不是你的替代者"
    >
      <div className="stagger-item" style={{
        animationDelay: '0.3s',
        marginTop: m ? 24 : 40,
        display: 'flex', flexDirection: m ? 'column' : 'row',
        gap: m ? 16 : 48, justifyContent: 'center', alignItems: 'center',
      }}>
        {[
          { num: '55%', label: '编码速度提升', sub: 'GitHub Research' },
          { num: '3h', label: '每篇内容节省', sub: 'Landbase Survey' },
          { num: '72%', label: '企业已采用AI', sub: 'McKinsey 2025' },
        ].map((item, i) => (
          <div key={i} className="count-up" style={{
            animationDelay: `${0.5 + i * 0.15}s`,
            textAlign: 'center',
            padding: m ? '16px 24px' : '20px 28px',
            background: 'var(--color-surface)',
            borderRadius: 16,
            border: '1px solid var(--color-border)',
            minWidth: m ? 200 : 160, width: m ? '100%' : 'auto',
          }}>
            <div style={{ fontSize: m ? 30 : 38, fontWeight: 800, color: 'var(--color-accent)' }}>{item.num}</div>
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
