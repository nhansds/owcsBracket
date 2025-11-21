<template>
  <section class="space-y-4">
    <Collapsible :default-open="false">
      <template #trigger="{ isOpen, toggle }">
        <button
          class="flex w-full items-center justify-between rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-left text-xl font-semibold uppercase tracking-[0.3em] text-white/80 transition hover:bg-white/10"
          type="button"
          @click="toggle"
        >
          <span>{{ t('teams.participating') }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            class="h-5 w-5"
            :class="{ 'rotate-180': isOpen }"
            :style="{
              transition: 'transform 600ms cubic-bezier(0.19, 1, 0.22, 1)'
            }"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </template>

      <template #content>
        <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div
            v-for="team in teams"
            :key="team.id"
            class="group rounded-xl border border-white/15 bg-slate-900/70 p-4 transition hover:border-primary/50 hover:bg-slate-900/90"
          >
            <div class="mb-3 flex items-center gap-3">
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-950/70"
              >
                <img
                  v-if="team.logo"
                  :src="team.logo"
                  :alt="`${team.shortName} logo`"
                  class="h-8 w-8 object-contain"
                  loading="lazy"
                />
                <div v-else class="h-4 w-4 rounded-full" :style="{ backgroundColor: team.accent }" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-sm font-semibold text-white truncate">{{ team.name }}</h3>
                <p class="text-xs text-slate-400">{{ team.placement }}</p>
              </div>
            </div>
            <p class="mb-3 text-xs text-slate-500">{{ team.region }}</p>
            <div class="border-t border-white/10 pt-3">
              <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {{ t('teams.rosterHeading') }}
              </p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="player in team.roster"
                  :key="player.name"
                  class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                >
                  <img
                    class="h-4 w-4 object-contain"
                    :src="roleIcons[player.role]"
                    :alt="roleLabels[player.role]"
                    loading="lazy"
                  />
                  <span>{{ countryFlags[player.country] || '' }}</span>
                  {{ player.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </Collapsible>
  </section>
</template>

<script setup lang="ts">
import type { PlayerRole } from '~/types/bracket'
import { useBracket } from '~/composables/useBracket'
import Collapsible from '../components/Collapsible.vue'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { teams } = useBracket()
const { t } = useI18n()

const roleIcons: Record<PlayerRole, string> = {
  tank: 'roles/16px-Tank_Header.png',
  damage: 'roles/16px-Offense_Header.png',
  support: 'roles/16px-Support_Header.png'
}

const roleLabels = computed<Record<PlayerRole, string>>(() => ({
  tank: t('teams.roles.tank'),
  damage: t('teams.roles.damage'),
  support: t('teams.roles.support')
}))

const countryFlags: Record<string, string> = {
  'South Korea': '🇰🇷',
  'China': '🇨🇳',
  'United States': '🇺🇸',
  'Saudi Arabia': '🇸🇦',
  'Japan': '🇯🇵',
  'France': '🇫🇷',
  'Sweden': '🇸🇪',
  'Australia': '🇦🇺',
  'Austria': '🇦🇹',
  'Denmark': '🇩🇰',
  'Estonia': '🇪🇪',
  'Turkey': '🇹🇷',
  'Ukraine': '🇺🇦',
  'United Kingdom': '🇬🇧',
  'Wales': '🏴󠁧󠁢󠁷󠁬󠁳󠁿'
}
</script>

