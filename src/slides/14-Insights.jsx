import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const insights = [
  {
    icon: '💡', title: 'AI不是万能的，但不用AI是万万不能的',
    desc: 'AI擅长结构化、重复性、模式化的工作。创意和判断力仍然是人类的核心价值。关键是找到人机协作的最佳分工点。',
    color: 'var(--color-accent)',
  },
  {
    icon: '🎯', title: 'Prompt质量决定输出质量',
    desc: '模糊的指令得到模糊的结果。学会写结构化Prompt（角色+背景+任务+约束+输出格式）是使用AI的第一课。',
    color: 'var(--color-primary)',
  },
  {
    icon: '🔄', title: '迭代比一次到位更重要',
    desc: '不要期望AI一次给出完美答案。像AIDLC一样，分阶段推进、每步验证，比一步到位更可靠。',
    color: 'var(--color-success)',
  },
  {
    icon: '🧩', title: '把AI融入工作流，而非替代工作流',
    desc: 'AI是工具链中的一环。需求分析用AI提问，设计用AI生成方案，编码用AI加速——但每一步都需要人来把关。',
    color: '#a78bfa',
  },
]

function InsightCard({ item, i }) {
  const tilt = useTilt(4)
  return (
    <div
      className="stagger-item glow-card tilt-card"
      style={{
        animationDelay: `${i * 0.12}s`,
        display: 'flex', gap: 20, alignItems: 'flex-start',
        background: 'var(--color-surface)', borderRadius: 14, padding: '20px 24px',
        borderLeft: `4px solid ${item.color}`,
        border: '1px solid var(--color-border)',
        borderLeftWidth: 4, borderLeftColor: item.color,
        cursor: 'default',
      }}
      {...tilt}
    >
      <span className="hover-bounce" style={{ fontSize: 28, flexShrink: 0 }}>{item.icon}</span>
      <div>
        <h3 className="hover-glow-text" style={{ fontSize: 18, fontWeight: 600, color: item.color, marginBottom: 6 }}>{item.title}</h3>
        <p style={{ fontSize: 15, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{item.desc}</p>
      </div>
    </div>
  )
}

export default function Insights() {
  return (
    <SlideLayout tag="心得与总结" title="我的心得体会" subtitle="在实际工作中使用AI的四点感悟">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {insights.map((item, i) => <InsightCard key={i} item={item} i={i} />)}
      </div>
    </SlideLayout>
  )
}
