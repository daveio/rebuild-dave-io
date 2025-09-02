<template>
  <!-- Main container with centered layout -->
  <div class="flex justify-center items-center pt-6">
    <!-- Card container for the unblock domain interface -->
    <div class="card bg-base-100 shadow-xl">
      <div class="card-body">
        <!-- Page title -->
        <h1 class="card-title">Unblock Domain</h1>

        <!-- Domain and profile information display -->
        <p>
          You are about to unblock <strong>{{ domain }}</strong> for the <strong>{{ profile }}</strong> profile.
        </p>

        <!-- Warning alert about unblocking domains -->
        <div
          role="alert"
          class="alert alert-warning mt-4"
        >
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

        <!-- Future feature placeholder -->
        <p>Coming 'soon': AI advice about whether a domain looks sketchy</p>

        <!-- Action buttons for unblocking -->
        <div class="card-actions justify-end mt-4 space-x-2">
          <!-- Temporary unblock button (15 minutes) -->
          <button
            class="btn btn-primary"
            :disabled="loading"
            @click="unblockDomain(false)"
          >
            <span
              v-if="loading && !permanent"
              class="loading loading-spinner"
            ></span>
            Unblock for 15 mins
          </button>

          <!-- Permanent unblock button -->
          <button
            class="btn btn-error btn-outline"
            :disabled="loading"
            @click="unblockDomain(true)"
          >
            <span
              v-if="loading && permanent"
              class="loading loading-spinner"
            ></span>
            Unblock Permanently
          </button>
        </div>

        <!-- Status message display with appropriate styling -->
        <div
          v-if="statusMessage"
          role="alert"
          :class="['alert mt-4', statusClass]"
        >
          <!-- Success icon -->
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

          <!-- Error icon -->
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

<script
  setup
  lang="ts"
>
  import { ref, computed } from "vue"
  import type { ctrldProfile, ctrldUnblockRequest } from "~~/shared/types/ctrld"

  // Get route information for dynamic parameters
  const route = useRoute()

  // Computed properties from route parameters and query strings
  const profile = computed(() => route.params.profileName as ctrldProfile)
  const domain = computed(() => route.query.domain as string)
  const auth = computed(() => route.query.auth as string)

  // Reactive state for UI interactions
  const loading = ref(false)                    // Loading state for buttons
  const statusMessage = ref("")                 // User feedback message
  const statusClass = ref("alert-success")      // CSS class for status styling
  const permanent = ref(false)                  // Current unblock operation type

  // Validation: Ensure a domain is specified in the query
  if (!domain.value) {
    throw createError({
      statusCode: 400,
      statusMessage: "You need to specify a domain"
    })
  }

  // Validation: Ensure authentication token is provided
  if (!auth.value) {
    throw createError({
      statusCode: 401,
      statusMessage: "You need to at least TRY to authenticate"
    })
  }

  // Set up page metadata and SEO
  usePageSetup({
    title: `ControlD for ${profile.value}`,
    description: `Unblock a domain for ${profile.value}`
  })

  /**
   * Unblocks a domain for the specified ControlD profile
   * @param unblockType - Whether to unblock temporarily (15 mins) or permanently
   */
  async function unblockDomain(isPermanent: boolean) {
    // Set loading state and track current operation
    loading.value = true
    statusMessage.value = ""
    permanent.value = isPermanent

    try {
      // Make API call to unblock the domain
      const { error } = await useFetch("/api/ctrld/unblock", {
        method: "POST",
        body: {
          domain: domain.value,
          auth: auth.value,
          profile: profile.value,
          permanent: isPermanent
        } as ctrldUnblockRequest
      })

      // Handle API errors
      if (error.value) {
        throw new Error(error.value.statusMessage || "An unknown error occurred.")
      }

      // Success feedback
      statusMessage.value = `Successfully unblocked ${domain.value}.`
      statusClass.value = "alert-success"
    } catch (e: unknown) {
      // Error handling with user-friendly messages
      if (e instanceof Error) {
        statusMessage.value = `Error: ${e.message}`
      } else {
        statusMessage.value = "Error: An unknown error occurred."
      }
      statusClass.value = "alert-error"
    } finally {
      // Reset loading state regardless of outcome
      loading.value = false
    }
  }
</script>
