---
---

# 文档平台

默认认为您已经知晓 vitePress 如何使用, 即使不清楚也可以直接安装该项目进行编辑

## 安装

```shell
pnpm create hush-cli
```

选择vitepress项目模板

## 启动

拉取项目后执行如下命令

```shell
pnpm i
pnpm dev
```

## 目录结构

```shell
|-- .vitepress       # 配置目录
    |-- theme        # 样式文件
    |-- config.ts    # 主配置文件

|-- example          # vue组件示例.vue
    |-- button
    |-- dialog
    |-- ...

|-- src
    |-- components   # 组件文档
    |-- config       # 配置文档
    |-- public       # 静态资源
    |-- snippets     # 引用代码片段
    |-- index.md     # 首页

config.ts            # 精简配置文件
```

## 修改配置文件

该项目默认调整了一些配置, 将常变动的配置放在了根目录的 `config.ts` 文件中, 如果对平台样式没具体要求可只调整 `config.ts` 中的配置即可

## 添加新文章

添加新文章分为三步：新建路由，编写 md 文档，添加 vue 组件

#### 1.新建路由

进入 `config.ts` 文件下添加对应路由文件主要关注 `sidebar` 参数, 在对应路由下添加对应路由配置

#### 2.编写 md 文档

根据添加的路由在 `src/***` 下添加对应 md 文档

#### 3.引用 vue 组件

若 md 文档中需要引用 vue 组件，则在 `example` 下添加对应组件即可

在 md 文档中以如下格式引用

```shell
:::demo

button/basic     # 该行表示引用的组件，对应`example`目录下组件路径

:::
```

## 部署

执行如下命令进行打包

```shell
pnpm build

pnpm preview    # 查看打包后效果
```

## 参考

[vitePress官网](https://vitepress.vuejs.org/)
