import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'

const promptExample = `Prompt：
"请为我们的非遗文化公众号策划下个月的内容日历，要求：
 - 每周3篇推文
 - 覆盖传统技艺、民俗、传统美术三个主题
 - 结合即将到来的清明节热点
 - 包含互动话题设计"

AI输出（完整月度日历）：
┌─ 第1周：清明节专题 ─────────────────────────┐
│ 周一：《清明时节的非遗记忆》— 民俗            │
│       角度：清明节相关的非遗习俗盘点            │
│ 周三：《纸鸢飞处是故乡》— 传统技艺            │
│       角度：风筝制作技艺 + 清明放风筝传统       │
│ 周五：《春日里的非遗色彩》— 传统美术            │
│       角度：春季主题的年画/剪纸作品赏析          │
│ 互动：#晒出你身边的非遗# 话题征集              │
├─ 第2周：匠人故事 ──────────────────────────┤
│ 周一：《守艺人：一辈子只做一件事》— 传统技艺    │
│ 周三：《村里的老手艺，你还记得吗》— 民俗        │
│ 周五：《从泥巴到艺术品》— 传统美术              │
│ 互动：#我家乡的老手艺# 故事征集                │
├─ 第3周：非遗进校园 ────────────────────────┤
│ 周一：《当00后遇上非遗》— 传统技艺              │
│ 周三：《课本里的非遗》— 民俗                    │
│ 周五：《小小传承人》— 传统美术                  │
│ 互动：投票：你最想学的非遗技艺是？              │
├─ 第4周：非遗与现代生活 ────────────────────┤
│ 周一：《非遗×潮玩：传统的新表达》— 传统技艺    │
│ 周三：《舌尖上的非遗》— 民俗                    │
│ 周五：《非遗配色灵感》— 传统美术                │
│ 互动：月度最佳非遗故事评选                      │
└──────────────────────────────────────────────┘

附加输出：
✓ 每篇推文的关键词标签建议
✓ 配图风格指引（色调、构图参考）
✓ 最佳发布时间建议（基于公众号数据规律）
✓ 月度KPI预估（阅读量、互动率目标）`

export default function CasePlanning() {
  return (
    <SlideLayout tag="新媒体运营" title="案例4：AI辅助内容策划" subtitle="从选题到内容日历，AI帮你系统化策划一整个月">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 3 }}>
          <CodeBlock title="实际Prompt与AI完整输出" code={promptExample} />
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ComparisonBlock
            before={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>🧠 凭经验选题</li><li>📊 缺乏系统规划</li><li>🔄 选题重复</li><li>⏱️ 需 2-3 天</li></ul>}
            after={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>🤖 主题矩阵选题</li><li>📅 结构化日历</li><li>🎯 主题均衡</li><li>⚡ 30分钟搞定</li></ul>}
          />
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-accent)', marginBottom: 10, fontWeight: 600 }}>💡 Prompt技巧</h4>
            <ul style={{ listStyle: 'none', fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 6, lineHeight: 1.6 }}>
              <li>• 明确<span style={{ color: 'var(--color-primary-light)' }}>频率</span>（每周3篇）和<span style={{ color: 'var(--color-primary-light)' }}>主题范围</span></li>
              <li>• 指定<span style={{ color: 'var(--color-primary-light)' }}>热点结合</span>（清明节）增加时效性</li>
              <li>• 要求<span style={{ color: 'var(--color-primary-light)' }}>互动设计</span>提升用户参与度</li>
              <li>• 让AI输出<span style={{ color: 'var(--color-primary-light)' }}>配套建议</span>（配图、发布时间）</li>
            </ul>
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
