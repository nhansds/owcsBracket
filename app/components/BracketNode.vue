<template>
  <div :class="nodeClasses">
    <header class="mb-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
      <span class="truncate">{{ match.roundLabel }}</span>
      <span class="font-semibold text-secondary-200">{{ match.bestOf }}</span>
    </header>

    <div class="space-y-2">
      <button
        v-for="(team, index) in match.participants"
        :key="index"
        type="button"
        class="flex w-full items-center gap-2 rounded-xl border border-white/15 bg-white/0 px-3 py-2 text-left transition"
        :class="rowClasses(index, team)"
        @click="() => selectWinner(index)"
      >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/70"
          >
            <img
              v-if="team?.logo"
              :src="team.logo"
              :alt="`${team?.shortName ?? 'Team'} logo`"
              class="h-6 w-6 object-contain"
              loading="lazy"
            />
            <div
              v-else
              class="h-2 w-2 rounded-full"
              :style="{ backgroundColor: team?.accent ?? '#4b5563' }"
            />
          </div>
          <div class="flex flex-1 flex-col">
            <span class="text-sm font-semibold text-white">
              {{ team?.name ?? 'To be decided' }}
            </span>
            <span class="text-[11px] text-slate-400">
              {{ team ? team.region : 'Pending' }}
            </span>
          </div>
          <input
            type="number"
            min="0"
            :max="match.targetScore"
            step="1"
            :disabled="!team"
            :value="scoreValue(index)"
            class="h-10 w-16 rounded-lg border border-white/15 bg-slate-950/60 text-center text-base font-semibold text-white focus:border-primary focus:outline-none disabled:opacity-40"
            @input="event => updateScore(index, (event.target as HTMLInputElement).value)"
            @click.stop
            @mousedown.stop
          />
      </button>
    </div>

    <footer class="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
      <div class="flex items-center gap-2">
        <span class="text-white/70">Winner</span>
        <span class="text-secondary-200">{{ match.winner?.name ?? '—' }}</span>
      </div>
      <button
        v-if="match.result.winnerSlot !== null || match.result.score.some(value => value !== null)"
        type="button"
        class="text-[10px] font-semibold tracking-[0.3em] text-slate-500 hover:text-white"
        @click="clearMatch"
      >
        Reset
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { HydratedMatch } from '~/types/bracket'

const props = defineProps<{
  match: HydratedMatch
  variant?: 'standard' | 'final'
}>()

const { setMatchResult, clearMatchResult } = useBracket()

const variantClass = computed(() =>
  props.variant === 'final'
    ? 'border-secondary/60 bg-secondary/15 shadow-[0_0_35px_rgba(250,204,21,0.2)]'
    : 'border-white/15 bg-slate-900/70'
)

const nodeClasses = computed(() => [
  'rounded-2xl p-4 shadow-glow backdrop-blur',
  variantClass.value
])

const rowClasses = (index: number, team: HydratedMatch['participants'][number]) => {
  const isWinner = props.match.result.winnerSlot === index
  return [
    team ? 'cursor-pointer hover:border-primary/70 hover:bg-primary/5' : 'cursor-not-allowed opacity-40',
    isWinner ? 'border-primary/70 bg-primary/5' : 'border-white/20'
  ]
}

const scoreValue = (index: number) => props.match.result.score[index] ?? ''

const updateScore = (index: number, rawValue: string) => {
  const parsed =
    rawValue === ''
      ? null
      : Math.max(0, Math.min(props.match.targetScore, Number(rawValue)))
  const nextScore = [...props.match.result.score] as [number | null, number | null]
  nextScore[index] = parsed
  
  // If the score reaches the target score, automatically set as winner
  if (parsed !== null && parsed === props.match.targetScore) {
    const opponentIndex = index === 0 ? 1 : 0
    if (
      nextScore[opponentIndex] !== null &&
      Number(nextScore[opponentIndex]) >= props.match.targetScore
    ) {
      nextScore[opponentIndex] = Math.max(props.match.targetScore - 1, 0)
    }
    setMatchResult(props.match.id, {
      winnerSlot: index as 0 | 1,
      score: nextScore
    })
  } else {
    setMatchResult(props.match.id, { score: nextScore })
  }
}

const selectWinner = (index: number) => {
  const team = props.match.participants[index]
  if (!team) return
  const opponentIndex = index === 0 ? 1 : 0
  const nextScore = [...props.match.result.score] as [number | null, number | null]
  nextScore[index] = props.match.targetScore
  if (
    nextScore[opponentIndex] !== null &&
    Number(nextScore[opponentIndex]) >= props.match.targetScore
  ) {
    nextScore[opponentIndex] = Math.max(props.match.targetScore - 1, 0)
  }
  setMatchResult(props.match.id, {
    winnerSlot: index as 0 | 1,
    score: nextScore
  })
}

const clearMatch = () => {
  clearMatchResult(props.match.id)
}
</script>


