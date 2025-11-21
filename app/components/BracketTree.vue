<template>
  <div class="bracket-tree space-y-16">
    <section class="bracket-branch space-y-4">
      <div class="bracket-branch-title">
        <h2>{{ t('bracket.sections.upper') }}</h2>
        <div class="bracket-branch-line" />
      </div>
      <div class="bracket-columns">
        <template v-for="(column, columnIndex) in upperColumns" :key="column.titleKey">
          <div class="bracket-column">
            <p class="bracket-column-title">{{ t(column.titleKey) }}</p>
            <div class="bracket-column-body">
              <BracketNode
                v-for="match in column.matches"
                :key="match.id"
                :match="match"
                :is-locked="isLocked"
              />
            </div>
          </div>
          <div
            v-if="columnIndex < upperColumns.length - 1"
            class="bracket-column-connector"
          />
        </template>
      </div>
    </section>

    <section class="bracket-branch space-y-4">
      <div class="bracket-branch-title">
        <h2>{{ t('bracket.sections.lower') }}</h2>
        <div class="bracket-branch-line" />
      </div>
      <div class="bracket-columns">
        <template v-for="(column, columnIndex) in lowerColumns" :key="column.titleKey">
          <div class="bracket-column">
            <p class="bracket-column-title">{{ t(column.titleKey) }}</p>
            <div class="bracket-column-body">
              <BracketNode
                v-for="match in column.matches"
                :key="match.id"
                :match="match"
                :is-locked="isLocked"
              />
            </div>
          </div>
          <div
            v-if="columnIndex < lowerColumns.length - 1"
            class="bracket-column-connector"
          />
        </template>
      </div>
    </section>

    <section class="bracket-branch space-y-4">
      <div class="bracket-branch-title">
        <h2>{{ t('bracket.sections.finals') }}</h2>
        <div class="bracket-branch-line" />
      </div>
      <div v-if="finalMatches.length" class="bracket-finals">
        <template v-for="(entry, index) in finalMatches" :key="entry.label">
          <div class="bracket-finals-node">
            <p class="bracket-finals-label">{{ t(entry.labelKey) }}</p>
            <BracketNode :match="entry.match" variant="final" :is-locked="isLocked" />
          </div>
          <div v-if="index < finalMatches.length - 1" class="bracket-finals-connector" />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import BracketNode from '~/components/BracketNode.vue'
import type { HydratedMatch } from '~/types/bracket'

type BracketColumn = {
  titleKey: string
  matches: HydratedMatch[]
}

type FinalsLayout = {
  upperFinal: HydratedMatch | null
  lowerFinal: HydratedMatch | null
  grandFinal: HydratedMatch | null
}

const props = defineProps<{
  upperColumns: BracketColumn[]
  lowerColumns: BracketColumn[]
  finals: FinalsLayout
  isLocked?: boolean
}>()

const { t } = useI18n()

const finalMatches = computed(() =>
  [
    { labelKey: 'bracket.rounds.upperFinal', match: props.finals.upperFinal },
    { labelKey: 'bracket.rounds.lowerFinal', match: props.finals.lowerFinal },
    { labelKey: 'bracket.rounds.grandFinal', match: props.finals.grandFinal }
  ].filter(
    (entry): entry is { labelKey: string; match: HydratedMatch } =>
      Boolean(entry.match)
  )
)
</script>


