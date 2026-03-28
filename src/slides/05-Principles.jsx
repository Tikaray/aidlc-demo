import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const principles = [
  {
    icon: '🤝', title: '人机协作，而非替代',
    desc: 'AI是副驾驶，人类是决策者。AI生成方案，人类审核把关。',
    color: 'var(--color-primary)',
    detail: '在AIDLC流程中，每个阶段都有明确的"人类审批节点"。AI负责生成需求文档、架构方案、代码框架，但每一步都需要人类确认后才能继续。比如AI生成了11个需求验证问题，用户回答后AI才生成需求文档；架构设计生成后，需要人工评审通过才进入代码生成阶段。这种模式确保了AI的高效产出和人类的质量把控完美结合。',
    examples: ['需求分析：AI提问 → 人类回答 → AI生成文档 → 人类审批', '代码生成：AI写代码 → 人类Review → 确认后继续下一步', '文案撰写：AI生成初稿 → 编辑润色 → 发布'],
  },
  {
    icon: '🔄', title: '迭代验证，逐步推进',
    desc: '每个阶段都有明确的审批节点，确保方向正确再继续。',
    color: 'var(--color-accent)',
    detail: 'AIDLC将大任务拆解为小阶段：Inception（需求→规划→设计）→ Construction（功能设计→代码生成→测试）。每个阶段结束都有一个Gate Review，只有通过审批才能进入下一阶段。这避免了传统开发中"需求理解偏差导致大量返工"的问题，也避免了AI一次性生成大量低质量内容的风险。',
    examples: ['需求分析完成 → 用户确认"可以" → 进入架构设计', '架构设计完成 → 用户确认"继续" → 进入代码生成', '每个代码文件生成后都可以暂停、修改、再继续'],
  },
  {
    icon: '📐', title: '结构化输入，高质量输出',
    desc: '给AI清晰的上下文和约束条件，输出质量取决于输入质量。',
    color: 'var(--color-success)',
    detail: '模糊的指令只能得到模糊的结果。"帮我写个网站"和"构建一个面向中国大陆用户的非遗博物馆网站MVP，使用React+FastAPI，支持10大类非遗项目浏览、用户评论点赞收藏、文章发布审核"——两者的输出质量天差地别。结构化Prompt的核心公式：角色 + 背景 + 任务 + 约束条件 + 输出格式。',
    examples: ['差：帮我写篇推文', '好：为非遗剪纸写公众号推文，风格温暖，结构：故事引入→技艺介绍→传承人→互动，800-1000字，标题备选3个', '差：帮我做个活动方案', '好：策划线上活动，目标涨粉2000+，时长1周，预算5000元内，主题非遗手工，需要完整执行方案'],
  },
  {
    icon: '🎯', title: '场景驱动，按需使用',
    desc: '不是所有工作都需要AI，识别高价值场景，精准投入。',
    color: '#a78bfa',
    detail: 'AI最擅长的是：结构化内容生成（需求文档、方案模板）、重复性工作加速（批量代码、系列文案）、模式化任务（数据分析、格式转换）。AI不擅长的是：创意判断、情感表达、复杂人际沟通、需要深度行业经验的决策。关键是识别哪些工作适合AI辅助，把人类的时间留给更有价值的创造性工作。',
    examples: ['高价值场景：需求文档生成、代码框架搭建、月度内容策划、活动方案初稿', '低价值场景：简单的文件重命名、已有模板的填充', '不适合AI：客户关系维护、团队文化建设、创意方向决策'],
  },
]

function PrincipleCard({ p, i, expanded, onToggle }) {
  const tilt = useTilt(expanded ? 0 : 5)
  return (
    <div
      className={`stagger-item ${expanded ? '' : 'glow-card hover-border-glow tilt-card'}`}
      style={{
        animationDelay: `${i * 0.12}s`,
        background: expanded ? 'var(--color-surface-hover)' : 'var(--color-surface)',
        borderRadius: 14, padding: '20px 24px',
        border: `1px solid ${expanded ? p.color : 'var(--color-border)'}`,
        display: 'flex', flexDirection: 'column', gap: expanded ? 14 : 0,
        cursor: 'pointer', transition: 'all 0.3s ease',
        boxShadow: expanded ? `0 0 24px ${p.color}20` : 'none',
      }}
      onClick={onToggle}
      {...(expanded ? {} : tilt)}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <span className="hover-bounce" style={{ fontSize: 28, flexShrink: 0 }}>{p.icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: p.color, marginBottom: 4 }}>{p.title}</h3>
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{p.desc}</p>
        </div>
        <span style={{
          fontSize: 14, color: p.color, flexShrink: 0, marginTop: 4,
          transform: expanded ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.3s ease',
        }}>▼</span>
      </div>
      {expanded && (
        <div style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.8, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid var(--color-border)' }}>
            {p.detail}
          </div>
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, color: p.color, fontWeight: 600, marginBottom: 6 }}>📌 实际案例</div>
            {p.examples.map((ex, j) => (
              <div key={j} style={{ fontSize: 12, color: 'var(--color-text-secondary)', padding: '4px 0 4px 14px', position: 'relative', lineHeight: 1.6 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--color-accent)' }}>→</span>{ex}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function Principles() {
  const [expanded, setExpanded] = useState(-1)
  return (
    <SlideLayout tag="方法论" title="AI工具使用原则" subtitle="四条核心原则，点击展开详细说明和实际案例">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {principles.map((p, i) => (
          <PrincipleCard
            key={i} p={p} i={i}
            expanded={expanded === i}
            onToggle={() => setExpanded(expanded === i ? -1 : i)}
          />
        ))}
      </div>
    </SlideLayout>
  )
}
