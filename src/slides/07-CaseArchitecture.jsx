import React, { useState } from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import useTilt from '../hooks/useTilt'

const mappings = [
  { req: '用户浏览非遗项目', arch: 'React SPA + React Router', why: 'SPA实现无刷新浏览体验，Router管理列表/详情/分类页面路由', color: '#3b82f6' },
  { req: '用户注册登录', arch: 'FastAPI + JWT Auth', why: 'FastAPI高性能处理认证请求，JWT实现无状态Token鉴权，前后端分离友好', color: '#8b5cf6' },
  { req: '评论/点赞/收藏', arch: 'RESTful API + Context', why: 'REST端点处理CRUD操作，Context管理前端用户状态避免prop drilling', color: '#10b981' },
  { req: '内容发布与审核', arch: 'Service层 + 状态机', why: '文章状态流转(pending→approved/rejected)由Service层业务规则控制', color: '#f59e0b' },
  { req: '10大非遗分类', arch: 'SQLite + 枚举字段', why: 'SQLite零配置轻量存储，枚举字段确保分类一致性，支持筛选查询', color: '#ec4899' },
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
function SubTitle({ children }) {
  return <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-primary-light)', marginTop: 16, marginBottom: 8 }}>{children}</h3>
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
      <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--color-text)', marginBottom: 4 }}>Application Design — 非遗博物馆 MVP</h1>
      <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 16 }}>AI根据需求文档和用户技术选型自动生成</p>
      <SectionTitle>1. 系统架构总览</SectionTitle>
      <DiagramBox title="系统架构图">{`┌─────────────────────────────────────────────────────────────┐
│                      浏览器 (Chrome)                        │
└────────────────────────┬────────────────────────────────────┘
                         │  HTTP / JSON
┌────────────────────────┴────────────────────────────────────┐
│                   React SPA (Vite)                           │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌──────────┐ │
│  │  首页  │ │ 列表页 │ │ 详情页 │ │ 文章页 │ │ 管理后台 │ │
│  └───┬────┘ └───┬────┘ └───┬────┘ └───┬────┘ └────┬─────┘ │
│      └──────────┴──────────┴──────────┴────────────┘        │
│                         │                                    │
│  ┌──────────────────────┴─────────────────────────┐         │
│  │     AuthContext (状态)  +  API Client (axios)   │         │
│  └──────────────────────┬─────────────────────────┘         │
└────────────────────────┬────────────────────────────────────┘
                         │  RESTful API + JWT Bearer Token
┌────────────────────────┴────────────────────────────────────┐
│                   FastAPI Backend                             │
│  ┌─── Router Layer ────────────────────────────────────┐    │
│  │ /auth  /heritage  /articles  /comments  /likes      │    │
│  │ /favorites  /admin                                  │    │
│  └──────────────────────┬──────────────────────────────┘    │
│  ┌─── Service Layer ────┴──────────────────────────────┐    │
│  │ AuthSvc  HeritageSvc  ArticleSvc  CommentSvc       │    │
│  │ InteractionSvc  AdminSvc                            │    │
│  └──────────────────────┬──────────────────────────────┘    │
│  ┌─── Data Layer ───────┴──────────────────────────────┐    │
│  │ SQLAlchemy ORM  ←→  SQLite (heritage.db)            │    │
│  └─────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────┘`}</DiagramBox>
      <SectionTitle>2. 数据模型 ER 图</SectionTitle>
      <DiagramBox title="实体关系图">{`┌────────────────┐         ┌─────────────────────┐
│     User       │         │   HeritageItem      │
├────────────────┤         ├─────────────────────┤
│ id        PK   │         │ id           PK     │
│ email     UQ   │         │ name               │
│ password_hash  │    1  N │ category     ENUM  │
│ nickname       │────────→│ description        │
│ role     ENUM  │         │ image_url          │
│ created_at     │         │ is_pinned    BOOL  │
└─┬──┬──┬────────┘         │ created/updated_at │
  │  │  │                  └──┬──────────────────┘
  │  │  │  1            N     │  1             N
  │  │  └────→ ┌──────────┐  │  ┌──────────────┐
  │  │         │ Comment  │  │  │    Like      │
  │  │         ├──────────┤  │  ├──────────────┤
  │  │         │ id    PK │  │  │ id       PK  │
  │  │         │ content  │  │  │ user_id  FK  │
  │  │         │ user_id  │  │  │ item_id  FK  │
  │  │         │ item_id  │  │  │ created_at   │
  │  │         └──────────┘  │  └──────────────┘
  │  │  1                 N  │
  │  └──────→ ┌──────────────┤  ┌──────────────┐
  │           │  Favorite    │  │   Article    │
  │           ├──────────────┤  ├──────────────┤
  │           │ id       PK  │  │ id       PK  │
  │           │ user_id  FK  │  │ title        │
  │           │ item_id  FK  │  │ content TEXT │
  │           │ created_at   │  │ author_id FK │
  │           └──────────────┘  │ status  ENUM │
  │  1                       N  │ created_at   │
  └────────────────────────────→│ updated_at   │
                                └──────────────┘
status 状态流转: pending ──→ approved
                        └──→ rejected`}</DiagramBox>
      <SectionTitle>3. 前端组件结构（15个组件）</SectionTitle>
      <SubTitle>页面组件（10个）</SubTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['组件名', '路由', '说明']} />
        {[['HomePage','/','首页，展示置顶项目和10大分类入口'],['HeritageListPage','/heritage','非遗项目列表，分类筛选+搜索'],['HeritageDetailPage','/heritage/:id','项目详情，评论/点赞/收藏'],['ArticleListPage','/articles','用户文章列表'],['ArticleDetailPage','/articles/:id','文章详情页'],['ArticleCreatePage','/articles/new','发布文章（需登录）'],['ProfilePage','/profile','个人中心：收藏、我的文章'],['AdminDashboard','/admin','管理后台入口（admin角色）'],['AdminReviewPage','/admin/review','文章审核：通过/拒绝'],['LoginPage','/login','登录/注册页']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
      <SubTitle>共享组件（5个）</SubTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['组件名', '职责', '使用位置']} />
        {[['Navbar','顶部导航栏+用户状态','所有页面'],['HeritageCard','非遗项目卡片','首页、列表页'],['CommentSection','评论区：发表+列表','详情页'],['SearchBar','关键词搜索','列表页'],['CategoryFilter','10大分类筛选标签','列表页']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
      <SectionTitle>4. 前端页面流程图</SectionTitle>
      <DiagramBox title="用户浏览路径">{`首页 ──→ 分类筛选 ──→ 列表页 ──→ 详情页 ──→ 评论/点赞/收藏
 │                                  │
 ├──→ 搜索 ──→ 列表页               ├──→ 文章列表 ──→ 文章详情
 │                                  │
 └──→ 登录/注册                     └──→ 发布文章 ──→ 等待审核

管理员路径：
 管理后台 ──→ 审核文章（通过/拒绝）
    └──→ 管理非遗项目（增/删/改/置顶）`}</DiagramBox>
      <SectionTitle>5. 后端 API 端点（7个模块，17个端点）</SectionTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['方法', '端点', '说明', '权限']} />
        {[['POST','/api/auth/register','用户注册','公开'],['POST','/api/auth/login','登录返回JWT','公开'],['GET','/api/heritage','项目列表(分页+筛选)','公开'],['GET','/api/heritage/:id','项目详情','公开'],['POST','/api/heritage','创建项目','Admin'],['PUT','/api/heritage/:id','编辑项目','Admin'],['DELETE','/api/heritage/:id','删除项目','Admin'],['PATCH','/api/heritage/:id/pin','置顶/取消','Admin'],['GET','/api/articles','文章列表(approved)','公开'],['POST','/api/articles','发布文章(pending)','登录'],['GET','/api/comments?item_id=','评论列表','公开'],['POST','/api/comments','发表评论','登录'],['POST','/api/likes/:item_id','点赞/取消','登录'],['POST','/api/favorites/:item_id','收藏/取消','登录'],['GET','/api/favorites','我的收藏','登录'],['GET','/api/admin/articles','待审核文章','Admin'],['PATCH','/api/admin/articles/:id','审核(通过/拒绝)','Admin']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
      <SectionTitle>6. 服务层依赖关系</SectionTitle>
      <DiagramBox title="Service层架构">{`┌─────────────┐   ┌────────────────┐   ┌────────────────┐
│ AuthService │   │HeritageService │   │ArticleService  │
│ · register  │   │ · get_items    │   │ · create       │
│ · login     │   │ · get_detail   │   │ · get_list     │
│ · verify    │   │ · create/edit  │   │ · update_status│
│ · hash_pwd  │   │ · delete/pin   │   │                │
└──────┬──────┘   └───────┬────────┘   └───────┬────────┘
       │                  │                     │
       │   ┌──────────────┼─────────────────────┘
       ▼   ▼              ▼
┌──────────────┐ ┌─────────────────┐ ┌──────────────┐
│CommentService│ │InteractionSvc   │ │ AdminService  │
│ · create     │ │ · toggle_like   │ │ · review      │
│ · list       │ │ · toggle_fav    │ │ · manage      │
│ · delete     │ │ · get_counts    │ │ · check_role  │
└──────────────┘ └─────────────────┘ └──────────────┘

所有Service通过构造函数注入 db: Session`}</DiagramBox>
      <SectionTitle>7. 组件依赖矩阵</SectionTitle>
      <DiagramBox title="前端组件 → 后端API 调用关系">{`组件                  │auth│heritage│articles│comments│likes│favs│admin
──────────────────────┼────┼────────┼────────┼────────┼─────┼────┼─────
HomePage              │    │   ✓    │        │        │     │    │
HeritageListPage      │    │   ✓    │        │        │     │    │
HeritageDetailPage    │    │   ✓    │        │   ✓    │  ✓  │ ✓  │
ArticleListPage       │    │        │   ✓    │        │     │    │
ArticleCreatePage     │ ✓  │        │   ✓    │        │     │    │
ProfilePage           │ ✓  │        │   ✓    │        │     │ ✓  │
LoginPage             │ ✓  │        │        │        │     │    │
AdminDashboard        │ ✓  │   ✓    │        │        │     │    │  ✓
AdminReviewPage       │ ✓  │        │   ✓    │        │     │    │  ✓`}</DiagramBox>
      <SectionTitle>8. 技术决策记录</SectionTitle>
      <div style={{ borderRadius: 8, border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <TR header cells={['决策项', '选择', '理由']} />
        {[['前端框架','React 18','生态成熟，组件化开发，团队熟悉'],['状态管理','Context+useReducer','MVP状态简单，无需Redux'],['路由','React Router v6','SPA标准方案，嵌套路由+守卫'],['后端框架','FastAPI','高性能异步，自动OpenAPI文档'],['ORM','SQLAlchemy','Python最成熟ORM，关系映射'],['数据库','SQLite','MVP零配置，后续可迁移PostgreSQL'],['认证','JWT Bearer Token','无状态，前后端分离友好'],['API风格','RESTful JSON','标准化，axios直接对接']].map((r,i) => <TR key={i} cells={r} />)}
      </div>
    </div>
  )
}

function DocModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <div onClick={e => e.stopPropagation()} style={{ width: '92%', maxWidth: 1050, maxHeight: '90vh', background: 'var(--color-code-bg)', border: '1px solid var(--color-border)', borderRadius: 16, overflow: 'hidden', boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(59,130,246,0.1)', display: 'flex', flexDirection: 'column', cursor: 'default', animation: 'scaleIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards' }}>
        <div style={{ padding: '12px 20px', background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ display: 'flex', gap: 6 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }} />
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} />
            </span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>application-design.md — AI自动生成的架构设计文档</span>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)', fontSize: 13, padding: '4px 12px', borderRadius: 6, cursor: 'pointer', transition: 'all 0.2s' }}
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
  return (
    <SlideLayout tag="产品设计与开发" title="案例2：AI辅助架构设计" subtitle="AI不只是画架构图——它会解释每个技术选型如何满足产品需求">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '160px 190px 1fr', gap: 16, padding: '8px 16px', fontSize: 13, fontWeight: 600, color: 'var(--color-text-secondary)', borderBottom: '1px solid var(--color-border)' }}>
          <span>📋 产品需求</span><span>🏗️ 架构方案</span><span>💡 为什么这样设计</span>
        </div>
        {mappings.map((m, i) => (
          <div key={i} className="stagger-item glow-card tilt-card" style={{ animationDelay: `${0.15 + i * 0.08}s`, display: 'grid', gridTemplateColumns: '160px 190px 1fr', gap: 16, padding: '12px 16px', background: 'var(--color-surface)', borderRadius: 12, border: '1px solid var(--color-border)', alignItems: 'center' }} {...tilt}>
            <span style={{ fontSize: 13, fontWeight: 600, color: m.color, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, flexShrink: 0, boxShadow: `0 0 8px ${m.color}60` }} />{m.req}
            </span>
            <span style={{ fontSize: 12, color: 'var(--color-primary-light)', fontFamily: 'var(--font-mono)', background: 'rgba(59,130,246,0.08)', padding: '4px 10px', borderRadius: 6 }}>{m.arch}</span>
            <span style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{m.why}</span>
          </div>
        ))}
        <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
          <button onClick={() => setShowDoc(true)} className="glow-card" style={{ flex: 1, background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(139,92,246,0.08))', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 12, padding: '14px 20px', cursor: 'pointer', color: 'var(--color-text)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 24 }}>📄</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>查看完整架构设计文档</div>
              <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>15个前端组件 · 7个API模块 · 6个服务层 · 数据模型关系</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: 18, color: 'var(--color-primary-light)' }}>→</span>
          </button>
          <div className="stagger-item" style={{ animationDelay: '0.7s', flex: 1, padding: '14px 20px', background: 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(245,158,11,0.08))', borderRadius: 12, border: '1px solid rgba(59,130,246,0.15)', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>✦ 核心价值：</span> AI为每个技术决策提供<span style={{ color: 'var(--color-primary-light)' }}>需求溯源</span>，让团队清楚"为什么选这个技术"。
          </div>
        </div>
      </div>
      {showDoc && <DocModal onClose={() => setShowDoc(false)} />}
    </SlideLayout>
  )
}
