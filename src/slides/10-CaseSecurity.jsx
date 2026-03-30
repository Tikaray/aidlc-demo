import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const concerns = [
  {
    icon: '🔑', title: '密钥/凭证泄露',
    risk: '将API Key、数据库密码等硬编码在代码中，被AI学习或上传到云端',
    color: '#ef4444',
    solutions: [
      '使用 .env 文件管理敏感配置，加入 .gitignore',
      'AI工具配置中排除 .env、credentials 等文件',
      '代码审查时重点检查是否有硬编码密钥',
      '使用环境变量注入，而非配置文件明文存储',
    ],
    aidlc: 'AIDLC在代码生成阶段会自动使用环境变量模式（如 os.getenv("SECRET_KEY")），不会在代码中硬编码任何密钥。',
  },
  {
    icon: '☁️', title: '代码上传到AI云端',
    risk: '使用在线AI工具时，代码可能被上传到第三方服务器用于模型训练',
    color: '#f59e0b',
    solutions: [
      '优先使用本地部署的AI工具（如Kiro本地模式）',
      '企业版AI工具通常承诺不使用用户数据训练模型',
      '敏感项目使用离线/私有化部署的AI助手',
      '了解AI工具的数据使用政策和隐私条款',
    ],
    aidlc: 'Kiro等IDE集成AI工具支持本地运行，代码不离开开发环境。企业可选择私有化部署，确保代码不外泄。',
  },
  {
    icon: '🐛', title: 'AI生成的代码有安全漏洞',
    risk: 'AI可能生成存在SQL注入、XSS、不安全的依赖等问题的代码',
    color: '#8b5cf6',
    solutions: [
      'AI生成代码后必须经过人工安全审查',
      '使用静态代码分析工具（如SonarQube）扫描',
      'AIDLC可选启用"安全基线扩展"自动检查',
      '依赖库版本检查，避免已知漏洞',
    ],
    aidlc: 'AIDLC流程内置安全基线扩展（可选），在代码生成阶段自动应用安全规则：参数化查询防SQL注入、输出转义防XSS、密码bcrypt哈希等。',
  },
  {
    icon: '📋', title: '知识产权与合规',
    risk: 'AI生成的代码可能包含开源协议冲突或版权问题',
    color: '#3b82f6',
    solutions: [
      '审查AI生成代码的原创性，避免大段复制开源代码',
      '明确AI工具的输出版权归属条款',
      '使用许可证扫描工具检查依赖合规性',
      '建立团队AI使用规范和审计流程',
    ],
    aidlc: 'AIDLC的审计日志（audit.md）记录了每一步AI操作和人类决策，提供完整的可追溯性，满足合规审计需求。',
  },
]

function ConcernCard({ item, i, expanded, onToggle }) {
  const tilt = useTilt(expanded ? 0 : 4)
  return (
    <div
      className={`stagger-item ${expanded ? '' : 'glow-card tilt-card'}`}
      onClick={onToggle}
      style={{
        animationDelay: `${i * 0.1}s`,
        background: expanded ? 'var(--color-surface-hover)' : 'var(--color-surface)',
        borderRadius: 14, padding: '18px 22px',
        border: `1px solid ${expanded ? item.color : 'var(--color-border)'}`,
        cursor: 'pointer', transition: 'all 0.3s ease',
        boxShadow: expanded ? `0 0 20px ${item.color}20` : 'none',
        display: 'flex', flexDirection: 'column', gap: expanded ? 12 : 0,
      }}
      {...(expanded ? {} : tilt)}
    >
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
        <span style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: item.color, marginBottom: 3 }}>{item.title}</h3>
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.risk}</p>
        </div>
        <span style={{ fontSize: 13, color: item.color, transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease', flexShrink: 0, marginTop: 4 }}>▼</span>
      </div>
      {expanded && (
        <div style={{ animation: 'fadeInUp 0.3s ease forwards' }}>
          <div style={{ background: 'rgba(255,255,255,0.02)', borderRadius: 10, padding: 14, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 12, color: 'var(--color-success)', fontWeight: 600, marginBottom: 8 }}>🛡️ 防护措施</div>
            {item.solutions.map((s, j) => (
              <div key={j} style={{ fontSize: 13, color: 'var(--color-text-secondary)', padding: '3px 0 3px 16px', position: 'relative', lineHeight: 1.6 }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--color-success)' }}>✓</span>{s}
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8, padding: '10px 14px', background: `${item.color}08`, borderRadius: 8, border: `1px solid ${item.color}20`, fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <span style={{ color: item.color, fontWeight: 600 }}>AIDLC方案：</span> {item.aidlc}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CaseSecurity() {
  const [expanded, setExpanded] = useState(-1)
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="Step 5：AI开发的代码安全" subtitle="四大安全顾虑及AIDLC的应对方案（点击展开详情）">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {concerns.map((item, i) => (
          <ConcernCard key={i} item={item} i={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? -1 : i)} />
        ))}
      </div>
      <div className="stagger-item" style={{ animationDelay: '0.5s', marginTop: 14, padding: '14px 20px', background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))', borderRadius: 12, border: '1px solid rgba(16,185,129,0.15)', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
        <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>✦ 核心原则：</span>
        AI是工具，安全是人的责任。AIDLC通过<span style={{ color: 'var(--color-primary-light)' }}>分阶段审批</span>、<span style={{ color: 'var(--color-primary-light)' }}>安全基线扩展</span>、<span style={{ color: 'var(--color-primary-light)' }}>审计日志</span>三重机制，确保AI辅助开发的安全可控。
      </div>
    </SlideLayout>
  )
}
