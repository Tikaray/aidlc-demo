import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'
import useMobile from '../hooks/useMobile'

const mappings = [
  { req: 'LLM自动生成爬虫代码', arch: 'litellm + 动态exec', why: 'litellm统一多模型接口，exec沙箱执行LLM生成的Python函数', color: '#3b82f6' },
  { req: '页面结构变更后自修复', arch: '失败检测 + 修复Prompt', why: '执行失败时将新HTML+旧代码+错误信息发给LLM重新生成', color: '#f59e0b' },
  { req: '模拟新闻页面可变更', arch: '3种HTML模板切换', why: '列表/卡片/表格三种布局，同数据不同结构，验证自修复能力', color: '#10b981' },
  { req: '手动+定时爬取', arch: 'FastAPI + APScheduler', why: 'API端点手动触发，APScheduler定时调度，防并发状态锁', color: '#8b5cf6' },
  { req: '实时监控面板', arch: '原生HTML/JS轮询', why: '极简前端3秒轮询4个API，展示状态/数据/代码/日志', color: '#ec4899' },
]

function DiagramBox({ title, children }) {
  return (
    <div style={{ background: 'rgba(59,130,246,0.04)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: 10, padding: 16, marginTop: 8, marginBottom: 8 }}>
      {title && <div style={{ fontSize: 12, color: 'var(--color-primary-light)', fontWeight: 600, marginBottom: 10 }}>{title}</div>}
      <pre style={{ fontSize: 12, lineHeight: 1.55, color: '#93c5fd', margin: 0, fontFamily: 'var(--font-mono)', whiteSpace: 'pre', overflowX: 'auto' }}>{children}</pre>
    </div>
  )
}
function SectionTitle({ children }) {
  return <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-text)', marginTop: 28, marginBottom: 12, paddingBottom: 8, borderBottom: '1px solid var(--color-border)' }}>{children}</h2>
}
function TR({ cells, header }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: cells.length === 4 ? '70px 200px 1fr 70px' : '160px 200px 1fr', gap: 10, padding: '7px 12px', background: header ? 'rgba(59,130,246,0.08)' : 'transparent', borderBottom: '1px solid var(--color-border)', fontSize: 12, fontWeight: header ? 600 : 400, color: header ? 'var(--color-text)' : 'var(--color-text-secondary)' }}>
      {cells.map((c, i) => <span key={i}>{c}</span>)}
    </div>
  )
}

