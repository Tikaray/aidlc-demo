import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import FlowChart from '../components/ContentBlocks/FlowChart'
import useMobile from '../hooks/useMobile'

const steps = [
  { icon: '📋', title: '需求分析', desc: '9个验证问题' },
  { icon: '🏗️', title: '架构设计', desc: '单体FastAPI' },
  { icon: '📐', title: '功能设计', desc: '6个业务流程' },
  { icon: '⚡', title: '代码生成', desc: '15个文件' },
  { icon: '✅', title: '构建测试', desc: '全部通过' },
]

const features = [
  { icon: '🤖', title: 'LLM自动编程', desc: '爬虫不写一行选择器代码，全部由大模型根据页面HTML自动生成Python爬取函数', color: '#3b82f6' },
  { icon: '🔄', title: '结构变更自修复', desc: '页面HTML结构改变后，爬虫自动检测失败，重新调用LLM生成适配新结构的代码', color: '#f59e0b' },
  { icon: '📊', title: '实时监控面板', desc: '展示爬取状态、提取的数据、LLM生成的代码、历史日志，3秒自动刷新', color: '#10b981' },
  { icon: '🔀', title: '模拟页面变更', desc: '内置3种HTML模板（列表/卡片/表格），一键切换结构触发自修复演示', color: '#8b5cf6' },
]

export default function CaseCrawlerOverview() {
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="项目概览：自修复爬虫系统" subtitle="用一个完整案例，走一遍AIDLC开发全流程">
      <div style={{ display: 'flex', flexDirection: 'column', gap: m ? 16 : 22 }}>
        <FlowChart steps={steps} />
        <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 10 : 14 }}>
          {features.map((f, i) => (
            <div key={i} className="stagger-item glow-card" style={{
              animationDelay: `${0.3 + i * 0.1}s`,
              background: 'var(--color-surface)', borderRadius: 12, padding: m ? '14px 16px' : '18px 22px',
              border: '1px solid var(--color-border)', display: 'flex', gap: 14, alignItems: 'flex-start',
            }}>
              <span style={{ fontSize: m ? 24 : 30, flexShrink: 0 }}>{f.icon}</span>
              <div>
                <div style={{ fontSize: m ? 14 : 16, fontWeight: 600, color: f.color }}>{f.title}</div>
                <div style={{ fontSize: m ? 12 : 13, color: 'var(--color-text-secondary)', marginTop: 4, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="stagger-item" style={{
          animationDelay: '0.7s', padding: '12px 18px',
          background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(245,158,11,0.08))',
          borderRadius: 12, border: '1px solid rgba(59,130,246,0.15)',
          fontSize: m ? 12 : 14, color: 'var(--color-text-secondary)', lineHeight: 1.7,
        }}>
          <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>技术栈：</span>
          FastAPI + litellm（多模型支持）+ APScheduler + BeautifulSoup4 + 原生HTML/JS
        </div>
      </div>
    </SlideLayout>
  )
}
