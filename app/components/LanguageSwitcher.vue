<template>
  <div class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50"
      @click="toggleDropdown"
      :aria-label="t('ui.language.switcherLabel')"
      :aria-expanded="isOpen"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
      <span class="hidden sm:inline">{{ currentLocaleName }}</span>
      <span class="sm:hidden">{{ currentLocaleCode.toUpperCase() }}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="h-4 w-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
      >
        <path d="M6 9l6 6l6 -6" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition-all duration-200"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-white/15 bg-slate-900/95 p-2 shadow-lg backdrop-blur-sm"
        @click.stop
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          type="button"
          class="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-white transition hover:bg-white/10"
          :class="{
            'bg-primary/20 text-primary': locale.code === currentLocaleCode
          }"
          @click="switchLocale(locale.code)"
        >
          <span class="flex-1 text-left">{{ locale.name }}</span>
          <span
            v-if="locale.code === currentLocaleCode"
            class="text-primary"
          >
            ✓
          </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'

type LocaleCode = 'en' | 'fr' | 'ko'

const { t, locale, setLocale } = useI18n()

const isOpen = ref(false)

const availableLocales: Array<{ code: LocaleCode; name: string }> = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'ko', name: '한국어' }
]

const currentLocaleCode = computed(() => locale.value as LocaleCode)

const currentLocaleName = computed(() => {
  const current = availableLocales.find(l => l.code === currentLocaleCode.value)
  return current?.name ?? 'English'
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const switchLocale = async (newLocale: LocaleCode) => {
  if (newLocale === currentLocaleCode.value) {
    isOpen.value = false
    return
  }
  
  await setLocale(newLocale)
  isOpen.value = false
}

const closeOnClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>

