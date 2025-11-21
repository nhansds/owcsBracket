<template>
  <div class="space-y-10">
    <div class="space-y-6">
      <section
        class="grid gap-6 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner lg:grid-cols-[2.5fr,1fr]"
      >
        <div class="space-y-3">
          <h2 class="text-2xl font-semibold">{{ t('bracket.rules.heading') }}</h2>
          <p class="text-sm text-slate-300">
            {{ t('bracket.rules.paragraph1.part1') }}
            <span class="font-semibold text-secondary-200">
              {{ t('bracket.rules.firstTo2') }}
            </span>
            {{ t('bracket.rules.paragraph1.part2') }}
            <span class="font-semibold text-secondary-200">
              {{ t('bracket.rules.firstTo3') }}
            </span>
            {{ t('bracket.rules.paragraph1.part3') }}
            <span class="font-semibold text-secondary-200">
              {{ t('bracket.rules.firstTo4') }}
            </span>{{ t('bracket.rules.paragraph1.ending') }}
          </p>
          <p class="text-sm text-slate-300">
            {{ t('bracket.rules.paragraph2') }}
          </p>
        </div>
        <aside
          class="flex flex-col gap-4 rounded-2xl border border-white/15 bg-slate-900/60 p-4 text-sm shadow-glow"
        >
          <div class="flex items-center justify-between">
            <span class="text-slate-400">{{ t('bracket.stats.totalMatches') }}</span>
            <span class="font-semibold text-white">{{ matches.length }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">{{ t('bracket.stats.matchesCompleted') }}</span>
            <span class="font-semibold text-white">{{ completedMatches }}</span>
          </div>
          <button
            type="button"
            :disabled="isLocked"
            class="rounded-xl border border-white/15 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed"
            @click="handleResetBracket"
          >
            {{ t('bracket.actions.resetAll') }}
          </button>
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-[0.3em] text-slate-500">{{ t('bracket.share.label') }}</label>
            <div class="space-y-2">
              <input
                v-model="bracketName"
                type="text"
                :placeholder="t('bracket.share.namePlaceholder')"
                class="w-full rounded-xl border border-stroke bg-slate-950/60 px-3 py-2 text-[13px] text-white placeholder:text-slate-500 focus:border-primary focus:outline-none"
                @input="updateUrlParams"
              />
              <div class="flex items-center justify-between rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2">
                <label class="text-[13px] text-slate-300">{{ t('bracket.share.lockLabel') }}</label>
                <button
                  type="button"
                  :disabled="!isLocked && !isBracketComplete"
                  class="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition disabled:opacity-40 disabled:cursor-not-allowed"
                  :class="isLocked ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'"
                  @click="toggleLock"
                >
                  <span>{{ isLocked ? t('bracket.share.locked') : t('bracket.share.unlocked') }}</span>
                </button>
              </div>
              <p
                v-if="!isBracketComplete && !isLocked"
                class="text-xs text-slate-400"
              >
                {{ t('bracket.share.incompleteWarning') }}
              </p>
              <div
                v-if="isBracketComplete && !isLocked"
                class="rounded-xl border border-secondary-200/30 bg-secondary-200/10 px-3 py-2"
              >
                <p class="mb-2 text-xs text-secondary-200">
                  {{ t('bracket.share.completeMessage') }}
                </p>
                <button
                  type="button"
                  class="w-full rounded-lg bg-secondary-200/20 px-3 py-1.5 text-xs font-semibold text-secondary-200 transition hover:bg-secondary-200/30"
                  @click="toggleLock"
                >
                  {{ t('bracket.share.lockNow') }}
                </button>
              </div>
            </div>
            <div class="flex gap-2">
              <input
                :value="shareUrl"
                readonly
                class="flex-1 truncate rounded-xl border border-stroke bg-slate-950/60 px-3 py-2 text-[13px] text-white"
              />
              <button
                type="button"
                class="rounded-xl bg-primary/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-primary"
                @click="copyShareLink"
              >
                {{ t('ui.actions.copy') }}
              </button>
            </div>
          </div>
          <p v-if="shareStatus" class="text-xs text-secondary-200">
            {{ shareStatus }}
          </p>
        </aside>
      </section>

      <section class="rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner">
        <TeamsList />
      </section>
    </div>

    <div ref="bracketRef">
      <BracketTree
        :upper-columns="bracketLayout.upperColumns"
        :lower-columns="bracketLayout.lowerColumns"
        :finals="bracketLayout.finals"
        :is-locked="isLocked"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import BracketTree from '../../app/components/BracketTree.vue'
import TeamsList from '../../app/components/TeamsList.vue'
import { useBracket } from '../../app/composables/useBracket'
import type { HydratedMatch } from '../../app/types/bracket'
import { useRoute, useRouter } from 'vue-router'

const {
  matches,
  matchesById,
  results,
  resetBracket,
  encodeBracketState,
  decodeBracketState,
  setMatchResult,
  clearMatchResult,
  isLocked: bracketIsLocked
} = useBracket()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()

const collectMatches = (ids: string[]) =>
  ids
    .map(id => matchesById.value[id])
    .filter(Boolean) as HydratedMatch[]

const bracketLayout = computed(() => ({
  upperColumns: [
    { titleKey: 'bracket.rounds.upperRound1', matches: collectMatches(['M4', 'M3', 'M1', 'M2']) },
    { titleKey: 'bracket.rounds.upperRound2', matches: collectMatches(['M5', 'M6', 'M7', 'M8']) },
    { titleKey: 'bracket.rounds.upperSemifinals', matches: collectMatches(['M15', 'M16']) }
  ],
  lowerColumns: [
    { titleKey: 'bracket.rounds.lowerRound1', matches: collectMatches(['M9', 'M10', 'M11', 'M12']) },
    { titleKey: 'bracket.rounds.lowerRound2', matches: collectMatches(['M13', 'M14']) },
    { titleKey: 'bracket.rounds.lowerRound3', matches: collectMatches(['M17', 'M18']) },
    { titleKey: 'bracket.rounds.lowerSemifinal', matches: collectMatches(['M19']) }
  ],
  finals: {
    upperFinal: matchesById.value['UBF'] ?? null,
    lowerFinal: matchesById.value['LBF'] ?? null,
    grandFinal: matchesById.value['FINALS'] ?? null
  }
}))
const completedMatches = computed(
  () => matches.value.filter((match: HydratedMatch) => match.result.winnerSlot !== null).length
)

const isBracketComplete = computed(() => {
  // Le bracket est complet quand le match final (FINALS) a un vainqueur
  const grandFinal = matchesById.value['FINALS']
  return grandFinal?.result.winnerSlot !== null && grandFinal?.result.winnerSlot !== undefined
})

const shareToken = ref('')
const shareStatus = ref('')
const initialized = ref(false)
const bracketName = ref('')
const runtimeConfig = useRuntimeConfig()

// Synchronize isLocked with shared state
const isLocked = bracketIsLocked

const shareUrl = computed(() => {
  if (!process.client) return ''
  const origin = globalThis.location?.origin ?? ''
  const basePath = runtimeConfig.app?.baseURL ?? '/'
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const pathSuffix = route.path === '/' ? '' : route.path.replace(/^\//, '')
  const base = `${origin}${normalizedBase}${pathSuffix}`
  const params = new URLSearchParams()
  if (shareToken.value) {
    params.set('state', shareToken.value)
  }
  if (bracketName.value) {
    params.set('name', bracketName.value)
  }
  if (isLocked.value) {
    params.set('locked', 'true')
  }
  const queryString = params.toString()
  return queryString ? `${base}?${queryString}` : base
})

onMounted(() => {
  const initial = typeof route.query.state === 'string' ? route.query.state : ''
  if (initial) {
    decodeBracketState(initial)
  }
  shareToken.value = encodeBracketState()
  
  // Read bracket name and lock state from URL
  bracketName.value = typeof route.query.name === 'string' ? route.query.name : ''
  bracketIsLocked.value = route.query.locked === 'true'
  
  initialized.value = true
})

watch(
  () => results.value,
  () => {
    if (!process.client || !initialized.value) return
    const nextToken = encodeBracketState()
    if (nextToken === shareToken.value) return
    shareToken.value = nextToken
    updateUrlParams()
  },
  { deep: true }
)

const updateUrlParams = () => {
  if (!process.client || !initialized.value) return
  const nextQuery: Record<string, string> = {}
  
  // Copy existing query params (excluding the ones we manage)
  for (const [key, value] of Object.entries(route.query)) {
    if (key !== 'state' && key !== 'name' && key !== 'locked') {
      if (typeof value === 'string') {
        nextQuery[key] = value
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'string') {
        nextQuery[key] = value[0]
      }
    }
  }
  
  if (shareToken.value) {
    nextQuery.state = shareToken.value
  }
  
  if (bracketName.value) {
    nextQuery.name = bracketName.value
  }
  
  if (isLocked.value) {
    nextQuery.locked = 'true'
  }
  
  router.replace({ query: nextQuery })
}

const toggleLock = () => {
  // Permettre le déverrouillage à tout moment
  if (isLocked.value) {
    isLocked.value = false
    updateUrlParams()
    return
  }
  
  // Empêcher le verrouillage si le bracket n'est pas complet
  if (!isBracketComplete.value) {
    return
  }
  
  isLocked.value = true
  updateUrlParams()
}

const handleResetBracket = () => {
  resetBracket()
}

const copyShareLink = async () => {
  if (!process.client || !shareUrl.value) return
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    shareStatus.value = t('bracket.share.success')
  } catch (error) {
    console.error(error)
    shareStatus.value = t('bracket.share.failure')
  }
}

const bracketRef = ref<HTMLElement | null>(null)
</script>

