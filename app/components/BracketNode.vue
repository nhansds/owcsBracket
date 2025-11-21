<template>
  <div :class="nodeClasses">
    <header class="mb-3 text-[11px] uppercase tracking-[0.2em] text-slate-400">
      <div class="flex items-center justify-between gap-3">
        <span class="truncate">{{ t(match.roundLabelKey) }}</span>
        <span class="font-semibold text-secondary-200">
          {{ match.matchNumber ? `${match.matchNumber} | ${match.bestOf}` : match.bestOf }}
        </span>
      </div>
      <p
        v-if="match.scheduleLabelKey"
        class="mt-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/70"
      >
        {{ t(match.scheduleLabelKey) }}
      </p>
    </header>

    <div class="space-y-2">
      <button
        v-for="(team, index) in match.participants"
        :key="index"
        type="button"
        :disabled="isLocked || !team || !allParticipantsReady"
        :class="[
          'flex w-full items-center gap-2 rounded-xl border border-white/15 bg-white/0 px-3 py-2 text-left transition',
          ...rowClasses(index, team),
          isLocked && team && allParticipantsReady ? 'disabled:opacity-100 disabled:cursor-default' : 'disabled:cursor-not-allowed disabled:opacity-40'
        ]"
        @click="() => selectWinner(index)"
      >
          <div
            class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-slate-900/70"
          >
            <img
              v-if="team?.logo"
              :src="team.logo"
              :alt="t('ui.team.logoAlt', { team: team?.shortName ?? t('ui.team.generic') })"
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
              {{ displayForRow(index).name }}
            </span>
            <span class="text-[11px] text-slate-400">
              {{ displayForRow(index).region }}
            </span>
          </div>
          <input
            type="number"
            min="0"
            :max="match.targetScore"
            step="1"
            :disabled="!team || isLocked"
            :value="scoreValue(index)"
            :class="[
              'h-10 w-16 rounded-lg border border-white/15 bg-slate-950/60 text-center text-base font-semibold text-white focus:border-primary focus:outline-none',
              isLocked && team ? 'disabled:opacity-100 disabled:cursor-default' : 'disabled:opacity-40 disabled:cursor-not-allowed'
            ]"
            @input="event => updateScore(index, (event.target as HTMLInputElement).value)"
            @click.stop
            @mousedown.stop
          />
      </button>
    </div>

    <footer class="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-slate-400">
      <div class="flex items-center gap-2">
        <span class="text-white/70">{{ t('ui.node.winnerLabel') }}</span>
        <span class="text-secondary-200">{{ match.winner?.name ?? '—' }}</span>
      </div>
      <button
        v-if="match.result.winnerSlot !== null || match.result.score.some(value => value !== null)"
        type="button"
        :disabled="isLocked"
        :class="[
          'text-[10px] font-semibold tracking-[0.3em]',
          isLocked ? 'text-slate-400 cursor-default' : 'text-slate-500 hover:text-white'
        ]"
        @click="clearMatch"
      >
        {{ t('ui.actions.reset') }}
      </button>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import teams from '~/data/teams'
import type { HydratedMatch, MatchSlotSource } from '~/types/bracket'

const props = defineProps<{
  match: HydratedMatch
  variant?: 'standard' | 'final'
  isLocked?: boolean
}>()

const { setMatchResult, clearMatchResult } = useBracket()
const { t } = useI18n()

type SlotDescriptor = {
  name: string
  region: string
}

const defaultSlotDescriptor = computed<SlotDescriptor>(() => ({
  name: t('ui.node.toBeDecided'),
  region: t('ui.status.pending')
}))

const teamDictionary = Object.fromEntries(teams.map(team => [team.id, team]))

const describeSlot = (slot: MatchSlotSource): SlotDescriptor => {
  if (slot.type === 'team') {
    const fallbackTeam = teamDictionary[slot.teamId]
    return {
      name: fallbackTeam?.name ?? defaultSlotDescriptor.value.name,
      region: fallbackTeam?.region ?? defaultSlotDescriptor.value.region
    }
  }
  const isWinner = slot.type === 'winner'
  const prefix = t(isWinner ? 'ui.node.winnerPrefix' : 'ui.node.loserPrefix')
  return {
    name: `${prefix} ${slot.matchId}`,
    region: t('ui.status.pending')
  }
}

const slotPlaceholders = computed<[SlotDescriptor, SlotDescriptor]>(() => {
  return props.match.slots.map(slot => describeSlot(slot)) as [
    SlotDescriptor,
    SlotDescriptor
  ]
})

const rowDetails = computed<[SlotDescriptor, SlotDescriptor]>(() => {
  return props.match.participants.map((team, index) => {
    if (team) {
      return { name: team.name, region: team.region }
    }
    return slotPlaceholders.value[index] ?? defaultSlotDescriptor.value
  }) as [SlotDescriptor, SlotDescriptor]
})

const displayForRow = (index: number): SlotDescriptor =>
  rowDetails.value[index] ?? defaultSlotDescriptor.value

const variantClass = computed(() =>
  props.variant === 'final'
    ? 'border-secondary/60 bg-secondary/15 shadow-[0_0_35px_rgba(250,204,21,0.2)]'
    : 'border-white/15 bg-slate-900/70'
)

const nodeClasses = computed(() => [
  'rounded-2xl p-4 shadow-glow backdrop-blur',
  variantClass.value
])

const allParticipantsReady = computed(() => props.match.participants.every(Boolean))

const rowClasses = (index: number, team: HydratedMatch['participants'][number]) => {
  const isWinner = props.match.result.winnerSlot === index
  const canInteract = Boolean(team) && allParticipantsReady.value && !props.isLocked
  const isLockedButReady = props.isLocked && Boolean(team) && allParticipantsReady.value
  
  let cursorClass = 'cursor-not-allowed opacity-40'
  if (canInteract) {
    cursorClass = 'cursor-pointer hover:border-primary/70 hover:bg-primary/5'
  } else if (isLockedButReady) {
    cursorClass = 'cursor-default'
  }
  
  return [
    cursorClass,
    isWinner ? 'border-primary/70 bg-primary/5' : 'border-white/20'
  ]
}

const scoreValue = (index: number) => props.match.result.score[index] ?? ''

const updateScore = (index: number, rawValue: string) => {
  if (props.isLocked) return
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
  if (props.isLocked) return
  const team = props.match.participants[index]
  if (!team || !allParticipantsReady.value) return
  const opponentIndex = index === 0 ? 1 : 0
  const nextScore = [...props.match.result.score] as [number | null, number | null]
  nextScore[index] = props.match.targetScore
  nextScore[opponentIndex] = 0
  setMatchResult(props.match.id, {
    winnerSlot: index as 0 | 1,
    score: nextScore
  })
}

const clearMatch = () => {
  if (props.isLocked) return
  clearMatchResult(props.match.id)
}
</script>


