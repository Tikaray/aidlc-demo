import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'

const promptText = `Prompt：
"为非遗文化公众号策划一个线上活动，要求：
 - 目标：涨粉2000+，互动率提升50%
 - 时长：1周
 - 预算：5000元以内
 - 主题：非遗手工技艺体验
 - 需要完整的执行方案"`

const activityOutput = `AI生成的完整活动方案：

📌 活动名称：「指尖上的非遗」线上体验周
📅 活动时间：2026年4月14日-20日
🎯 活动目标：公众号涨粉2000+，互动率提升50%
💰 预算：4800元

═══════════════════════════════════════════

📋 活动架构

  Day1-2  预热期
  ├── 悬念海报3张（"猜猜这是什么非遗技艺？"）
  ├── 倒计时推文，介绍活动规则
  └── 朋友圈转发集赞领非遗书签

  Day3-5  高潮期
  ├── Day3：剪纸艺术直播教学（邀请传承人连线）
  ├── Day4：面塑制作短视频挑战赛
  ├── Day5：刺绣图案设计投票
  └── 每日互动话题 + 抽奖

  Day6    互动日
  ├── 用户作品征集（晒出你的非遗手工）
  ├── 投票评选最佳作品TOP10
  └── 社群UGC内容二次传播

  Day7    收官
  ├── 获奖名单公布 + 颁奖推文
  ├── 活动数据回顾长图
  └── 预告下期活动，留住新粉

═══════════════════════════════════════════

📝 配套内容清单

  推文 × 7篇
  ├── Day1：《指尖上的非遗，等你来体验》预热文
  ├── Day2：《活动攻略：7天玩转非遗手工》规则文
  ├── Day3：《剪纸大师直播预告》引流文
  ├── Day4：《面塑挑战赛开始！》互动文
  ├── Day5：《你pick哪个刺绣图案？》投票文
  ├── Day6：《晒出你的非遗作品》征集文
  └── Day7：《活动回顾：这一周我们一起...》收官文

  短视频脚本 × 3条
  ├── 30秒剪纸技艺展示（竖版，适合抖音/视频号）
  ├── 60秒面塑制作过程（加速+配乐）
  └── 15秒活动花絮混剪（用户作品合集）

  互动话题 × 5个
  ├── #指尖上的非遗#（主话题）
  ├── #我的第一次非遗体验#
  ├── #猜猜这是什么技艺#
  ├── #非遗手工挑战#
  └── #最美非遗作品#

═══════════════════════════════════════════

💰 预算明细

  传承人连线费用      1500元
  奖品（非遗文创）    2000元
  海报设计            500元
  抽奖礼品            500元
  应急备用            300元
  ─────────────────────────
  合计                4800元（预算内）`

export default function CaseActivity() {
  return (
    <SlideLayout tag="新媒体运营" title="案例5：AI辅助活动方案" subtitle="给出目标和约束，AI生成从预热到收官的完整执行方案">
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <CodeBlock title="输入的Prompt" code={promptText} />
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '🎯', title: '精准定位', desc: '基于目标受众和平台特性，活动形式匹配公众号生态' },
              { icon: '📐', title: '结构完整', desc: '预热→高潮→互动→收官，每天都有明确任务和内容' },
              { icon: '📝', title: '内容配套', desc: '7篇推文+3条视频脚本+5个话题，全部一次生成' },
              { icon: '💰', title: '预算可控', desc: '逐项列出费用明细，4800元控制在5000预算内' },
            ].map((item, i) => (
              <div key={i} className="stagger-item glow-card" style={{ animationDelay: `${0.3 + i * 0.08}s`, background: 'var(--color-surface)', borderRadius: 10, padding: '12px 16px', border: '1px solid var(--color-border)', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <CodeBlock title="AI生成的完整活动方案" code={activityOutput} />
        </div>
      </div>
    </SlideLayout>
  )
}
