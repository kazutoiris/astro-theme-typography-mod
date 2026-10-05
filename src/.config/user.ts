import type { UserConfig } from '~/types'

export const userConfig: Partial<UserConfig> = {
  // Override the default config here
  // site: { title: "講評世界" },
  // seo: { twitter: "@moeyua13" },

  site: {
    title: '瞳の笔记',
    subtitle: "Hitomi's Note",
    author: 'Kazuto Iris',
    description: 'Set Sail Anew',
    website: 'https://hitomi.us.kg/',
    pageSize: 10,
    socialLinks: [
      {
        name: 'github',
        href: 'https://github.com/kazutoiris',
      },
      {
        name: 'rss',
        href: '/atom.xml',
      },
      {
        name: 'mastodon',
        href: 'https://nya.one/@hitomi',
      },
      {
        name: 'mail',
        href: 'mailto:hitomi@apache.org',
      },
    ],
    navLinks: [
      {
        name: 'Posts',
        href: '/',
      },
      {
        name: 'Archive',
        href: '/archive',
      },
      {
        name: 'Categories',
        href: '/categories',
      },
      {
        name: 'About',
        href: '/about',
      },
    ],
    categoryMap: [],
  },
  appearance: {
    theme: 'system',
    locale: 'zh-cn',
    colorsLight: {
      primary: '#2e405b',
      background: '#ffffff',
    },
    colorsDark: {
      primary: '#FFFFFF',
      background: '#232222',
    },
    fonts: {
      header: 'sans-serif',
      ui: 'sans-serif',
    },
  },
  seo: {
    twitter: '',
    meta: [],
    link: [],
  },
  comment: {
    giscus: {
      repo: 'kazutoiris/astro-theme-typography-mod',
      repoId: 'R_kgDOU6IzuQ',
      category: 'Announcements',
      categoryId: 'DIC_kwDOU6Izuc4DG88m',
      mapping: 'pathname',
      strict: '0',
      reactionsEnabled: '1',
      emitMetadata: '1',
      inputPosition: 'top',
      theme: 'preferred_color_scheme',
      lang: 'zh-CN',
      loading: 'lazy',
    }
  },
  analytics: {
    googleAnalyticsId: 'G-CYESM22BFR',
    umamiAnalyticsId: '3f54ee76-c3a1-4ffa-9a7d-89a528fb8420',
  },
  latex: {
    katex: true,
  },
}
