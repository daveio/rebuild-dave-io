<template>
  <div
    class="min-h-screen bg-gradient-to-br from-base via-mantle to-base flex flex-col justify-center py-12 px-4 relative overflow-hidden"
  >
    <Background />
    <div class="max-w-3xl mx-auto w-full relative z-10">
      <Interface :hide-hero="true">
        <NuxtTurnstile v-model="token" />
        <div class="text-center mt-4">
          <p v-if="loading" class="text-text">Verifying...</p>
          <p v-else-if="error" class="text-red">{{ error }}</p>
          <p v-else-if="emailAddress" class="text-text font-mono">{{ emailAddress }}</p>
        </div>
      </Interface>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Background from "../components/layout/Background.vue"
import Interface from "../components/layout/Interface.vue"
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
