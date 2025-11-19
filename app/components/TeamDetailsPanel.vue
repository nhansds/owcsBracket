<template>
  <Transition
    enter-active-class="transition-all duration-200"
    enter-from-class="opacity-0 translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-150"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="team"
      class="space-y-4 rounded-xl border border-white/15 bg-slate-800/60 p-4 shadow-glow"
      :style="{ borderColor: team.accent + '40' }"
    >
      <div class="flex items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-slate-900/70"
        >
          <img
            v-if="team.logo"
            :src="team.logo"
            :alt="`${team.shortName} logo`"
            class="h-8 w-8 object-contain"
          />
          <div
            v-else
            class="h-4 w-4 rounded-full"
            :style="{ backgroundColor: team.accent }"
          />
        </div>
        <div class="flex-1">
          <h3 class="text-base font-semibold text-white">{{ team.name }}</h3>
          <p class="text-xs text-slate-400">{{ team.placement }}</p>
          <p class="text-xs text-slate-500">{{ team.region }}</p>
        </div>
      </div>
      <div class="border-t border-white/10 pt-3">
        <p class="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          Roster
        </p>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="player in team.roster"
            :key="player.name"
            class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-slate-200"
          >
            <img
              class="h-4 w-4 object-contain"
              :src="roleIcons[player.role]"
              :alt="roleLabels[player.role]"
              loading="lazy"
            />
            {{ player.name }}
          </span>
        </div>
      </div>
      <button
        type="button"
        class="mt-3 w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
        @click="closePanel"
      >
        Close
      </button>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { PlayerRole } from '~/types/bracket'
import { useTeamDetails } from '~/composables/useTeamDetails'

const { activeTeam, setActiveTeam } = useTeamDetails()

const team = computed(() => activeTeam.value)

const closePanel = () => {
  setActiveTeam(null)
}

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

