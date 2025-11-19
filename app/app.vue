<template>
  <div class="min-h-screen gradient-surface text-slate-100">
    <NuxtLoadingIndicator color="#ff5470" />
    <NuxtRouteAnnouncer />
    <main class="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <header class="space-y-6 text-center sm:text-left">
        <p class="text-xs tracking-[0.35em] uppercase text-secondary-300">
          OWCS 2025 World Finals
        </p>
        <div>
          <h1 class="text-4xl font-semibold sm:text-5xl">
            Bracket Builder
          </h1>
          <p class="mt-3 text-base text-slate-300">
            Choisis les gagnants, configure leurs scores et partage ton pronostic grâce à un lien
            ou une image exportée.
          </p>
        </div>
      </header>

      <NuxtPage />
    </main>
  </div>
</template>
