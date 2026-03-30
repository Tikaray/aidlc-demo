import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const sections = [
  { title: '什么是AIDLC', desc: '方法论介绍与核心流程', slide: 2, icon: '🧠', color: '#3b82f6' },
  { title: 'AIDLC实战：自修复爬虫', desc: '需求分析 → 架构设计 → 代码生成 → 测试部署 → 安全', slide: 5, icon: '🕷️', color: '#ef4444' },
  { title: '效率提升与数据', desc: '行业权威数据 · 实际项目对比', slide: 13, icon: '📊', color: '#f59e0b' },
  { title: '心得与总结', desc: '实践感悟 · 落地建议 · 展望', slide: 14, icon: '💡', color: '#10b981' },
]

function TocCard({ s, i, goTo }) {
  const tilt = useTilt(8)
  return (
    <button
      onClick={() => goTo(s.slide)}
      className="stagger-item glow-card tilt-card"
      style={{
        animationDelay: `${0.2 + i * 0.1}s`,
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 16, padding: '28px 32px',
        textAlign: 'left', cursor: 'pointer',
        display: 'flex', alignItems: 'flex-start', gap: 18,
        color: 'var(--color-text)', position: 'relative', overflow: 'hidden',
      }}
      {...tilt}
    >
      <div style={{
        position: 'absolute', top: -20, right: -20,
        width: 100, height: 100, borderRadius: '50%',
        background: `radial-gradient(circle, ${s.color}20, transparent)`,
        pointerEvents: 'none',
      }} />
      <span className="hover-bounce" style={{
        fontSize: 36, flexShrink: 0,
        width: 56, height: 56, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        background: `${s.color}15`, borderRadius: 14,
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
      }}>{s.icon}</span>
      <div>
        <div style={{ fontSize: 22, fontWeight: 600 }}>{s.title}</div>
        <div style={{ fontSize: 15, color: 'var(--color-text-secondary)', marginTop: 6 }}>{s.desc}</div>
      </div>
    </button>
  )
}

import useMobile from '../hooks/useMobile'

export default function TableOfContents({ goTo }) {
  const m = useMobile()
  return (
    <SlideLayout title="今天聊什么">
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 14 : 20, marginTop: 10 }}>
        {sections.map((s, i) => (
          <TocCard key={i} s={s} i={i} goTo={goTo} />
        ))}
      </div>
    </SlideLayout>
  )
}
