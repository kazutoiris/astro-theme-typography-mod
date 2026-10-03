import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import swup from '@swup/astro'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { themeConfig } from './src/.config'
import compress from '@playform/compress';

// https://astro.build/config
export default defineConfig({
  site: themeConfig.site.website,
  prefetch: true,
  base: '/',
  vite: {
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              entryFileNames: 'js/[hash:8].js',
              chunkFileNames: 'js/chunks/[hash:8].js',
              assetFileNames: 'asset/[hash:8][extname]',
              hashCharacters: 'hex',
            },
          },
        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          entryFileNames: 'js/[hash:8].js',
          chunkFileNames: 'js/chunks/[hash:8].js',
          assetFileNames: 'asset/[hash:8][extname]',
          hashCharacters: 'hex',
        },
      },
    },
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      wrap: true,
    },
  },
  integrations: [
    UnoCSS({ injectReset: true }),
    mdx({}),
    robotsTxt(),
    sitemap(),
    compress(),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      cache: true,
      preload: true,
      accessibility: true,
      smoothScrolling: true,
      updateHead: true,
      updateBodyClass: true,
      containers: ['#toc-container', "main"],
    }),
  ],
})
