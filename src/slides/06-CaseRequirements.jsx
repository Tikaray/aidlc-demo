import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'
import useMobile from '../hooks/useMobile'

const promptExample = `用户需求：
"构建一个全自动自修复爬虫MVP，
 爬虫事先不知道页面结构，
 通过大模型自行编程爬取，
 页面结构变更后能自动修复"

AI自动生成的验证问题：
┌──────────────────────────────────────────┐
│ Q1: 模拟新闻页面的内容类型？              │
│ Q2: 页面结构变更包含哪些类型？            │
│ Q3: LLM接口偏好？                        │
│ Q4: 技术栈偏好？                          │
│ Q5: 爬虫运行方式？                        │
│ Q6: 状态展示需要哪些信息？                │
│ Q7: 自修复机制的期望行为？                │
│ Q8: MVP规模和时间？                       │
│ Q9: 部署方式？                            │
│ ...共9个结构化问题                        │
└──────────────────────────────────────────┘

→ 用户选择式回答后，AI自动生成：
  ✓ 17项功能需求 + 5项非功能需求
  ✓ 系统架构概要图
  ✓ MVP范围边界定义`

const qaMarkdown = `# 自修复爬虫 MVP — 需求澄清问题

> 请在每个问题的 [Answer]: 后填写您的选择

---

## Question 1
模拟新闻页面的内容类型？

A) 简单新闻列表（标题 + 摘要 + 日期）
B) 新闻列表 + 详情页
C) 复杂新闻门户

[Answer]: A

## Question 2
"一键变更页面结构"具体包含哪些变更类型？

A) 仅HTML标签/class名变更
B) 标签变更 + 布局变更（列表→卡片、表格→列表）
C) 标签变更 + 布局变更 + 数据字段变更

[Answer]: B

## Question 3
爬虫使用的大模型（LLM）接口偏好？

A) OpenAI API
B) Anthropic Claude API
C) 国产大模型
D) 支持多种模型切换，通过配置选择

[Answer]: D

## Question 4
技术栈偏好？

A) Python全栈（FastAPI后端 + 简单HTML/JS前端）
B) Node.js全栈
C) Python后端 + React前端

[Answer]: A

## Question 5
爬虫的运行方式？

A) 手动触发
B) 定时自动爬取
C) 手动触发 + 定时自动爬取都支持

[Answer]: C

## Question 6
爬虫状态展示需要包含哪些信息？

A) 基础状态（成功/失败 + 最后爬取时间）
B) 基础状态 + 爬取日志
C) 基础状态 + 爬取日志 + LLM生成的爬虫代码展示

[Answer]: C

## Question 7
自修复机制的期望行为？

A) 页面变更后，下次爬取自动检测失败并重新生成爬虫代码
B) 页面变更后，实时检测并立即触发修复
C) 页面变更后，用户手动触发修复

[Answer]: A

## Question 8
MVP的预期时间范围和规模？

A) 极简MVP（3-5天，核心爬取+自修复演示）
B) 小型MVP（1-2周，完整演示+状态展示+日志）

[Answer]: A

## Question 9
部署方式？

A) 本地开发环境运行即可
B) Docker容器化

[Answer]: A`

function DocModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '88%', maxWidth: 900, maxHeight: '85vh', background: 'var(--color-code-bg)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', cursor: 'default', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /></span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>requirement-verification-questions.md</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 13, padding: '4px 12px', borderRadius: 6, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          >ESC 关闭</button>
        </div>
        <pre style={{ flex: 1, overflow: 'auto', padding: 24, fontSize: 14, lineHeight: 1.75, color: '#e2e8f0', margin: 0, whiteSpace: 'pre-wrap' }}><code>{qaMarkdown}</code></pre>
      </div>
    </div>
  )
}

export default function CaseRequirements() {
  const [showDoc, setShowDoc] = useState(false)
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="Step 1：AI辅助需求分析" subtitle="一句话需求 → 9个验证问题 → 完整需求文档">
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 20 }}>
        <div style={{ flex: 1 }}><CodeBlock title="实际工作流" code={promptExample} /></div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <ComparisonBlock
            before={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>📝 手动梳理需求</li><li>🗣️ 多轮会议确认</li><li>📄 格式不统一</li><li>⏱️ 3-5天</li></ul>}
            after={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>🤖 AI生成验证问题</li><li>✅ 选择式回答10分钟</li><li>📋 标准化需求文档</li><li>⚡ 15分钟完成</li></ul>}
          />
          <button onClick={() => setShowDoc(true)} className="glow-card" style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(245,158,11,0.08))', border: '1px solid rgba(59,130,246,0.3)', borderRadius: 14, padding: '16px 20px', cursor: 'pointer', color: 'var(--color-text)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 28 }}>📄</span>
            <div><div style={{ fontSize: 15, fontWeight: 600 }}>查看完整问答文档</div><div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>9个AI验证问题 + 用户回答</div></div>
            <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--color-primary-light)' }}>→</span>
          </button>
        </div>
      </div>
      {showDoc && <DocModal onClose={() => setShowDoc(false)} />}
    </SlideLayout>
  )
}
