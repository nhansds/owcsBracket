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
            Pick your winners, set their scores, and share the bracket with a single link.
          </p>
        </div>
      </header>

      <NuxtPage />

      <footer
        class="flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-slate-300 shadow-inner shadow-black/20 sm:flex-row sm:items-center sm:justify-between"
      >
        <span class="font-medium text-white">Made with ❤️ by Nhans</span>
        <div class="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <a
            href="https://github.com/nhansds"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://gitlab.com/nhansds"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            GitLab
          </a>
          <a
            href="https://nhans.fr/"
            target="_blank"
            rel="noopener"
            class="text-secondary-200 hover:text-white"
          >
            nhans.fr
          </a>
        </div>
      </footer>
    </main>
  </div>
</template>
