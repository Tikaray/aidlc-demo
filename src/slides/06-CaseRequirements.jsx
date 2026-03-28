import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'

const promptExample = `用户需求："我想做一个博物馆网站"

AI自动生成的验证问题：
┌─────────────────────────────────────────┐
│ Q1: 目标用户群体是谁？                    │
│ Q2: 用户认证方式偏好？                    │
│ Q3: 核心互动功能有哪些？                  │
│ Q4: 技术栈偏好？                          │
│ Q5: 数据库选型？                          │
│ ...共11个结构化问题                       │
└─────────────────────────────────────────┘

→ 用户回答后，AI自动生成完整需求文档
→ 包含：功能需求、非功能需求、数据模型、MVP边界`

const qaMarkdown = `# 需求验证问题 — 非遗博物馆

> 请在每个问题的 [Answer]: 后填写您的选择

---

## Question 1
目标用户群体是谁？

A) 中国大陆用户
B) 全球用户
C) 特定地区

[Answer]: A

## Question 2
用户认证方式偏好？

A) 邮箱+密码
B) 手机号+验证码
C) 第三方登录

[Answer]: A

## Question 3
用户注册后需要填写哪些信息？

A) 基础信息（昵称）
B) 详细资料
C) 实名认证

[Answer]: A

## Question 4
核心互动功能有哪些？

A) 仅浏览
B) 评论+点赞/收藏
C) 完整社区

[Answer]: B

## Question 5
用户是否可以发布内容？

A) 不可以
B) 可以发布文章/故事
C) 可以发布多媒体

[Answer]: B

## Question 6
管理员需要哪些管理功能？

A) 仅内容管理
B) 审核+内容管理
C) 完整后台

[Answer]: B

## Question 7
技术栈偏好？

A) Vue+Django
B) React+Express
C) Next.js
D) Other (please describe after [Answer]: tag below)

[Answer]: Other — React + FastAPI

## Question 8
数据库选型？

A) MySQL
B) PostgreSQL
C) SQLite
D) MongoDB

[Answer]: C

## Question 9
部署环境？

A) 本地开发
B) 云服务器
C) Docker容器

[Answer]: A

## Question 10
非遗项目分类体系？

A) 国家级非遗名录10大类
B) 自定义分类
C) 标签体系

[Answer]: A

## Question 11
项目规模和时间预期？

A) 小型MVP 1-2周
B) 中型项目 1-2月
C) 大型系统

[Answer]: A`

function DocModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '88%', maxWidth: 900, maxHeight: '85vh', background: 'var(--color-code-bg)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', cursor: 'default', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            </span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>requirement-verification-questions.md</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 13, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          >ESC 关闭</button>
        </div>
        <pre style={{ flex: 1, overflow: 'auto', padding: 24, fontSize: 14, lineHeight: 1.75, color: '#e2e8f0', margin: 0, whiteSpace: 'pre-wrap' }}>
          <code>{qaMarkdown}</code>
        </pre>
      </div>
    </div>
  )
}

export default function CaseRequirements() {
  const [showDoc, setShowDoc] = useState(false)
  return (
    <SlideLayout tag="产品设计与开发" title="案例1：AI辅助需求分析" subtitle="从模糊想法到结构化需求文档，AI帮你问对问题">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <ComparisonBlock
          before={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}><li>📝 产品经理手动梳理需求</li><li>🗣️ 多轮会议反复确认</li><li>📄 文档格式不统一</li><li>⏱️ 通常需要 3-5 天</li></ul>}
          after={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}><li>🤖 AI生成结构化验证问题</li><li>✅ 用户选择式回答，10分钟完成</li><li>📋 自动生成标准化需求文档</li><li>⚡ 从想法到文档仅需 30 分钟</li></ul>}
        />
        <div style={{ display: 'flex', gap: 20 }}>
          <div style={{ flex: 1 }}><CodeBlock title="实际工作流示例" code={promptExample} /></div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <button onClick={() => setShowDoc(true)} className="glow-card" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(245,158,11,0.08))', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 14, padding: '20px 24px', cursor: 'pointer', color: 'var(--color-text)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 14 }}>
              <span style={{ fontSize: 32, width: 52, height: 52, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(59,130,246,0.15)', borderRadius: 12, flexShrink: 0 }}>📄</span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600 }}>查看完整问答文档</div>
                <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>点击展开 requirement-verification-questions.md</div>
              </div>
              <span style={{ marginLeft: 'auto', fontSize: 20, color: 'var(--color-primary-light)' }}>→</span>
            </button>
            <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>⏱ 时间对比：</span><br/>传统方式：3-5天会议+文档整理<br/>AIDLC方式：30分钟问答+自动生成
            </div>
          </div>
        </div>
      </div>
      {showDoc && <DocModal onClose={() => setShowDoc(false)} />}
    </SlideLayout>
  )
}
