import React from 'react'
import SlideLayout from '../components/Layout/SlideLayout'
import ComparisonBlock from '../components/ContentBlocks/ComparisonBlock'

export default function WhatIsAIDLC() {
  return (
    <SlideLayout
      tag="方法论"
      title="什么是AIDLC"
      subtitle="AI-Driven Development Life Cycle — AI驱动的开发生命周期"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <div className="stagger-item" style={{ animationDelay: '0.1s', fontSize: 18, color: 'var(--color-text-secondary)', lineHeight: 1.8, maxWidth: 900 }}>
          AIDLC 是一种将AI深度融入软件开发全生命周期的方法论。它不是简单地用AI写代码，
          而是让AI参与从需求分析、架构设计到代码生成、测试验证的每一个环节，
          实现<span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>人机协作</span>的高效开发模式。
        </div>
        <ComparisonBlock
          beforeTitle="传统开发"
          afterTitle="AIDLC开发"
          before={
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>📝 手动编写需求文档</li>
              <li>🎨 人工设计系统架构</li>
              <li>⌨️ 逐行编写代码</li>
              <li>🐛 手动排查Bug</li>
              <li>⏱️ 周期长、迭代慢</li>
            </ul>
          }
          after={
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
              <li>🤖 AI辅助需求分析与验证</li>
              <li>🏗️ AI生成架构方案供评审</li>
              <li>⚡ AI批量生成代码框架</li>
              <li>🔍 AI辅助代码审查与修复</li>
              <li>🚀 快速迭代、持续优化</li>
            </ul>
          }
        />
      </div>
    </SlideLayout>
  )
}
