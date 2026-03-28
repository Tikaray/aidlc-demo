import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import ChartBlock from '../components/ContentBlocks/ChartBlock'

const timeData = [
  { label: '代码编写', value: 55, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
  { label: '代码审查', value: 40, color: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' },
  { label: '文档编写', value: 50, color: 'linear-gradient(90deg, #10b981, #34d399)' },
  { label: 'Bug修复', value: 35, color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' },
  { label: '测试覆盖', value: 15, color: 'linear-gradient(90deg, #ec4899, #f472b6)' },
]

const sources = [
  { org: 'GitHub', stat: '开发者使用Copilot编码速度提升55%', url: 'GitHub Copilot研究, 2025' },
  { org: 'Panto', stat: '日常使用AI的开发者PR合并量多60%', url: 'Panto AI统计, 2026' },
  { org: 'GitHub', stat: 'Copilot贡献了活跃用户46%的代码', url: 'GitHub官方数据, 2025' },
]

export default function DevEfficiency() {
  return (
    <SlideLayout tag="产品设计与开发" title="开发效率提升数据" subtitle="基于行业权威研究的真实数据">
      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
        <div style={{ flex: 2 }}>
          <ChartBlock
            data={timeData}
            title="AI辅助开发各环节效率提升"
            unit="%"
            source="GitHub Copilot Research 2025, Panto AI Statistics 2026"
          />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="stagger-item" style={{
            animationDelay: '0.5s',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(245,158,11,0.1))',
            borderRadius: 16, padding: 24, textAlign: 'center',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 0 30px rgba(59,130,246,0.1)',
          }}>
            <div className="count-up" style={{
              animationDelay: '0.7s',
              fontSize: 44, fontWeight: 800, color: 'var(--color-accent)',
            }}>55%</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 6 }}>编码速度提升</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', opacity: 0.5, marginTop: 4 }}>GitHub Copilot Research</div>
          </div>

          {/* Source references */}
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
