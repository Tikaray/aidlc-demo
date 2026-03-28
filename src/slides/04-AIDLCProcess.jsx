import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import FlowChart from '../components/ContentBlocks/FlowChart'

const phases = [
  { icon: '📋', title: 'Inception', desc: '需求 · 规划 · 设计' },
  { icon: '🔨', title: 'Construction', desc: '功能设计 · 代码生成' },
  { icon: '✅', title: 'Build & Test', desc: '构建 · 测试 · 验证' },
  { icon: '🚀', title: 'Operations', desc: '部署 · 运维 · 监控' },
]

const details = [
  {
    phase: 'Inception',
    color: 'var(--color-primary)',
    items: ['工作区检测', '需求分析（AI提问→用户回答→生成文档）', '工作流规划', '应用架构设计'],
  },
  {
    phase: 'Construction',
    color: 'var(--color-accent)',
    items: ['功能设计（领域模型、业务规则）', '代码生成计划', '批量代码生成', '构建与测试'],
  },
]

export default function AIDLCProcess() {
  return (
    <SlideLayout tag="方法论" title="AIDLC核心流程" subtitle="每个阶段都有AI深度参与，人类负责决策和验证">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <FlowChart steps={phases} />
        <div style={{ display: 'flex', gap: 24 }}>
          {details.map((d, i) => (
            <div key={i} className="stagger-item" style={{
              animationDelay: `${0.3 + i * 0.15}s`,
              flex: 1,
              background: 'var(--color-surface)',
              borderRadius: 12,
              padding: 24,
              borderLeft: `4px solid ${d.color}`,
            }}>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 12, color: d.color }}>{d.phase}</h3>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {d.items.map((item, j) => (
                  <li key={j} style={{ fontSize: 15, color: 'var(--color-text-secondary)' }}>• {item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
