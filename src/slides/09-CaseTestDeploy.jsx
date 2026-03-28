import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'

const testOutput = `AI生成的测试方案（节选）：

═══ 单元测试 (pytest) ═══════════════════════════════

# test_heritage_service.py
def test_get_items_by_category():
    """测试按分类筛选非遗项目"""
    items = heritage_service.get_items(category="传统技艺")
    assert all(i.category == "传统技艺" for i in items)

def test_get_items_search():
    """测试关键词搜索"""
    items = heritage_service.get_items(search="剪纸")
    assert any("剪纸" in i.name for i in items)

def test_create_article_pending():
    """测试发布文章默认状态为pending"""
    article = article_service.create(title="测试", ...)
    assert article.status == "pending"

def test_admin_approve_article():
    """测试管理员审核通过文章"""
    article_service.update_status(id=1, status="approved")
    assert article.status == "approved"

═══ 集成测试 (5个端到端场景) ═════════════════════════

场景1: 用户注册→登录→浏览→评论→点赞→收藏
场景2: 用户发布文章→管理员审核通过→文章公开显示
场景3: 管理员创建非遗项目→置顶→用户浏览验证
场景4: 搜索+分类筛选→分页→详情页完整流程
场景5: 管理员拒绝文章→用户查看状态→重新编辑

═══ 前端组件测试 ════════════════════════════════════

- HeritageCard: 渲染名称/分类/图片，点击跳转
- CommentSection: 发表评论、列表渲染、空状态
- CategoryFilter: 10大分类标签渲染、选中状态
- SearchBar: 输入防抖、回车搜索、清空

═══ 部署指南 ════════════════════════════════════════

# 后端启动
pip install -r requirements.txt
python seed.py          # 初始化种子数据
uvicorn main:app --reload --port 8000

# 前端启动
npm install
npm run dev             # 开发模式 localhost:5173

# 生产构建
npm run build           # 输出到 dist/
uvicorn main:app --host 0.0.0.0 --port 8000`

export default function CaseTestDeploy() {
  return (
    <SlideLayout tag="产品设计与开发" title="案例4：AI辅助测试与部署" subtitle="AI不只写代码——还能生成测试用例、部署指南和运维文档">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 3 }}>
          <CodeBlock title="AI生成的测试方案与部署指南" code={testOutput} />
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ComparisonBlock
            before={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>✍️ 手写测试用例</li><li>📝 手动编写部署文档</li><li>🐛 遗漏边界场景</li><li>⏱️ 测试编写占开发30%</li></ul>}
            after={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>🤖 AI生成测试框架</li><li>📋 自动生成部署指南</li><li>🎯 覆盖核心业务场景</li><li>⚡ 10分钟生成完整方案</li></ul>}
          />
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-accent)', marginBottom: 10, fontWeight: 600 }}>📦 AI生成的交付物</h4>
            <ul style={{ listStyle: 'none', fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 8, lineHeight: 1.6 }}>
              {[
                { icon: '🧪', text: '单元测试：覆盖6个Service层核心方法' },
                { icon: '🔗', text: '集成测试：5个端到端业务场景' },
                { icon: '🖥️', text: '前端测试：4个关键组件的渲染测试' },
                { icon: '📖', text: '部署指南：后端+前端启动命令' },
                { icon: '📊', text: '项目统计：文件数、代码行数、依赖清单' },
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>{item.icon}</span>{item.text}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓ 关键点：</span> AI生成的测试覆盖了正常流程和异常场景（如404、权限不足），但<span style={{ color: 'var(--color-accent)' }}>人工仍需补充业务边界case</span>和性能测试。
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
