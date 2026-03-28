import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import ChartBlock from '../components/ContentBlocks/ChartBlock'

const data = [
  { label: '内容策划', value: 70, color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' },
  { label: '文案撰写', value: 65, color: 'linear-gradient(90deg, #ec4899, #f472b6)' },
  { label: '活动方案', value: 60, color: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' },
  { label: '数据分析', value: 50, color: 'linear-gradient(90deg, #10b981, #34d399)' },
  { label: '用户互动设计', value: 45, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
]

const sources = [
  { org: 'McKinsey', stat: 'AI可提升营销生产力5-15%，价值约4630亿美元/年', url: 'McKinsey "How gen AI can boost consumer marketing", 2023' },
  { org: 'Landbase', stat: '营销人员使用AI平均每篇内容节省3小时', url: 'Landbase AI Marketing Statistics, 2026' },
  { org: 'McKinsey', stat: '72%的组织已在营销中使用生成式AI', url: 'McKinsey State of AI Survey, 2025' },
]

export default function MediaEfficiency() {
  return (
    <SlideLayout tag="新媒体运营" title="运营效率提升数据" subtitle="基于McKinsey等权威机构研究">
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <ChartBlock
            data={data}
            title="新媒体运营各环节效率提升"
            unit="%"
            source="McKinsey Global Institute, Landbase AI Marketing Statistics 2026"
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="stagger-item" style={{
            animationDelay: '0.5s',
            background: 'linear-gradient(135deg, rgba(236,72,153,0.1), rgba(245,158,11,0.1))',
            borderRadius: 16, padding: 24, textAlign: 'center',
            border: '1px solid rgba(236,72,153,0.2)',
            boxShadow: '0 0 30px rgba(236,72,153,0.1)',
          }}>
            <div className="count-up" style={{
              animationDelay: '0.7s',
              fontSize: 44, fontWeight: 800, color: '#f472b6',
            }}>3h</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 6 }}>每篇内容节省时间</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', opacity: 0.5, marginTop: 4 }}>Landbase Survey 2026</div>
          </div>

          <div className="stagger-item" style={{
            animationDelay: '0.65s',
            background: 'var(--color-surface)', borderRadius: 14, padding: 18,
            border: '1px solid var(--color-border)',
          }}>
            <h4 style={{ fontSize: 13, color: 'var(--color-primary-light)', marginBottom: 10, fontWeight: 600 }}>📊 数据来源</h4>
            {sources.map((s, i) => (
              <div key={i} style={{
                fontSize: 12, color: 'var(--color-text-secondary)',
                padding: '6px 0',
                borderBottom: i < sources.length - 1 ? '1px solid var(--color-border)' : 'none',
                lineHeight: 1.5,
              }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{s.org}：</span>
                {s.stat}
                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{s.url}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
