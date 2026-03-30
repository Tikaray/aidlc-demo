import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useMobile from '../hooks/useMobile'
import useTilt from '../hooks/useTilt'

const projects = [
  {
    name: 'CGTN新闻爬虫',
    icon: '📰',
    color: '#3b82f6',
    desc: '真实网站爬虫，定时爬取CGTN 6个分类的RSS新闻',
    tech: 'FastAPI + feedparser + SQLAlchemy + SQLite + Jinja2',
    features: ['爬取CGTN 6个新闻分类（china/world/politics/business/sci-tech/sports）', '每30分钟自动爬取 + 手动触发', 'RSS Feed解析，自动提取标题/摘要/图片/日期', 'SQLite持久化存储 + URL去重', 'Jinja2模板渲染新闻列表页 + 分类筛选 + 分页', '爬取统计API'],
    stats: { files: '8', models: '2', apis: '3', time: '~30min' },
  },
  {
    name: '自修复爬虫',
    icon: '🔄',
    color: '#ef4444',
    desc: 'LLM驱动的智能爬虫，页面结构变更后自动修复',
    tech: 'FastAPI + litellm + APScheduler + BeautifulSoup4',
    features: ['LLM自动生成爬虫代码，零硬编码选择器', '3种HTML模板一键切换，模拟结构变更', '失败自动检测 + LLM重新生成代码自修复', '实时监控面板（状态/数据/代码/日志）', '多LLM模型支持（OpenAI/Claude/DeepSeek）', '内存存储，极简MVP架构'],
    stats: { files: '15', rules: '21', apis: '9', time: '~60min' },
  },
]

function ProjectCard({ p, i }) {
  const m = useMobile()
  const tilt = useTilt(4)
  return (
    <div className="stagger-item glow-card tilt-card" style={{
      animationDelay: `${0.2 + i * 0.15}s`,
      flex: 1, background: 'var(--color-surface)', borderRadius: 14,
      padding: m ? '16px' : '22px', border: '1px solid var(--color-border)',
      display: 'flex', flexDirection: 'column', gap: 14,
    }} {...tilt}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 32 }}>{p.icon}</span>
        <div>
          <div style={{ fontSize: m ? 16 : 18, fontWeight: 700, color: p.color }}>{p.name}</div>
          <div style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 2 }}>{p.desc}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: 'var(--color-primary-light)', fontFamily: 'var(--font-mono)', background: 'rgba(59,130,246,0.06)', padding: '6px 12px', borderRadius: 8 }}>{p.tech}</div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5 }}>
        {p.features.map((f, j) => (
          <li key={j} style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.5, paddingLeft: 14, position: 'relative' }}>
            <span style={{ position: 'absolute', left: 0, color: p.color }}>•</span>{f}
          </li>
        ))}
      </ul>
      <div style={{ display: 'flex', gap: 12, marginTop: 'auto', flexWrap: 'wrap' }}>
        {Object.entries(p.stats).map(([k, v]) => (
          <div key={k} style={{ textAlign: 'center', flex: 1, minWidth: 60, padding: '8px 0', background: 'rgba(255,255,255,0.02)', borderRadius: 8, border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: p.color }}>{v}</div>
            <div style={{ fontSize: 11, color: 'var(--color-text-secondary)' }}>{k === 'files' ? '文件数' : k === 'models' ? '数据模型' : k === 'rules' ? '业务规则' : k === 'apis' ? 'API端点' : '开发耗时'}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CaseCrawlerCompare() {
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战" title="两个爬虫项目对比" subtitle="不同复杂度的爬虫，同一套AIDLC流程，都在1小时内完成">
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: m ? 16 : 20 }}>
        {projects.map((p, i) => <ProjectCard key={i} p={p} i={i} />)}
      </div>
      <div className="stagger-item" style={{
        animationDelay: '0.6s', marginTop: 14, padding: '14px 20px',
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(239,68,68,0.08))',
        borderRadius: 12, border: '1px solid rgba(59,130,246,0.15)',
        fontSize: m ? 12 : 14, color: 'var(--color-text-secondary)', lineHeight: 1.7,
      }}>
        <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>✦ 共同点：</span>
        两个项目都遵循相同的AIDLC流程（需求分析→架构设计→功能设计→代码生成→构建测试），
        AI负责<span style={{ color: 'var(--color-primary-light)' }}>生成文档和代码</span>，
        人类负责<span style={{ color: 'var(--color-primary-light)' }}>决策和审核</span>，
        从一句话需求到可运行系统均在1小时内完成。
      </div>
    </SlideLayout>
  )
}
