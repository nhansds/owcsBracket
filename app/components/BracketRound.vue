<template>
  <section class="flex flex-col gap-3">
    <header class="pl-1 text-xs font-semibold uppercase tracking-[0.25em] text-slate-500">
      {{ title }}
    </header>
    <div class="space-y-4">
      <BracketMatchCard v-for="match in matches" :key="match.id" :match="match" />
    </div>
  </section>
</template>

<script setup lang="ts">
import BracketMatchCard from '~/components/BracketMatchCard.vue'
import type { HydratedMatch } from '~/types/bracket'

defineProps<{
  title: string
  matches: HydratedMatch[]
}>()
</script>

