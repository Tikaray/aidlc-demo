# Application Design — AIDLC演示产品

## 架构概述

纯前端React SPA应用，采用幻灯片引擎模式。无后端服务，所有内容以组件形式内嵌。

```
aidlc-demo/
├── public/
│   └── images/              # 演示用图片资源
├── src/
│   ├── components/
│   │   ├── SlideEngine/     # 幻灯片引擎核心
│   │   │   ├── SlideEngine.jsx
│   │   │   ├── SlideEngine.css
│   │   │   ├── Navigation.jsx
│   │   │   └── ProgressBar.jsx
│   │   ├── ContentBlocks/   # 内容展示组件
│   │   │   ├── CodeBlock.jsx
│   │   │   ├── ComparisonBlock.jsx
│   │   │   ├── ChartBlock.jsx
│   │   │   └── FlowChart.jsx
│   │   └── Layout/          # 布局组件
│   │       ├── SlideLayout.jsx
│   │       └── TitleSlide.jsx
│   ├── slides/              # 各页幻灯片内容
│   │   ├── 01-Cover.jsx
│   │   ├── 02-TableOfContents.jsx
│   │   ├── 03-WhatIsAIDLC.jsx
│   │   ├── ...
│   │   └── index.js         # 幻灯片注册表
│   ├── data/                # 静态数据（案例内容、图表数据）
│   │   └── slideData.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

## 核心设计决策

| 决策项 | 选择 | 理由 |
|--------|------|------|
| 幻灯片引擎 | 自定义React组件 | 轻量、完全可控、无额外依赖 |
| 状态管理 | React useState/useCallback | 状态简单（当前页码），无需Context |
| 样式方案 | CSS文件 + CSS变量 | 简单直接，主题统一 |
| 代码高亮 | Prism.js / 手动CSS | 轻量级语法高亮 |
| 图表 | 纯CSS图表 | 避免引入重型图表库，数据量小 |
| 动画 | CSS Transitions + keyframes | 原生性能好，无需动画库 |
| 构建工具 | Vite | 快速开发体验 |

## 组件职责

### SlideEngine（幻灯片引擎）
- 管理当前幻灯片索引
- 监听键盘事件（←→箭头）
- 渲染当前幻灯片组件
- 提供切换动画

### Navigation（导航栏）
- 显示前进/后退按钮
- 显示页码（当前/总数）
- 目录跳转功能

### ProgressBar（进度条）
- 底部进度指示器

### ContentBlocks（内容组件）
- CodeBlock: 代码展示（语法高亮 + 行号）
- ComparisonBlock: Before/After对比（左右分栏）
- ChartBlock: 数据图表（CSS柱状图/饼图）
- FlowChart: 流程图（CSS flex布局）

### SlideLayout（幻灯片布局）
- 标准内容页布局（标题 + 内容区）
- TitleSlide: 封面/章节标题页布局
