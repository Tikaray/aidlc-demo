import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'

const codeExample = `# heritage_service.py — AI生成的非遗项目服务层

from sqlalchemy.orm import Session
from fastapi import HTTPException
from models import HeritageItem
from schemas import HeritageItemCreate

class HeritageService:
    def __init__(self, db: Session):
        self.db = db

    def get_items(self, category=None, search=None, page=1, size=20):
        """获取非遗项目列表，支持分类筛选和关键词搜索"""
        query = self.db.query(HeritageItem)
        if category:
            query = query.filter(HeritageItem.category == category)
        if search:
            query = query.filter(HeritageItem.name.contains(search))
        # 置顶项目优先显示
        query = query.order_by(
            HeritageItem.is_pinned.desc(),
            HeritageItem.created_at.desc()
        )
        return query.offset((page - 1) * size).limit(size).all()

    def create_item(self, data: HeritageItemCreate):
        """管理员创建非遗项目"""
        item = HeritageItem(**data.dict())
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item`

const genPlanMd = `# Code Generation Plan — 非遗博物馆 MVP

## 生成步骤（共28步）

### 后端基础（4步）
- [x] Step 1:  项目初始化 (requirements.txt)
- [x] Step 2:  数据库配置 (database.py)
- [x] Step 3:  数据模型定义 (models.py) — 6个模型
- [x] Step 4:  Pydantic Schema (schemas.py)

### 后端认证（2步）
- [x] Step 5:  JWT认证模块 (auth.py)
- [x] Step 6:  密码哈希 + Token生成/验证

### 后端服务层（6步）
- [x] Step 7:  HeritageService — 非遗项目CRUD
- [x] Step 8:  ArticleService — 文章发布+审核流转
- [x] Step 9:  CommentService — 评论管理
- [x] Step 10: InteractionService — 点赞/收藏
- [x] Step 11: AdminService — 管理员操作
- [x] Step 12: UserService — 用户信息管理

### 后端路由（7步）
- [x] Step 13-19: 7个API路由模块

### 后端入口（2步）
- [x] Step 20: main.py — FastAPI应用入口+CORS
- [x] Step 21: seed.py — 种子数据（10大类非遗示例）

### 前端（7步）
- [x] Step 22: 项目初始化 + API客户端
- [x] Step 23: AuthContext + 路由配置
- [x] Step 24: 布局组件 (Navbar, Footer)
- [x] Step 25: 共享组件 (Card, Search, Filter)
- [x] Step 26: 页面组件 — 浏览类 (Home, List, Detail)
- [x] Step 27: 页面组件 — 互动类 (Article, Profile)
- [x] Step 28: 页面组件 — 管理类 (Admin Dashboard)

## 生成统计
- 后端：15个文件，约1200行代码
- 前端：27个文件，约2000行代码
- 总计：42个文件，耗时约20分钟（含人工审核）`

const steps = [
  { label: '后端基础', files: '4个文件', desc: '项目配置、数据库、模型、Schema', color: '#3b82f6' },
  { label: '认证模块', files: '2个文件', desc: 'JWT + 密码哈希', color: '#8b5cf6' },
  { label: '服务层', files: '6个文件', desc: '6个业务服务，封装核心逻辑', color: '#10b981' },
  { label: 'API路由', files: '7个文件', desc: '7个RESTful路由模块', color: '#f59e0b' },
  { label: '前端应用', files: '27个文件', desc: '组件、页面、状态管理、样式', color: '#ec4899' },
]

function DocModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '88%', maxWidth: 900, maxHeight: '85vh', background: 'var(--color-code-bg)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', cursor: 'default', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 6 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} /><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} /></span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>code-generation-plan.md — 28步代码生成计划</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 13, padding: '4px 12px', borderRadius: 6, cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; e.currentTarget.style.color = '#ef4444' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'var(--color-text-secondary)' }}
          >ESC 关闭</button>
        </div>
        <pre style={{ flex: 1, overflow: 'auto', padding: 24, fontSize: 14, lineHeight: 1.75, color: '#e2e8f0', margin: 0, whiteSpace: 'pre-wrap' }}><code>{genPlanMd}</code></pre>
      </div>
    </div>
  )
}

export default function CaseCodeGen() {
  const [showPlan, setShowPlan] = useState(false)
  return (
    <SlideLayout tag="产品设计与开发" title="案例3：AI辅助代码生成" subtitle="从设计文档到可运行代码，28步自动生成42个文件">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <CodeBlock title="AI生成的业务代码示例" language="Python" code={codeExample} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Generation pipeline */}
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-text)', marginBottom: 12, fontWeight: 600 }}>⚡ 生成流水线（28步）</h4>
            {steps.map((s, i) => (
              <div key={i} className="stagger-item" style={{ animationDelay: `${0.2 + i * 0.08}s`, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: i < steps.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: s.color, boxShadow: `0 0 6px ${s.color}60`, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 600, color: s.color, width: 70, flexShrink: 0 }}>{s.label}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', fontFamily: 'var(--font-mono)', background: 'rgba(255,255,255,0.04)', padding: '2px 8px', borderRadius: 4, flexShrink: 0 }}>{s.files}</span>
                <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{s.desc}</span>
              </div>
            ))}
          </div>
          {/* View plan button */}
          <button onClick={() => setShowPlan(true)} className="glow-card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(59,130,246,0.08))', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 12, padding: '14px 18px', cursor: 'pointer', color: 'var(--color-text)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 22 }}>📋</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>查看完整生成计划</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>code-generation-plan.md · 28步详细清单</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--color-primary-light)' }}>→</span>
          </button>
          {/* Key points */}
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '14px 18px' }}>
            <h4 style={{ color: 'var(--color-success)', fontSize: 13, marginBottom: 6, fontWeight: 600 }}>✓ 关键机制</h4>
            <ul style={{ listStyle: 'none', fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <li>• 每步生成后可暂停审核，确保质量</li>
              <li>• 遵循架构设计文档中的组件约定</li>
              <li>• 自动处理模块间import依赖关系</li>
              <li>• 传统开发预估5-7天，AI仅需20分钟</li>
            </ul>
          </div>
        </div>
      </div>
      {showPlan && <DocModal onClose={() => setShowPlan(false)} />}
    </SlideLayout>
  )
}
