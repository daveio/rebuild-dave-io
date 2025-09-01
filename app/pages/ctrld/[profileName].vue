<template>
  <div class="flex justify-center items-center pt-6">
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <h1 class="card-title">Unblock Domain</h1>
        <p>
          You are about to unblock <strong>{{ domain }}</strong> for the <strong>{{ profile }}</strong> profile.
        </p>

        <div role="alert" class="alert alert-warning mt-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span><strong>Think before you click!</strong> Is this block protecting you?</span>
        </div>

        <div class="card-actions justify-end mt-4">
          <button class="btn btn-primary" :disabled="loading" @click="unblockDomain">
            <span v-if="loading" class="loading loading-spinner"></span>
            {{ loading ? "Unblocking..." : "Unblock Domain" }}
          </button>
        </div>

        <div v-if="statusMessage" role="alert" :class="['alert mt-4', statusClass]">
          <svg
            v-if="statusClass === 'alert-success'"
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{{ statusMessage }}</span>
        </div>
      </div>
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
const statusClass = ref("alert-success")

if (!validProfiles.includes(profile.value)) {
  throw createError({
    statusCode: 404,
    statusMessage: "You need to specify a valid profile"
  })
}

if (!domain.value) {
  throw createError({
    statusCode: 400,
    statusMessage: "You need to specify a domain"
  })
}

if (!auth.value) {
  throw createError({
    statusCode: 401,
    statusMessage: "You need to at least TRY to authenticate"
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
    statusClass.value = "alert-success"
  } catch (e: unknown) {
    if (e instanceof Error) {
      statusMessage.value = `Error: ${e.message}`
    } else {
      statusMessage.value = "Error: An unknown error occurred."
    }
    statusClass.value = "alert-error"
  } finally {
    loading.value = false
  }
}
</script>
