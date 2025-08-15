<template>
  <span>
    <NuxtTurnstile v-model="token" />
    <span
      v-if="!error && !emailAddress"
      class="text-yellow font-mono"
    >
      <Icon
        name="i-oui-inspect"
        class="animate-ping ml-2"
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
      } catch {
        error.value = "Browser integrity check failed"
      } finally {
        loading.value = false
      }
    },
    { once: true }
  ) // Use once option instead of manual stop
</script>