function DocContent() {
  return (
    <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>Application Design — 自修复爬虫 MVP</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>AI根据需求文档自动生成</p>
      <SectionTitle>1. 系统架构</SectionTitle>
      <DiagramBox title="系统架构图">{`┌──────────────────────────────────────────────────┐
│                 FastAPI Server                    │
│                                                   │
│  ┌──────────┐  ┌──────────────┐  ┌────────────┐ │
│  │ 模拟新闻  │  │  爬虫引擎     │  │  监控API   │ │
│  │ 页面服务  │  │              │  │            │ │
│  │          │  │  - LLM调用   │  │  - 状态    │ │
│  │  - 3模板 │  │  - 代码生成  │  │  - 日志    │ │
│  │  - 切换  │  │  - 代码执行  │  │  - 数据    │ │
│  │          │  │  - 失败检测  │  │  - 触发    │ │
│  │          │  │  - 自动修复  │  │            │ │
│  └──────────┘  └──────────────┘  └────────────┘ │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │        内存数据存储 (In-Memory)              │  │
│  │  新闻数据 · 爬取日志 · 生成代码 · 状态      │  │
│  └────────────────────────────────────────────┘  │
│                                                   │
│  ┌────────────────────────────────────────────┐  │
│  │        定时任务调度器 (APScheduler)          │  │
│  └────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────┘`}</DiagramBox>
      <SectionTitle>2. 自修复数据流</SectionTitle>
      <DiagramBox title="首次爬取 + 自修复流程">{`首次爬取:
  触发 → 获取HTML → LLM生成代码 → 执行 → 验证 → 存储

自修复:
  执行失败 → 重新获取HTML → LLM(新HTML+旧代码+错误)
           → 生成新代码 → 执行验证 → 成功则更新代码

页面变更触发:
  用户切换模板 → 下次爬取旧代码失效 → 触发自修复`}</DiagramBox>
      <SectionTitle>3. API端点设计（9个端点）</SectionTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['方法', '端点', '说明', '备注']} />
        {[['GET','/news','模拟新闻HTML页面','3种模板'],['POST','/news/switch','切换页面结构','随机选不同模板'],['GET','/news/info','当前模板信息',''],['POST','/crawler/run','手动触发爬取','异步执行'],['GET','/crawler/status','爬虫状态','5种状态'],['GET','/crawler/news','爬取到的数据',''],['GET','/crawler/logs','爬取日志','最多50条'],['GET','/crawler/code','LLM生成的代码',''],['GET','/monitor','监控面板HTML','']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
      <SectionTitle>4. 技术选型</SectionTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['组件', '技术', '理由']} />
        {[['Web框架','FastAPI','异步支持、自带API文档、轻量'],['LLM集成','litellm','统一接口支持OpenAI/Claude/DeepSeek等'],['定时任务','APScheduler','轻量级Python调度器'],['HTTP客户端','httpx','异步HTTP请求'],['HTML解析','BeautifulSoup4','LLM生成代码中使用'],['前端','原生HTML+JS','极简MVP无需构建工具']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
      <SectionTitle>5. 目录结构</SectionTitle>
      <DiagramBox>{`self-healing-crawler/
├── app/
│   ├── main.py              # FastAPI入口
│   ├── config.py            # 配置管理（LLM模型、API Key）
│   ├── crawler_engine.py    # 爬虫引擎核心（LLM+执行+修复）
│   ├── scheduler.py         # 定时任务调度
│   ├── store.py             # 内存数据存储
│   ├── news_templates.py    # 3种新闻页面模板
│   └── routers/
│       ├── news.py          # 模拟新闻页面
│       ├── crawler.py       # 爬虫控制API
│       └── monitor.py       # 监控页面
├── static/
│   ├── monitor.html         # 监控面板
│   ├── monitor.js           # 轮询逻辑
│   └── style.css
├── requirements.txt
└── .env.example`}</DiagramBox>
    </div>
  )
}

function DocModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '92%', maxWidth: 1050, maxHeight: '90vh', background: 'var(--color-code-bg)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', cursor: 'default', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /></span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>application-design.md — AI生成的架构设计</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 13, padding: '4px 12px', borderRadius: 6, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          >ESC 关闭</button>
        </div>
        <DocContent />
      </div>
    </div>
  )
}

export default function CaseArchitecture() {
  const [showDoc, setShowDoc] = useState(false)
  const tilt = useTilt(3)
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="Step 2：AI辅助架构设计" subtitle="需求→架构，AI为每个技术选型提供需求溯源">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: m ? 'none' : 'grid', gridTemplateColumns: '170px 200px 1fr', gap: 14, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <span>📋 产品需求</span><span>🏗️ 架构方案</span><span>💡 设计理由</span>
        </div>
        {mappings.map((item, i) => (
          <div key={i} className="stagger-item glow-card tilt-card" style={{ animationDelay: `${0.15 + i * 0.08}s`, display: 'grid', gridTemplateColumns: m ? '1fr' : '170px 200px 1fr', gap: m ? 6 : 14, padding: '12px 16px', background: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', alignItems: 'center' }} {...tilt}>
            <span style={{ fontSize: 13, fontWeight: 600, color: item.color, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.color, flexShrink: 0, boxShadow: `0 0 8px ${item.color}60` }} />{item.req}
            </span>
            <span style={{ fontSize: 12, color: 'var(--color-primary-light)', fontFamily: 'var(--font-mono)', background: 'rgba(59,130,246,0.08)', padding: '4px 10px', borderRadius: 6, width: 'fit-content' }}>{item.arch}</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{item.why}</span>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 12, marginTop: 6 }}>
          <button onClick={() => setShowDoc(true)} className="glow-card" style={{ flex: 1, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 12, padding: '14px 20px', cursor: 'pointer', color: 'var(--color-text)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📄</span>
            <div><div style={{ fontSize: 14, fontWeight: 600 }}>查看完整架构设计文档</div><div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>系统架构图 · 数据流 · 9个API端点 · 目录结构</div></div>
            <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--color-primary-light)' }}>→</span>
          </button>
          <div className="stagger-item" style={{ animationDelay: '0.7s', flex: 1, padding: '14px 20px', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(245,158,11,0.08))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.15)', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>⏱ 耗时：</span>约10分钟。需求足够清晰，AI无需额外提问，直接生成完整架构方案。
          </div>
        </div>
      </div>
      {showDoc && <DocModal onClose={() => setShowDoc(false)} />}
    </SlideLayout>
  )
}
