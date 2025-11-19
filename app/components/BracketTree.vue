<template>
  <div class="bracket-tree space-y-16">
    <section class="bracket-branch space-y-4">
      <div class="bracket-branch-title">
        <h2>Upper Bracket</h2>
        <div class="bracket-branch-line" />
      </div>
      <div class="bracket-columns">
        <template v-for="(column, columnIndex) in upperColumns" :key="column.title">
          <div class="bracket-column">
            <p class="bracket-column-title">{{ column.title }}</p>
            <div class="bracket-column-body">
              <BracketNode
                v-for="match in column.matches"
                :key="match.id"
                :match="match"
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
        <h2>Lower Bracket</h2>
        <div class="bracket-branch-line" />
      </div>
      <div class="bracket-columns">
        <template v-for="(column, columnIndex) in lowerColumns" :key="column.title">
          <div class="bracket-column">
            <p class="bracket-column-title">{{ column.title }}</p>
            <div class="bracket-column-body">
              <BracketNode
                v-for="match in column.matches"
                :key="match.id"
                :match="match"
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
        <h2>Finales</h2>
        <div class="bracket-branch-line" />
      </div>
      <div v-if="finalMatches.length" class="bracket-finals">
        <template v-for="(entry, index) in finalMatches" :key="entry.label">
          <div class="bracket-finals-node">
            <p class="bracket-finals-label">{{ entry.label }}</p>
            <BracketNode :match="entry.match" variant="final" />
          </div>
          <div v-if="index < finalMatches.length - 1" class="bracket-finals-connector" />
        </template>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BracketNode from '~/components/BracketNode.vue'
import type { HydratedMatch } from '~/types/bracket'

type BracketColumn = {
  title: string
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
}>()

const finalMatches = computed(() =>
  [
    { label: 'Upper Final', match: props.finals.upperFinal },
    { label: 'Lower Final', match: props.finals.lowerFinal },
    { label: 'Grand Final', match: props.finals.grandFinal }
  ].filter(
    (entry): entry is { label: string; match: HydratedMatch } =>
      Boolean(entry.match)
  )
)
</script>


