<template>
  <main class="min-h-dvh bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950">
    <section class="mx-auto flex max-w-3xl flex-col items-center justify-center gap-8 px-6 py-24 text-center">
      <h1 class="text-4xl font-extrabold tracking-tight sm:text-6xl">
        <span
          class="bg-gradient-to-r from-indigo-500 to-fuchsia-500 bg-clip-text text-transparent font-header">rebuild.dave.io</span>
      </h1>
      <p class="max-w-2xl text-balance text-lg text-slate-600 dark:text-slate-300 font-subtitle">
        A minimal Nuxt 4 starter styled with Tailwind CSS.
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <NuxtLink
          to="/welcome"
          class="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
        >
          About Nuxt.js
        </NuxtLink>
        <a
          href="https://nuxt.com"
          target="_blank"
          rel="noreferrer"
          class="rounded-lg border border-slate-300 px-5 py-3 font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800/60"
        >
          Nuxt Docs
        </a>
      </div>
      <NuxtTurnstile ref="turnstile" />
      <button @click="turnstile.reset()">Reset token in template</button>
      <button @click="reset()">Reset token from handler</button>
    </section>
  </main>
</template>

<script
  setup
  lang="ts"
>
  // you can call this template ref anything
  const turnstile = ref()

  function reset() {
    turnstile.value?.reset()
  }
</script>
