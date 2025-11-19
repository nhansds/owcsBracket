<template>
  <section class="space-y-4">
    <h2 class="text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
      Participating Teams
    </h2>
    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
            <div
              v-else
              class="h-4 w-4 rounded-full"
              :style="{ backgroundColor: team.accent }"
            />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-white truncate">{{ team.name }}</h3>
            <p class="text-xs text-slate-400">{{ team.placement }}</p>
          </div>
        </div>
        <p class="mb-3 text-xs text-slate-500">{{ team.region }}</p>
        <div class="border-t border-white/10 pt-3">
          <p class="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
            Roster
          </p>
          <div class="flex flex-wrap gap-1">
            <span
              v-for="player in team.roster"
              :key="player.name"
              class="flex items-center gap-1 rounded-md border border-white/10 bg-white/5 px-1 py-1 text-xs font-semibold text-slate-200"
            >
              <img
                class="h-3 w-3 object-contain"
                :src="roleIcons[player.role]"
                :alt="roleLabels[player.role]"
                loading="lazy"
              />
              {{ player.name }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PlayerRole } from '~/types/bracket'
import { useBracket } from '~/composables/useBracket'

const { teams } = useBracket()

const roleIcons: Record<PlayerRole, string> = {
  tank: '/roles/16px-Tank_Header.png',
  damage: '/roles/16px-Offense_Header.png',
  support: '/roles/16px-Support_Header.png'
}

const roleLabels: Record<PlayerRole, string> = {
  tank: 'Tank role',
  damage: 'Damage role',
  support: 'Support role'
}
</script>

