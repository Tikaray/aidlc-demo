import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import ChartBlock from '../components/ContentBlocks/ChartBlock'
import useMobile from '../hooks/useMobile'

const timeData = [
  { label: '需求分析', value: 90, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
  { label: '架构设计', value: 85, color: 'linear-gradient(90deg, #8b5cf6, #a78bfa)' },
  { label: '代码编写', value: 55, color: 'linear-gradient(90deg, #10b981, #34d399)' },
  { label: '文档编写', value: 80, color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' },
  { label: '测试方案', value: 70, color: 'linear-gradient(90deg, #ec4899, #f472b6)' },
]

const projectData = [
  { name: 'CGTN新闻爬虫', trad: '4小时', aidlc: '~30分钟', speedup: '8x', files: 8, color: '#3b82f6' },
  { name: '自修复爬虫', trad: '1-2周', aidlc: '~60分钟', speedup: '10x+', files: 15, color: '#ef4444' },
]

const sources = [
  { org: 'GitHub', stat: '开发者使用Copilot编码速度提升55%', url: 'GitHub Copilot Research, 2025' },
  { org: 'Panto', stat: '日常使用AI的开发者PR合并量多60%', url: 'Panto AI Statistics, 2026' },
  { org: '实测', stat: '两个爬虫项目均在1小时内从零到可运行', url: '本次AIDLC实战数据' },
]

export default function DevEfficiency() {
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战" title="效率提升数据" subtitle="行业数据 + 实际项目对比">
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 16 : 28, alignItems: 'flex-start' }}>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <ChartBlock data={timeData} title="AI辅助开发各环节时间节省" unit="%" source="GitHub Copilot Research 2025, Panto AI Statistics 2026" />
          {/* Project comparison */}
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 12, fontWeight: 600 }}>📐 实际项目开发耗时对比</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {projectData.map((p, i) => (
                <div key={i} className="stagger-item" style={{ animationDelay: `${0.5 + i * 0.1}s`, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: p.color, width: m ? 90 : 120, flexShrink: 0 }}>{p.name}</span>
                  <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                    <span style={{ color: 'var(--color-danger)', textDecoration: 'line-through', opacity: 0.6 }}>{p.trad}</span>
                    <span style={{ color: 'var(--color-text-secondary)' }}>→</span>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>{p.aidlc}</span>
                  </div>
                  <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-accent)' }}>{p.speedup}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div className="stagger-item" style={{
            animationDelay: '0.5s',
            background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(239,68,68,0.1))',
            borderRadius: 16, padding: 22, textAlign: 'center',
            border: '1px solid rgba(59,130,246,0.2)',
            boxShadow: '0 0 30px rgba(59,130,246,0.1)',
          }}>
            <div className="count-up" style={{ animationDelay: '0.7s', fontSize: 40, fontWeight: 800, color: 'var(--color-accent)' }}>≤1h</div>
            <div style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 6 }}>从零到可运行系统</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)', opacity: 0.5, marginTop: 4 }}>两个爬虫项目实测</div>
          </div>
          <div className="stagger-item" style={{
            animationDelay: '0.65s',
            background: 'var(--color-surface)', borderRadius: 14, padding: 16,
            border: '1px solid var(--color-border)',
          }}>
            <h4 style={{ fontSize: 13, color: 'var(--color-primary-light)', marginBottom: 10, fontWeight: 600 }}>📊 数据来源</h4>
            {sources.map((s, i) => (
              <div key={i} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '6px 0', borderBottom: i < sources.length - 1 ? '1px solid var(--color-border)' : 'none', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{s.org}：</span>{s.stat}
                <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>{s.url}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
