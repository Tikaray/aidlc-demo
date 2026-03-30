import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import CodeBlock from '../components/ContentBlocks/CodeBlock'
import useMobile from '../hooks/useMobile'

const flowText = `自修复核心流程：

  ┌─────────────┐
  │ 触发爬取     │  ← 手动点击 / 定时60秒
  └──────┬──────┘
         ▼
  ┌─────────────┐     ┌──────────────────────┐
  │ 有缓存代码？ │──否→│ 获取页面HTML          │
  └──────┬──────┘     │ + 调用LLM生成爬虫代码 │
         │是          └──────────┬───────────┘
         ▼                       ▼
  ┌─────────────────────────────────┐
  │ 执行爬虫代码 (5秒超时)           │
  └──────┬──────────────┬───────────┘
         │成功           │失败/数据异常
         ▼               ▼
  ┌──────────┐    ┌─────────────────────┐
  │ 存储数据  │    │ 🔧 自修复模式        │
  │ 状态=成功 │    │                     │
  └──────────┘    │ 1. 重新获取页面HTML  │
                  │ 2. 发送给LLM:        │
                  │    - 新HTML          │
                  │    - 旧代码          │
                  │    - 错误信息        │
                  │ 3. LLM生成新代码     │
                  │ 4. 执行并验证        │
                  └──────┬──────────────┘
                         │
                    ┌────┴────┐
                    │成功     │失败
                    ▼         ▼
              ┌─────────┐ ┌──────────┐
              │更新代码   │ │标记失败   │
              │状态=成功  │ │等待下次   │
              │日志:修复✓│ │触发重试   │
              └─────────┘ └──────────┘`

const promptText = `LLM收到的修复提示词：

系统提示:
  "你是一个Python爬虫代码修复专家。
   之前的爬虫代码因为页面结构变化而失败了。"

用户提示:
  "目标: 爬取新闻标题、摘要和日期

   之前失败的代码:
   def extract_news(html):
       soup = BeautifulSoup(html, 'html.parser')
       items = soup.select('ul.news-list li.news-entry')
       ...  ← 旧选择器已失效

   错误信息:
   结果为空，未提取到任何新闻

   新的页面HTML:
   <section id='main-content'>
     <div class='card-grid'>
       <article class='card-item'>
         ...  ← 结构已从列表变为卡片
       </article>
     </div>
   </section>"

LLM输出新代码:
  def extract_news(html):
      soup = BeautifulSoup(html, 'html.parser')
      cards = soup.select('article.card-item')
      ...  ← 自动适配新结构`

export default function CaseCrawlerSelfHeal() {
  const m = useMobile()
  return (
    <SlideLayout tag="AIDLC实战 · 自修复爬虫" title="核心亮点：自修复机制" subtitle="页面结构变了？爬虫自己修自己">
      <div style={{ display: 'flex', flexDirection: m ? 'column' : 'row', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <CodeBlock title="自修复流程图" code={flowText} />
        </div>
        <div style={{ flex: 1 }}>
          <CodeBlock title="LLM修复提示词示例" code={promptText} />
        </div>
      </div>
    </SlideLayout>
  )
}
