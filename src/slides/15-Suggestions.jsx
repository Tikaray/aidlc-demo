import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const suggestions = [
  {
    role: '产品/开发', icon: '💻',
    items: [
      '用AIDLC流程管理项目，AI参与每个阶段',
      '需求评审前先让AI生成验证问题清单',
      '架构设计时让AI生成多个方案对比',
      '代码Review时让AI先做一轮静态分析',
    ],
  },
  {
    role: '新媒体/运营', icon: '📱',
    items: [
      '月度选题策划用AI生成内容日历',
      '活动方案用结构化Prompt一次生成',
      '日常推文用AI生成初稿，人工润色',
      '数据分析报告让AI提取关键洞察',
    ],
  },
  {
    role: '通用建议', icon: '🌟',
    items: [
      '建立团队Prompt模板库，沉淀最佳实践',
      '从低风险任务开始尝试，逐步扩大范围',
      '定期复盘AI辅助效果，持续优化流程',
      '保持学习，AI工具在快速进化',
    ],
  },
]

function SuggestionCard({ s, i }) {
  const tilt = useTilt(6)
  return (
    <div
      className="stagger-item glow-card hover-border-glow tilt-card"
      style={{
        animationDelay: `${i * 0.15}s`,
        flex: 1, background: 'var(--color-surface)', borderRadius: 14, padding: 24,
        border: '1px solid var(--color-border)', cursor: 'default',
      }}
      {...tilt}
    >
      <div className="hover-bounce" style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
      <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-primary-light)', marginBottom: 16 }}>{s.role}</h3>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {s.items.map((item, j) => (
          <li key={j} className="hover-lift" style={{
            fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6,
            paddingLeft: 16, position: 'relative',
            padding: '6px 6px 6px 20px', borderRadius: 6,
            border: '1px solid transparent',
            transition: 'all 0.25s ease',
          }}>
            <span style={{ position: 'absolute', left: 4, color: 'var(--color-accent)' }}>→</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Suggestions() {
  return (
    <SlideLayout tag="心得与总结" title="与日常工作结合的建议" subtitle="不同角色的AI落地路径">
      <div style={{ display: 'flex', gap: 20 }}>
        {suggestions.map((s, i) => <SuggestionCard key={i} s={s} i={i} />)}
      </div>
    </SlideLayout>
  )
}
