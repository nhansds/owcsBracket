<template>
  <div
    class="rounded-2xl border border-stroke/60 bg-panel/70 p-4 shadow-glow backdrop-blur"
  >
    <div class="mb-3 flex items-center justify-between text-xs uppercase text-slate-400">
      <span>{{ match.roundLabel }}</span>
      <span class="text-[11px] tracking-wide text-secondary-200">
        {{ match.bestOf }}
      </span>
    </div>

    <div class="space-y-3">
      <button
        v-for="(team, index) in match.participants"
        :key="index"
        type="button"
        class="flex w-full items-center gap-3 rounded-xl px-3 py-2 transition"
        :class="rowClasses(index, team)"
        @click="() => selectWinner(index)"
      >
        <div
          class="h-2 w-2 rounded-full"
          :style="{ backgroundColor: team?.accent ?? '#4b5563' }"
        />
        <div class="flex flex-1 flex-col text-left">
          <span class="text-sm font-medium">
            {{ team?.name ?? 'À déterminer' }}
          </span>
          <span class="text-[11px] text-slate-400">
            {{ team ? `${team.region}` : 'À confirmer' }}
          </span>
        </div>
        <input
          type="number"
          min="0"
          max="4"
          step="1"
          :disabled="!team"
          :value="scoreValue(index)"
          class="h-10 w-12 rounded-lg border border-stroke bg-transparent text-center text-base font-semibold text-white focus:border-primary focus:outline-none disabled:opacity-40"
          @input="event => updateScore(index, (event.target as HTMLInputElement).value)"
        />
      </button>
    </div>

    <div class="mt-4 flex items-center justify-between text-xs text-slate-400">
      <div class="flex items-center gap-1">
        <span v-if="match.winner" class="text-primary">Vainqueur:</span>
        <span>{{ match.winner?.name ?? 'En attente' }}</span>
      </div>
      <button
        v-if="match.result.winnerSlot !== null || match.result.score.some(value => value !== null)"
        class="text-[11px] uppercase tracking-wide text-slate-500 hover:text-slate-200"
        type="button"
        @click="clearMatch"
      >
        Réinitialiser
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HydratedMatch } from '~/types/bracket'

const props = defineProps<{
  match: HydratedMatch
}>()

const { setMatchResult, clearMatchResult } = useBracket()

const rowClasses = (index: number, team: HydratedMatch['participants'][number]) => {
  const isWinner = props.match.result.winnerSlot === index
  return [
    'border border-stroke',
    team ? 'cursor-pointer hover:border-primary/80' : 'opacity-50 cursor-not-allowed',
    isWinner ? 'border-primary/80 bg-primary/5' : ''
  ]
}

const scoreValue = (index: number) => props.match.result.score[index] ?? ''

const updateScore = (index: number, rawValue: string) => {
  const parsed = rawValue === '' ? null : Number(rawValue)
  const nextScore = [...props.match.result.score] as [number | null, number | null]
  nextScore[index] = parsed
  setMatchResult(props.match.id, { score: nextScore })
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

