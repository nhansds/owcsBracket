<template>
  <div class="space-y-10">
    <section
      class="grid gap-6 rounded-3xl border border-white/5 bg-white/5 p-6 shadow-inner lg:grid-cols-[2.5fr,1fr]"
    >
      <div class="space-y-3">
        <h2 class="text-2xl font-semibold">Règles du bracket</h2>
        <p class="text-sm text-slate-300">
          Les OWCS 2025 World Finals utilisent un bracket à double élimination pour 12 équipes.
          Les têtes de série régionales démarrent au second tour, les matchs d’ouverture sont en
          <span class="font-semibold text-secondary-200">First to 2</span>, tous les autres en
          <span class="font-semibold text-secondary-200">First to 3</span> sauf la grande finale
          disputée en <span class="font-semibold text-secondary-200">First to 4</span>.
        </p>
        <p class="text-sm text-slate-300">
          Clique sur une équipe pour la désigner gagnante puis ajuste le score. Chaque résultat
          propage automatiquement les équipes aux matchs suivants.
        </p>
      </div>
      <aside
        class="flex flex-col gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm shadow-glow"
      >
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Total de matchs</span>
          <span class="font-semibold text-white">{{ matches.length }}</span>
        </div>
        <div class="flex items-center justify-between">
          <span class="text-slate-400">Matchs complétés</span>
          <span class="font-semibold text-white">{{ completedMatches }}</span>
        </div>
        <button
          type="button"
          class="rounded-xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          @click="resetBracket"
        >
          Réinitialiser tout
        </button>
        <div class="space-y-2">
          <label class="text-xs uppercase tracking-[0.3em] text-slate-500">Lien à partager</label>
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
              Copier
            </button>
          </div>
        </div>
        <button
          type="button"
          class="rounded-xl border border-secondary/40 bg-secondary/20 px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary/30 disabled:cursor-progress disabled:opacity-60"
          :disabled="isExporting"
          @click="exportBracketImage"
        >
          {{ isExporting ? 'Export en cours…' : 'Exporter en image' }}
        </button>
        <p v-if="shareStatus" class="text-xs text-secondary-200">
          {{ shareStatus }}
        </p>
      </aside>
    </section>

    <div ref="bracketRef" class="space-y-10">
      <section class="space-y-4">
        <header class="flex items-center gap-3">
          <h2 class="text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
            Upper Bracket
          </h2>
          <div class="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
        </header>
        <div class="bracket-grid">
          <BracketRound
            v-for="column in upperColumns"
            :key="column.title"
            :title="column.title"
            :matches="column.matches"
          />
        </div>
      </section>

      <section class="space-y-4">
        <header class="flex items-center gap-3">
          <h2 class="text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
            Lower Bracket
          </h2>
          <div class="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
        </header>
        <div class="bracket-grid">
          <BracketRound
            v-for="column in lowerColumns"
            :key="column.title"
            :title="column.title"
            :matches="column.matches"
          />
        </div>
      </section>

      <section class="space-y-4">
        <header class="flex items-center gap-3">
          <h2 class="text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
            Finales
          </h2>
          <div class="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
        </header>
        <div class="bracket-grid">
          <BracketRound
            v-for="column in finalColumns"
            :key="column.title"
            :title="column.title"
            :matches="column.matches"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import BracketRound from '../../app/components/BracketRound.vue'
import { useBracket } from '../../app/composables/useBracket'
import type { HydratedMatch } from '../../app/types/bracket'
import { useRoute, useRouter } from 'vue-router'

const {
  matches,
  results,
  resetBracket,
  encodeBracketState,
  decodeBracketState
} = useBracket()
const route = useRoute()
const router = useRouter()

const upperOrder = [
  'Upper Round 1',
  'Upper Quarterfinals',
  'Upper Semifinals',
  'Upper Final'
]
const lowerOrder = [
  'Lower Round 1',
  'Lower Round 2',
  'Lower Quarterfinals',
  'Lower Semifinal',
  'Lower Final'
]
const finalOrder = ['Grand Final']

const matchesByRound = computed(() => {
  return matches.value.reduce<Record<string, HydratedMatch[]>>((acc: Record<string, HydratedMatch[]>, match: HydratedMatch) => {
    (acc[match.roundLabel] as HydratedMatch[] | undefined) ??= [] as HydratedMatch[]
    (acc[match.roundLabel] as HydratedMatch[]).push(match)
    return acc
  }, {})
})

const createColumns = (order: string[]) =>
  computed(() =>
    order.map(label => ({
      title: label,
      matches: matchesByRound.value[label] ?? []
    }))
  )

const upperColumns = createColumns(upperOrder)
const lowerColumns = createColumns(lowerOrder)
const finalColumns = createColumns(finalOrder)
const completedMatches = computed(
  () => matches.value.filter((match: HydratedMatch) => match.result.winnerSlot !== null).length
)

const bracketRef = ref<HTMLElement | null>(null)
const shareToken = ref('')
const shareStatus = ref('')
const isExporting = ref(false)
const initialized = ref(false)

const shareUrl = computed(() => {
  if (!process.client) return ''
  const base = `${window.location.origin}${route.path}`
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
    shareStatus.value = 'Lien copié dans le presse-papiers ✅'
  } catch (error) {
    console.error(error)
    shareStatus.value = 'Impossible de copier automatiquement, sélectionne le lien.'
  }
}

let domToImageModule: typeof import('dom-to-image-more') | null = null

const exportBracketImage = async () => {
  if (!process.client || !bracketRef.value) return
  isExporting.value = true
  shareStatus.value = ''
  try {
    if (!domToImageModule) {
      domToImageModule = await import('dom-to-image-more')
    }
    const dataUrl = await domToImageModule.toPng(bracketRef.value, {
      cacheBust: true,
      bgcolor: '#05060d',
      quality: 0.98
    })
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `owcs-2025-bracket.png`
    link.click()
    shareStatus.value = 'Image téléchargée ✅'
  } catch (error) {
    console.error(error)
    shareStatus.value = "Export impossible, réessaie."
  } finally {
    isExporting.value = false
  }
}
</script>

