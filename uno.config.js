import presetAttributify from '@unocss/preset-attributify'
import transformerDirectives from '@unocss/transformer-directives'
import {
  defineConfig,
  presetIcons,
  presetTypography,
  presetWind3,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { themeConfig } from './src/.config'

const { colorsDark, colorsLight, fonts } = themeConfig.appearance

const cssExtend = {
  ':root': {
    '--prose-borders': '#eee',
  },

  'a': {
    'text-decoration-style': 'wavy',
    'text-underline-offset': '1px',
    'text-decoration-skip-ink': 'none',
  },

  'code::before': {
    content: 'none',
  },

  'code::after': {
    content: 'none',
  },

  ':where(h1, h2, h3, h4, h5, h6)::before': {
    'content': '"#"',
    'position': 'absolute',
    'left': '-1.2em',
    'opacity': '0',
    'transition': 'opacity 0.2s ease',
  },

  ':where(h1, h2, h3, h4, h5, h6):hover::before': {
    'opacity': '0.5',
  },

  'code': {
    'background-color': 'transparent',
    'display': 'inline-block',
    'border': '1px dashed var(--un-prose-code)',
    'border-radius': '5px',
    'padding': '0.1rem 0.2rem',
    'margin': '0 0.2rem',
  },

  'pre': {
    'border': '1px dashed var(--un-prose-code)',
    'border-radius': '5px',
  },

  'li': {
    'white-space': 'normal',
    'word-wrap': 'break-word',
  },

  'html.dark .astro-code, html.dark .astro-code span': {
    'color': 'var(--shiki-dark) !important',
    'background-color': 'var(--shiki-dark-bg) !important',
    'font-style': 'var(--shiki-dark-font-style) !important',
    'font-weight': 'var(--shiki-dark-font-weight) !important',
    'text-decoration': 'var(--shiki-dark-text-decoration) !important',
  }
}

const colorScheme = {
  "bullets": [colorsLight.primary, colorsDark.primary],
  "counters": [colorsLight.primary, colorsDark.primary],
  "code": [colorsLight.primary, colorsDark.primary],
}

export default defineConfig({
  rules: [
    [
      /^row-(\d+)-(\d)$/,
      ([, start, end]) => ({ 'grid-row': `${start}/${end}` }),
    ],
    [
      /^col-(\d+)-(\d)$/,
      ([, start, end]) => ({ 'grid-column': `${start}/${end}` }),
    ],
    [
      /^scrollbar-hide$/,
      ([_]) => `.scrollbar-hide { scrollbar-width:none;-ms-overflow-style: none; }
      .scrollbar-hide::-webkit-scrollbar {display:none;}`,
    ],
  ],
  presets: [
    presetWind3(),
    presetTypography({ cssExtend, colorScheme }),
    presetAttributify(),
    presetIcons({ scale: 1.2, warn: true }),
    presetTheme({
      theme: {
        dark: {
          colors: { ...colorsDark, shadow: '#FFFFFF0A' },
          // TODO 需要配置代码块颜色
        },
      },
    }),
  ],
  theme: {
    colors: { ...colorsLight, shadow: '#0000000A' },
    fontFamily: fonts,
  },
  shortcuts: [
    ['post-title', 'text-5 font-bold lh-7.5 m-0'],
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    ...themeConfig.site.socialLinks.map(social => `i-mdi-${social.name}`),
    'i-mdi-content-copy',
    'i-mdi-check',
  ],
})
