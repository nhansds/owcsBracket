<template>
  <div>
    <slot
      name="trigger"
      :is-open="isOpen"
      :toggle="toggle"
    />
    <transition
      enter-active-class="transition-[max-height,opacity,transform] duration-600 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      enter-from-class="max-h-0 opacity-0 -translate-y-1 rotate-x-6"
      enter-to-class="max-h-[500px] opacity-100 translate-y-0 rotate-x-0"
      leave-active-class="transition-[max-height,opacity,transform] duration-450 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
      leave-from-class="max-h-[500px] opacity-100 translate-y-0 rotate-x-0"
      leave-to-class="max-h-0 opacity-0 -translate-y-1 rotate-x-3"
    >
      <div v-if="isOpen" class="overflow-hidden will-change-transform">
        <slot name="content" />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  defaultOpen?: boolean
}>()

const isOpen = ref(props.defaultOpen ?? true)

const toggle = () => {
  isOpen.value = !isOpen.value
}
</script>

