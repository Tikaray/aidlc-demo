import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import useMobile from '../hooks/useMobile'

const codeExample = `# crawler_engine.py — AI生成的爬虫引擎核心

async def crawl():
    """执行一次完整爬取流程"""
    if store.status in ("running", "repairing"):
        return  # 防并发

    store.set_status("running")
    html = await _fetch_page(config.TARGET_URL)

    # 没有缓存代码则首次生成
    current_code = store.get_code()
    if not current_code:
        current_code = await _generate_code(html)
        store.set_code(current_code)

    # 在沙箱中执行LLM生成的代码
    try:
        result = _execute_code(current_code, html)
    except Exception as e:
        await _do_repair(html, current_code, str(e))
        return

    # 验证结果
    if not _validate_result(result):
        await _do_repair(html, current_code, "数据验证失败")
        return

    store.set_news(result)
    store.set_status("success")`

const steps = [
  { label: '配置管理', files: 'config.py', desc: 'LLM模型、API Key、爬取间隔', color: '#3b82f6' },
  { label: '数据存储', files: 'store.py', desc: '内存存储：状态/数据/代码/日志', color: '#8b5cf6' },
  { label: '新闻模板', files: 'news_templates.py', desc: '3种HTML模板（列表/卡片/表格）', color: '#10b981' },
  { label: '爬虫引擎', files: 'crawler_engine.py', desc: 'LLM调用+代码执行+自修复逻辑', color: '#ef4444' },
  { label: '定时调度', files: 'scheduler.py', desc: 'APScheduler定时爬取', color: '#f59e0b' },
  { label: 'API路由', files: '3个router', desc: '新闻/爬虫控制/监控页面', color: '#ec4899' },
  { label: '前端面板', files: 'HTML+JS+CSS', desc: '监控面板，3秒轮询', color: '#a78bfa' },
]

export default function CaseCodeGen() {
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="Step 3：AI辅助代码生成" subtitle="15步生成计划，15个文件，约20分钟完成">
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <CodeBlock title="AI生成的爬虫引擎核心代码" language="Python" code={codeExample} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 12, fontWeight: 600 }}>⚡ 生成流水线（15步）</h4>
            {steps.map((s, i) => (
              <div key={i} className="stagger-item" style={{ animationDelay: `${0.2 + i * 0.06}s`, display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}60`, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: s.color, width: 70, flexShrink: 0 }}>{s.label}</span>
                <span style={{ fontSize: 11, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{s.files}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.desc}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '14px 18px' }}>
            <h4 style={{ color: 'var(--color-success)', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>✓ 关键机制</h4>
            <ul style={{ listStyle: 'none', fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>• 每步生成后可暂停审核，确保质量</li>
              <li>• 遵循架构设计文档中的模块约定</li>
              <li>• 自动处理模块间import依赖</li>
              <li>• 生成完毕后自动构建测试验证</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
