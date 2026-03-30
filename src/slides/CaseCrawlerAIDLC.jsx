import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useMobile from '../hooks/useMobile'
import useTilt from '../hooks/useTilt'

const stages = [
  {
    icon: '📋', phase: 'Inception', title: '需求分析',
    time: '~15分钟', color: '#3b82f6',
    detail: 'AI生成9个验证问题，用户选择式回答。确定了：简单新闻列表、标签+布局变更、多模型LLM支持、Python FastAPI全栈、手动+定时爬取、状态+日志+代码展示、自动检测修复。',
    output: '需求文档（17项功能需求 + 5项非功能需求）',
  },
  {
    icon: '🏗️', phase: 'Inception', title: '架构设计',
    time: '~10分钟', color: '#8b5cf6',
    detail: '需求足够清晰，AI无需额外提问，直接生成架构方案：单体FastAPI应用，3个路由模块（新闻/爬虫/监控），内存存储，litellm统一多模型接口，APScheduler定时任务。',
    output: '架构设计文档 + 目录结构 + 数据流图',
  },
  {
    icon: '📐', phase: 'Construction', title: '功能设计',
    time: '~10分钟', color: '#10b981',
    detail: 'AI生成6个业务流程（首次爬取、代码执行验证、自修复、模板切换、定时调度、监控轮询）、21条业务规则、5个领域实体、前端组件设计。',
    output: '4份功能设计文档（业务逻辑+规则+实体+前端）',
  },
  {
    icon: '⚡', phase: 'Construction', title: '代码生成',
    time: '~20分钟', color: '#f59e0b',
    detail: '15步生成计划，AI逐步生成：配置管理、内存存储、3种新闻模板、爬虫引擎核心（含LLM调用+自修复逻辑）、定时调度、3个路由、前端监控面板、README。',
    output: '15个文件（11后端 + 3前端 + 1文档）',
  },
  {
    icon: '✅', phase: 'Construction', title: '构建测试',
    time: '~5分钟', color: '#ec4899',
    detail: '依赖安装成功，应用导入验证通过（15个路由全部注册），服务器启动正常，所有API端点测试通过。',
    output: '构建测试报告 + 可运行的完整系统',
  },
]

function StageCard({ s, i, expanded, onToggle }) {
  const m = useMobile()
  const tilt = useTilt(expanded ? 0 : 4)
  return (
    <div
      className={`stagger-item ${expanded ? '' : 'glow-card tilt-card'}`}
      onClick={onToggle}
      style={{
        animationDelay: `${0.1 + i * 0.08}s`,
        background: expanded ? 'var(--color-surface-hover)' : 'var(--color-surface)',
        borderRadius: 12, padding: m ? '14px 16px' : '16px 20px',
        border: `1px solid ${expanded ? s.color : 'var(--color-border)'}`,
        cursor: 'pointer', transition: 'all 0.3s ease',
        boxShadow: expanded ? `0 0 20px ${s.color}20` : 'none',
      }}
      {...(expanded ? {} : tilt)}
    >
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <span style={{ fontSize: m ? 22 : 26 }}>{s.icon}</span>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, color: s.color, background: `${s.color}15`, padding: '2px 8px', borderRadius: 4, fontWeight: 600 }}>{s.phase}</span>
            <span style={{ fontSize: m ? 14 : 16, fontWeight: 600, color: 'var(--color-text)' }}>{s.title}</span>
          </div>
          {!expanded && <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{s.output}</div>}
        </div>
        <span style={{ fontSize: 12, color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>{s.time}</span>
        <span style={{ fontSize: 12, color: s.color, transform: expanded ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>▼</span>
      </div>
      {expanded && (
        <div style={{ marginTop: 12, animation: 'fadeInUp 0.3s ease forwards' }}>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.8, padding: '10px 14px', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            {s.detail}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, color: s.color, fontWeight: 600 }}>
            📦 产出：{s.output}
          </div>
        </div>
      )}
    </div>
  )
}

export default function CaseCrawlerAIDLC() {
  const [expanded, setExpanded] = useState(-1)
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="AIDLC全流程回顾" subtitle="从一句话需求到可运行系统，约60分钟（点击展开详情）">
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 8 : 10 }}>
        {stages.map((s, i) => (
          <StageCard key={i} s={s} i={i} expanded={expanded === i} onToggle={() => setExpanded(expanded === i ? -1 : i)} />
        ))}
        <div className="stagger-item" style={{
          animationDelay: '0.6s', padding: '12px 18px',
          background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.08))',
          borderRadius: 12, border: '1px solid rgba(16,185,129,0.15)',
          fontSize: m ? 12 : 14, color: 'var(--color-text-secondary)', lineHeight: 1.7,
          display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap',
        }}>
          {[
            { num: '~60min', label: '总耗时' },
            { num: '15', label: '生成文件' },
            { num: '21', label: '业务规则' },
            { num: '9', label: 'API端点' },
          ].map((d, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: m ? 20 : 24, fontWeight: 800, color: 'var(--color-accent)' }}>{d.num}</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  )
}
