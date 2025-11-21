<template>
  <div class="min-h-screen gradient-surface text-slate-100">
    <NuxtLoadingIndicator color="#ff5470" />
    <NuxtRouteAnnouncer />
    <main class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header class="space-y-6 text-center sm:text-left">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 space-y-6">
            <p class="text-xs tracking-[0.35em] uppercase text-secondary-300">
              {{ t('app.hero.overline') }}
            </p>
            <div>
              <h1 class="text-4xl font-semibold sm:text-5xl">
                {{ t('app.hero.title') }}
              </h1>
              <p class="mt-3 text-base text-slate-300">
                {{ t('app.hero.subtitle') }}
              </p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <NuxtPage />

      <footer
        class="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300 shadow-inner shadow-black/20 sm:flex-row sm:items-center sm:justify-between"
      >
        <span class="font-medium text-white">{{ t('app.footer.signature') }}</span>
        <div class="flex items-center gap-3 font-medium text-white">
          <img
            src="/teams/41px-Team_Peps_July_2022_allmode.png"
            :alt="t('app.footer.teamLogoAlt')"
            class="h-8 w-8 rounded-lg border border-white/10 bg-white/10 object-contain p-1"
          />
          <span class="flex items-center gap-2">
            {{ t('app.footer.teamCTA') }}
            <img
              src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg"
              :alt="t('app.footer.flagAlt')"
              class="h-4 w-6 rounded-sm border border-white/20 object-cover"
              loading="lazy"
            />
          </span>
        </div>
        <div class="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <a
            href="https://github.com/nhansds"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            {{ t('app.footer.links.github') }}
          </a>
          <a
            href="https://gitlab.com/nhansds"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            {{ t('app.footer.links.gitlab') }}
          </a>
          <a
            href="https://nhans.fr/"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            {{ t('app.footer.links.site') }}
          </a>
        </div>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '~/components/LanguageSwitcher.vue'

const { t } = useI18n()
</script>
