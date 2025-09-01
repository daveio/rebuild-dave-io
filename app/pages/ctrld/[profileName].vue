<template>
  <div class="container">
    <h1>Unblock Domain</h1>
    <div class="card">
      <p>
        You are about to unblock the following domain for the <strong>{{ profile }}</strong> profile:
      </p>
      <p><strong>Domain:</strong> {{ domain }}</p>

      <div class="warning">
        <p>
          <strong>Think before you click!</strong> Is this block protecting you from something? Unblocking could expose
          you to risks.
        </p>
      </div>

      <button :disabled="loading" @click="unblockDomain">
        {{ loading ? "Unblocking..." : "Unblock Domain" }}
      </button>

      <p v-if="statusMessage" class="status-message">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"

const route = useRoute()
const validProfiles = ["main", "permissive", "parents"]

const profile = computed(() => route.params.profileName as string)
const domain = computed(() => route.query.domain as string)
const auth = computed(() => route.query.auth as string)

const loading = ref(false)
const statusMessage = ref("")

if (!validProfiles.includes(profile.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: "Profile not found"
  })
}

usePageSetup({
  title: `ControlD for ${profile.value}`,
  description: `Unblock a domain for ${profile.value}`
})

async function unblockDomain() {
  loading.value = true
  statusMessage.value = ""
  try {
    const { error } = await useFetch("/api/ctrld", {
      method: "POST",
      body: {
        domain: domain.value,
        auth: auth.value,
        profile: profile.value
      }
    })

    if (error.value) {
      throw new Error(error.value.statusMessage || "An unknown error occurred.")
    }

    statusMessage.value = `Successfully unblocked ${domain.value}.`
  } catch (e: any) {
    statusMessage.value = `Error: ${e.message}`
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}
.card {
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-top: 1rem;
  background-color: #fff;
}
.warning {
  background-color: #fffbe6;
  border: 1px solid #ffe58f;
  border-radius: 0.25rem;
  padding: 1rem;
  margin: 1.5rem 0;
}
button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: #3182ce;
  color: white;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
}
button:disabled {
  background-color: #a0aec0;
  cursor: not-allowed;
}
.status-message {
  margin-top: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #f0fff4;
  border: 1px solid #9ae6b4;
}
</style>
