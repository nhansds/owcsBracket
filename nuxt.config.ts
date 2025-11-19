// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  app: {
    baseURL: '/owcsBracket/',
    buildAssetsDir: '/_nuxt/',
    head: {
      titleTemplate: '%s · OWCS Bracket Builder',
      title: 'OWCS 2025 World Finals Bracket',
      meta: [
        {
          name: 'description',
          content:
            'Construisez et partagez votre propre pronostic pour le bracket OWCS 2025 World Finals.'
        },
        { property: 'og:type', content: 'website' },
        {
          property: 'og:title',
          content: 'OWCS 2025 World Finals Bracket Builder'
        },
        {
          property: 'og:description',
          content:
            'Choisissez vos vainqueurs et partagez via un lien.'
        },
        { name: 'theme-color', content: '#111320' }
      ],
      link: [
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
  }
})
