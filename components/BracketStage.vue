<template>
  <section class="space-y-4">
    <header class="flex items-center gap-3">
      <h2 class="text-xl font-semibold uppercase tracking-[0.3em] text-white/80">
        {{ title }}
      </h2>
      <div class="h-px flex-1 bg-gradient-to-r from-white/40 to-transparent" />
    </header>
    <div class="rounded-3xl border border-white/5 bg-white/5/30 p-4">
      <div class="relative overflow-x-auto">
        <div
          class="relative"
          :style="{
            width: `${width}px`,
            height: `${height}px`,
            minHeight: `${height}px`
          }"
        >
          <svg
            class="pointer-events-none absolute left-0 top-0 h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
            :viewBox="`0 0 ${width} ${height}`"
          >
            <path
              v-for="edge in connections"
              :key="edge.id"
              :d="edge.path"
              stroke="url(#bracketStroke)"
              stroke-width="2"
              fill="none"
              stroke-linecap="round"
              opacity="0.5"
            />
            <defs>
              <linearGradient id="bracketStroke" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stop-color="#6dd6ff" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#ff5470" stop-opacity="0.9" />
              </linearGradient>
            </defs>
          </svg>

          <div
            v-for="node in nodes"
            :key="node.id"
            class="absolute w-[250px]"
            :style="{
              left: `${node.x}px`,
              top: `${node.y}px`
            }"
          >
            <BracketMatchCard :match="node.match" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import BracketMatchCard from '~/components/BracketMatchCard.vue'
import type { HydratedMatch } from '~/types/bracket'

interface StageNode {
  id: string
  match: HydratedMatch
  x: number
  y: number
}

interface StageConnection {
  id: string
  path: string
}

defineProps<{
  title: string
  nodes: StageNode[]
  connections: StageConnection[]
  width: number
  height: number
}>()
</script>

