import Cover from './01-Cover'
import TableOfContents from './02-TableOfContents'
import WhatIsAIDLC from './03-WhatIsAIDLC'
import AIDLCProcess from './04-AIDLCProcess'
import Principles from './05-Principles'
import CaseRequirements from './06-CaseRequirements'
import CaseArchitecture from './07-CaseArchitecture'
import CaseCodeGen from './08-CaseCodeGen'
import CaseTestDeploy from './09-CaseTestDeploy'
import CaseSecurity from './10-CaseSecurity'
import DevEfficiency from './09-DevEfficiency'
import CasePlanning from './10-CasePlanning'
import CaseActivity from './11-CaseActivity'
import CaseCopywriting from './12-CaseCopywriting'
import MediaEfficiency from './13-MediaEfficiency'
import Insights from './14-Insights'
import Suggestions from './15-Suggestions'
import Ending from './16-Ending'

export const slides = [
  { component: Cover, title: '封面' },
  { component: TableOfContents, title: '目录' },
  { component: WhatIsAIDLC, title: '什么是AIDLC' },
  { component: AIDLCProcess, title: 'AIDLC核心流程' },
  { component: Principles, title: 'AI工具使用原则' },
  { component: CaseRequirements, title: '案例1：需求分析' },
  { component: CaseArchitecture, title: '案例2：架构设计' },
  { component: CaseCodeGen, title: '案例3：代码生成' },
  { component: CaseTestDeploy, title: '案例4：测试与部署' },
  { component: CaseSecurity, title: '案例5：代码安全' },
  { component: DevEfficiency, title: '开发效率数据' },
  { component: CasePlanning, title: '案例6：内容策划' },
  { component: CaseActivity, title: '案例7：活动方案' },
  { component: CaseCopywriting, title: '案例8：文案生成' },
  { component: MediaEfficiency, title: '运营效率数据' },
  { component: Insights, title: '心得体会' },
  { component: Suggestions, title: '工作建议' },
  { component: Ending, title: '总结' },
]
