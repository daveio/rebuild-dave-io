<template>
  <span>
    <NuxtTurnstile v-model="token" />
    <span
      v-if="!error && !emailAddress"
      class="text-yellow font-mono"
    >
      <VueSpinner
        size="20"
        color="yellow"
      /> Checking your browser...
    </span>
    <span
      v-else-if="error"
      class="text-red font-mono"
    >{{ error }}</span>
    <span
      v-else-if="emailAddress"
      class="text-text font-mono"
    >
      <a
        :href="`mailto:${emailAddress}`"
        class="link-url"
      >
        {{ emailAddress }}
      </a>
    </span>
  </span>
</template>

<script
  lang="ts"
  setup
>
  import {
    VueSpinner
  } from "vue3-spinners"

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

        const resp = response as { data?: { email?: string } }
        if (resp.data && typeof resp.data.email === "string") {
          emailAddress.value = resp.data.email
        } else {
          error.value = "Email not found in response"
        }
      } catch {
        error.value = "Browser integrity check failed"
      } finally {
        loading.value = false
      }
    },
    { once: true }
  ) // Use once option instead of manual stop
</script>
