// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/i18n'],
  app: {
    baseURL: '/owcsBracket/',
    buildAssetsDir: '/_nuxt/',
    head: {
      titleTemplate: '%s · OWCS Bracket Builder',
      title: 'OWCS 2025 World Finals Bracket',
      meta: [
        {
          name: 'description',
          content: 'Build and share your OWCS 2025 World Finals bracket predictions.'
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'OWCS 2025 World Finals Bracket Builder'
        },
        {
          property: 'og:description',
          content:
            'Pick your winners, set their scores, and share the bracket with a single link.'
        },
        { name: 'theme-color', content: '#111320' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: ''
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap'
        }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  nitro: {
    preset: 'github-pages'
  },
  routeRules: {
    '/**': { prerender: true }
  },
  i18n: {
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    defaultLocale: 'en',
    langDir: 'locales',
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.json', name: 'English' },
      { code: 'fr', iso: 'fr-FR', file: 'fr-FR.json', name: 'Français' },
      { code: 'ko', iso: 'ko-KR', file: 'ko-KR.json', name: '한국어' }
    ],
    vueI18n: './i18n.config.ts'
  }
})
