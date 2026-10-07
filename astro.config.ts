import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import swup from '@swup/astro'
import robotsTxt from 'astro-robots-txt'
import { defineConfig } from 'astro/config'
import UnoCSS from 'unocss/astro'
import { themeConfig } from './src/.config'
import compress from '@playform/compress';
import indexnow from 'astro-indexnow';
import cloudflare from '@astrojs/cloudflare';
import { satteri } from '@astrojs/markdown-satteri';
import { katex as satteriKatex } from '@nullpinter/satteri-katex';
import { defineHastPlugin } from 'satteri';

const externalLinks = defineHastPlugin({
  name: "external-links",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties.href;
      if (typeof href === "string" && href.startsWith("http")) {
        ctx.setProperty(node, "target", "_blank");
        ctx.setProperty(node, "rel", "noopener noreferrer");
      }
    },
  },
});

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
              chunkFileNames: 'js/[hash:8].js',
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
          chunkFileNames: 'js/[hash:8].js',
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
    processor: satteri({
      features: {
        math: true,
      },
      mdastPlugins: [satteriKatex()],
      hastPlugins: [externalLinks]
    }),
  },

  integrations: [
    UnoCSS({ injectReset: true }),
    mdx({}),
    robotsTxt(),
    sitemap({ lastmod: new Date() }),
    indexnow({
      key: process.env.INDEXNOW_KEY,
      // dryRun: true,
      submissionMode: "all",
    }),
    compress(),
    swup({
      theme: false,
      animationClass: 'transition-swup-',
      cache: true,
      preload: true,
      accessibility: true,
      smoothScrolling: true,
      updateHead: false,
      updateBodyClass: false,
      containers: ['#toc-container', "main"],
    }),
  ],

  adapter: cloudflare(),
})
