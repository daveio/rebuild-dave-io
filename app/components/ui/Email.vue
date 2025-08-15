<template>
  <span>
    <NuxtTurnstile v-model="token" />
    <p
      v-if="loading"
      class="text-text"
    >Verifying...</p>
    <p
      v-else-if="error"
      class="text-red"
    >{{ error }}</p>
    <p
      v-else-if="emailAddress"
      class="text-text font-mono"
    >{{ emailAddress }}</p>
  </span>
</template>

<script
  lang="ts"
  setup
>
  // Auto-imports are available in Nuxt, no need to import ref, watch, etc.
  const token = ref<string>()
  const emailAddress = ref<string>()
  const loading = ref(false)
  const error = ref<string>()

  // Watch for token changes and verify
  watch(
    token,
    async (newToken) => {
      if (!newToken) return

      loading.value = true
      error.value = undefined

      try {
        const response = await $fetch("/api/util/email", {
          method: "POST",
          body: { token: newToken }
        })

        emailAddress.value = response.email
      } catch (err) {
        error.value = err instanceof Error ? err.message : "Verification failed"
      } finally {
        loading.value = false
      }
    },
    { once: true }
  ) // Use once option instead of manual stop
</script>
