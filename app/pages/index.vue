<template>
  <div class="space-y-10">
    <div class="space-y-6">
      <section
        class="grid gap-6 rounded-3xl border border-white/15 bg-white/10 p-6 shadow-inner lg:grid-cols-[2.5fr,1fr]"
      >
        <div class="space-y-3">
          <h2 class="text-2xl font-semibold">Bracket rules</h2>
          <p class="text-sm text-slate-300">
            The OWCS 2025 World Finals use a 12-team double-elimination bracket. Regional top seeds
            start directly in round two, opening matches are played
            <span class="font-semibold text-secondary-200">First to 2</span>, the rest are
            <span class="font-semibold text-secondary-200">First to 3</span> except the Grand Final,
            which is played <span class="font-semibold text-secondary-200">First to 4</span>.
          </p>
          <p class="text-sm text-slate-300">
            Click any team to pick a winner, then set the score. Every result automatically propagates
            to the next matches.
          </p>
        </div>
        <aside
          class="flex flex-col gap-4 rounded-2xl border border-white/15 bg-slate-900/60 p-4 text-sm shadow-glow"
        >
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Total matches</span>
            <span class="font-semibold text-white">{{ matches.length }}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-slate-400">Matches completed</span>
            <span class="font-semibold text-white">{{ completedMatches }}</span>
          </div>
          <button
            type="button"
            class="rounded-xl border border-white/15 bg-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/25"
            @click="resetBracket"
          >
            Reset all
          </button>
          <div class="space-y-2">
            <label class="text-xs uppercase tracking-[0.3em] text-slate-500">Shareable link</label>
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
                Copy
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
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
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
  decodeBracketState
} = useBracket()
const route = useRoute()
const router = useRouter()

const collectMatches = (ids: string[]) =>
  ids
    .map(id => matchesById.value[id])
    .filter(Boolean) as HydratedMatch[]

const bracketLayout = computed(() => ({
  upperColumns: [
    { title: 'Upper Round 1', matches: collectMatches(['UBR1-A', 'UBR1-B', 'UBR1-C', 'UBR1-D']) },
    { title: 'Upper Quarterfinals', matches: collectMatches(['UBQ-A', 'UBQ-B', 'UBQ-C', 'UBQ-D']) },
    { title: 'Upper Semifinals', matches: collectMatches(['UBS-A', 'UBS-B']) }
  ],
  lowerColumns: [
    { title: 'Lower Round 1', matches: collectMatches(['LBR1-A', 'LBR1-B', 'LBR1-C', 'LBR1-D']) },
    { title: 'Lower Round 2', matches: collectMatches(['LBR2-A', 'LBR2-B']) },
    { title: 'Lower Quarterfinals', matches: collectMatches(['LBQ-A', 'LBQ-B']) },
    { title: 'Lower Semifinal', matches: collectMatches(['LBS']) }
  ],
  finals: {
    upperFinal: matchesById.value['UBF'] ?? null,
    lowerFinal: matchesById.value['LBF'] ?? null,
    grandFinal: matchesById.value['GF'] ?? null
  }
}))
const completedMatches = computed(
  () => matches.value.filter((match: HydratedMatch) => match.result.winnerSlot !== null).length
)

const shareToken = ref('')
const shareStatus = ref('')
const initialized = ref(false)
const runtimeConfig = useRuntimeConfig()

const shareUrl = computed(() => {
  if (!process.client) return ''
  const origin = globalThis.location?.origin ?? ''
  const basePath = runtimeConfig.app?.baseURL ?? '/'
  const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`
  const pathSuffix = route.path === '/' ? '' : route.path.replace(/^\//, '')
  const base = `${origin}${normalizedBase}${pathSuffix}`
  return shareToken.value ? `${base}?state=${shareToken.value}` : base
})

onMounted(() => {
  const initial = typeof route.query.state === 'string' ? route.query.state : ''
  if (initial) {
    decodeBracketState(initial)
  }
  shareToken.value = encodeBracketState()
  initialized.value = true
})

watch(
  () => results.value,
  () => {
    if (!process.client || !initialized.value) return
    const nextToken = encodeBracketState()
    if (nextToken === shareToken.value) return
    shareToken.value = nextToken
    const nextQuery = { ...route.query }
    if (nextToken) {
      nextQuery.state = nextToken
    } else {
      delete nextQuery.state
    }
    router.replace({ query: nextQuery })
  },
  { deep: true }
)

const copyShareLink = async () => {
  if (!process.client || !shareUrl.value) return
  try {
    await navigator.clipboard.writeText(shareUrl.value)
    shareStatus.value = 'Link copied to clipboard ✅'
  } catch (error) {
    console.error(error)
    shareStatus.value = 'Couldn’t copy automatically, please select the link.'
  }
}

const bracketRef = ref<HTMLElement | null>(null)
</script>

