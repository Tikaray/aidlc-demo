import Cover from './01-Cover'
import TableOfContents from './02-TableOfContents'
import WhatIsAIDLC from './03-WhatIsAIDLC'
import AIDLCProcess from './04-AIDLCProcess'
import Principles from './05-Principles'
import CaseCrawlerOverview from './CaseCrawlerOverview'
import CaseCrawlerSelfHeal from './CaseCrawlerSelfHeal'
import CaseRequirements from './06-CaseRequirements'
import CaseArchitecture from './07-CaseArchitecture'
import CaseCodeGen from './08-CaseCodeGen'
import CaseTestDeploy from './09-CaseTestDeploy'
import CaseSecurity from './10-CaseSecurity'
import CaseCrawlerAIDLC from './CaseCrawlerAIDLC'
import CaseCrawlerCompare from './CaseCrawlerCompare'
import DevEfficiency from './09-DevEfficiency'
import Insights from './14-Insights'
import Suggestions from './15-Suggestions'
import Ending from './16-Ending'

export const slides = [
  { component: Cover, title: '封面' },
  { component: TableOfContents, title: '目录' },
  { component: WhatIsAIDLC, title: '什么是AIDLC' },
  { component: AIDLCProcess, title: 'AIDLC核心流程' },
  { component: Principles, title: 'AI工具使用原则' },
  { component: CaseCrawlerOverview, title: '项目概览：自修复爬虫' },
  { component: CaseCrawlerSelfHeal, title: '核心亮点：自修复机制' },
  { component: CaseRequirements, title: 'Step 1：需求分析' },
  { component: CaseArchitecture, title: 'Step 2：架构设计' },
  { component: CaseCodeGen, title: 'Step 3：代码生成' },
  { component: CaseTestDeploy, title: 'Step 4：测试与部署' },
  { component: CaseSecurity, title: 'Step 5：代码安全' },
  { component: CaseCrawlerAIDLC, title: 'AIDLC全流程回顾' },
  { component: CaseCrawlerCompare, title: '两个爬虫项目对比' },
  { component: DevEfficiency, title: '效率提升数据' },
  { component: Insights, title: '心得体会' },
  { component: Suggestions, title: '工作建议' },
  { component: Ending, title: '总结' },
]
