---
layout: home

hero:
  name: 'hushPress'
  text: '基于vitePress的文档模板'
  tagline: 基于markdown生成的文档
  actions:
    - theme: brand
      text: 快速开始
      link: /config/edit
  image:
    src: /logo.svg
    alt: hushPress

features:
  - title: 专注内容
    icon: 📝
    details: 只需 Markdown 即可轻松创建美观的文档站点
  - title: 使用 Vue 自定义
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="30" viewBox="0 0 256 220.8"><path fill="#41B883" d="M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"/><path fill="#41B883" d="m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"/><path fill="#35495E" d="M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"/></svg>
    details: 直接在 Markdown 中使用 Vue 语法和组件，或者使用 Vue 组件构建自定义主题。
  - title: 速度真的很快
    icon: 🚀
    details: 采用静态 HTML 实现快速的页面初次加载，使用客户端路由实现快速的页面切换导航
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #bd34fe 30%, #41d1ff);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
  --vp-home-hero-image-filter: blur(44px);
}

.VPImage.image-src {
  width: 100%;
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
