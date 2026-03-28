import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'
import CodeBlock from '../components/ContentBlocks/CodeBlock'

const promptAndOutput = `Prompt（结构化文案生成）：
"为非遗剪纸艺术写一篇公众号推文，要求：
 - 风格：温暖有文化底蕴，不要说教感
 - 结构：开头故事引入→技艺介绍→传承人故事→互动引导
 - 字数：800-1000字
 - 标题备选：3个
 - 配图建议：3张图的拍摄角度/风格描述"

═══════════════════════════════════════════

AI输出：

📌 标题备选：
  1.「一把剪刀，剪出千年的温柔」
  2.「纸上生花：那些藏在指尖的中国故事」
  3.「从奶奶的窗花到世界的掌声」

📝 正文（节选）：

  小时候过年，奶奶总会搬出那把老剪刀。
  一张红纸，在她手里翻转几下，
  窗花就像变魔术一样出现了——
  喜鹊登梅、年年有鱼、福字团花……

  剪纸，是中国最古老的民间艺术之一。
  2006年入选第一批国家级非物质文化遗产名录，
  2009年被联合国教科文组织列入人类非遗代表作名录。

  在陕西安塞，有一位叫李秀芳的老人，
  她从8岁开始跟着母亲学剪纸，
  一剪就是六十年……
  （正文约950字，此处节选）

  你的家乡有什么非遗手艺？
  评论区聊聊，说不定下期就写你家乡的故事 👇

═══════════════════════════════════════════

🖼️ 配图建议：
  图1：特写 — 老人手持剪刀剪纸的手部特写
       风格：暖色调，浅景深，突出手的纹理和红纸
  图2：作品 — 完成的剪纸作品平铺展示
       风格：白色背景，俯拍，突出图案细节
  图3：场景 — 窗户上贴着窗花，阳光透过
       风格：逆光，营造温暖怀旧氛围

📊 发布建议：
  最佳时间：周三 20:00-21:00
  预估阅读：3000-5000（基于账号历史数据）
  标签：#非遗 #剪纸 #传统文化 #民间艺术`

export default function CaseCopywriting() {
  return (
    <SlideLayout tag="新媒体运营" title="案例6：AI辅助文案生成" subtitle="结构化Prompt + 人工润色 = 高效高质量内容产出">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 3 }}>
          <CodeBlock title="Prompt输入与AI完整输出" code={promptAndOutput} />
        </div>
        <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ComparisonBlock
            before={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>✍️ 从零构思</li><li>🔍 大量搜资料</li><li>🔄 反复修改</li><li>⏱️ 4-6小时/篇</li></ul>}
            after={<ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, fontSize: 14 }}><li>🤖 AI生成初稿</li><li>📋 结构化Prompt</li><li>✨ 人工润色</li><li>⚡ 30-60分钟/篇</li></ul>}
          />
          <div style={{ background: 'var(--color-surface)', borderRadius: 12, padding: 16, border: '1px solid var(--color-border)' }}>
            <h4 style={{ fontSize: 14, color: 'var(--color-accent)', marginBottom: 10, fontWeight: 600 }}>💡 Prompt结构化技巧</h4>
            <ul style={{ listStyle: 'none', fontSize: 13, color: 'var(--color-text-secondary)', display: 'flex', flexDirection: 'column', gap: 6, lineHeight: 1.6 }}>
              <li>① <span style={{ color: 'var(--color-primary-light)' }}>风格定义</span> — 温暖/专业/幽默，避免AI默认的"说教感"</li>
              <li>② <span style={{ color: 'var(--color-primary-light)' }}>结构约束</span> — 明确段落顺序，确保逻辑流畅</li>
              <li>③ <span style={{ color: 'var(--color-primary-light)' }}>字数控制</span> — 给出范围而非精确数字，留有弹性</li>
              <li>④ <span style={{ color: 'var(--color-primary-light)' }}>多选项输出</span> — 标题给3个备选，人工挑最好的</li>
              <li>⑤ <span style={{ color: 'var(--color-primary-light)' }}>配套要求</span> — 配图建议、发布时间一并生成</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '14px 18px', fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
            <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>✓ 人工润色要点：</span> AI生成的初稿通常逻辑清晰但缺少"温度"。编辑需要加入个人化表达、地方特色细节、情感共鸣点，让文章从"正确"变成"动人"。
          </div>
        </div>
      </div>
    </SlideLayout>
  )
}
