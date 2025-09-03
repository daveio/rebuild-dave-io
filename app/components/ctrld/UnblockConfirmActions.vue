<template>
  <div>
    <div class="card-actions justify-end mt-4 space-x-2">
      <button class="btn btn-primary" :disabled="isSubmitting" @click="handleTempUnblock">
        <span v-if="isSubmitting && !isSubmittingPermanent" class="loading loading-spinner"></span>
        Unblock for 15 mins
      </button>

      <button class="btn btn-error btn-outline" :disabled="isSubmitting" @click="openModal">Unblock Permanently</button>
    </div>

    <dialog :open="modalOpen" class="modal" @close="closeModal">
      <div class="modal-box max-w-xl">
        <h3 class="font-bold text-lg">Confirm Permanent Unblock</h3>
        <p class="py-2">Think before you click! Is this block protecting you?</p>
        <p class="text-sm opacity-70">
          Permanent unblocking will disable protections for this domain on your profile FOREVER. Dave can remove the
          override, but <strong>you can't</strong>.
        </p>

        <div class="modal-action">
          <button class="btn btn-primary" :disabled="isSubmitting" autofocus @click="handleTempUnblock">
            <span v-if="isSubmitting && !isSubmittingPermanent" class="loading loading-spinner"></span>
            Unblock for 15 mins (default)
          </button>

          <button class="btn btn-error" :disabled="countdown > 0 || isSubmitting" @click="confirmPermanent">
            <span v-if="isSubmitting && isSubmittingPermanent" class="loading loading-spinner"></span>
            <span v-else>
              Unblock Permanently<span v-if="countdown > 0"> ({{ countdown }})</span>
            </span>
          </button>

          <button class="btn" :disabled="isSubmitting" @click="closeModal">Cancel</button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>

    <!-- Success Modal with Senior-Friendly Instructions -->
    <dialog :open="showSuccessModal" class="modal">
      <div class="modal-box max-w-2xl">
        <!-- Large, clear heading -->
        <h2 class="font-bold text-2xl text-green mb-4">✅ Website Unblocked Successfully!</h2>

        <div class="divider"></div>

        <!-- Clear status message with large text -->
        <div class="alert alert-success text-lg mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-8 w-8"
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
          <div>
            <p class="font-semibold">
              The website <strong class="text-xl">{{ props.domain }}</strong> is now unblocked
              {{ permanentUnblock ? "forever" : "for the next 15 minutes" }}.
            </p>
          </div>
        </div>

        <!-- Important notice with warning color -->
        <div class="alert alert-warning mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current shrink-0 h-8 w-8"
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
          <div>
            <p class="text-lg font-bold">⚠️ IMPORTANT: You must restart your browser!</p>
          </div>
        </div>

        <!-- Step-by-step instructions with large text and spacing -->
        <div class="bg-base-200 rounded-lg p-6 mb-6">
          <h3 class="text-xl font-bold mb-4">Follow these steps to see the website:</h3>

          <div class="space-y-4">
            <!-- Step 1 -->
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg text-xl font-bold">1</div>
              <div>
                <p class="text-lg font-semibold">Completely CLOSE your browser</p>
                <p class="text-base opacity-80 mt-1">
                  • On Windows: Click the X button or press Alt+F4<br />
                  • On Mac: Click the red circle or press Cmd+Q<br />
                  • Make sure ALL browser windows are closed
                </p>
              </div>
            </div>

            <!-- Step 2 -->
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg text-xl font-bold">2</div>
              <div>
                <p class="text-lg font-semibold">OPEN your browser again</p>
                <p class="text-base opacity-80 mt-1">
                  Click on your browser icon (Chrome, Safari, Firefox, or Edge) to start it fresh
                </p>
              </div>
            </div>

            <!-- Step 3 -->
            <div class="flex items-start gap-4">
              <div class="badge badge-primary badge-lg text-xl font-bold">3</div>
              <div>
                <p class="text-lg font-semibold">Go to the website</p>
                <p class="text-base opacity-80 mt-1">Type the website address or click your bookmark</p>
              </div>
            </div>

            <!-- Step 4 (if needed) -->
            <div class="flex items-start gap-4">
              <div class="badge badge-secondary badge-lg text-xl font-bold">4</div>
              <div>
                <p class="text-lg font-semibold">Still blocked? Refresh the page</p>
                <p class="text-base opacity-80 mt-1">
                  • On Windows: Press Ctrl+F5<br />
                  • On Mac: Press Cmd+Shift+R<br />
                  • Or click the refresh button (circular arrow) in your browser
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Simple reminder -->
        <div class="alert alert-info text-base">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="stroke-current shrink-0 h-6 w-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span> <strong>Remember:</strong> You MUST close and restart your browser for this to work! </span>
        </div>

        <!-- Large, clear action button -->
        <div class="modal-action">
          <button class="btn btn-primary btn-lg text-lg px-8" @click="closeSuccessModal">
            I Understand - Close This Message
          </button>
        </div>
      </div>

      <!-- Modal backdrop -->
      <form method="dialog" class="modal-backdrop bg-black/50">
        <button @click="closeSuccessModal">close</button>
      </form>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue"
import type { ctrldProfile, ctrldUnblockRequest } from "~~/shared/types/ctrld"

const props = defineProps<{
  domain: string
  auth: string
  profile: ctrldProfile
}>()

const emit = defineEmits<{
  (e: "success" | "error", message: string): void
}>()

const isSubmitting = ref(false)
const isSubmittingPermanent = ref(false)
const modalOpen = ref(false)
const countdown = ref(15)
const showSuccessModal = ref(false)
const permanentUnblock = ref(false)
const successMessage = ref("")
let timer: number | undefined

function openModal() {
  modalOpen.value = true
  countdown.value = 15
  startCountdown()
}

function closeModal() {
  modalOpen.value = false
  stopCountdown()
}

function startCountdown() {
  stopCountdown()
  timer = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    } else {
      stopCountdown()
    }
  }, 1000)
}

function stopCountdown() {
  if (timer) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function openSuccessModal(isPermanent: boolean) {
  permanentUnblock.value = isPermanent
  showSuccessModal.value = true
}

function closeSuccessModal() {
  showSuccessModal.value = false
  emit("success", successMessage.value)
}

async function performUnblock(permanent: boolean) {
  try {
    isSubmitting.value = true
    isSubmittingPermanent.value = permanent

    const { error } = await useFetch("/api/ctrld/unblock", {
      method: "POST",
      body: {
        domain: props.domain,
        auth: props.auth,
        profile: props.profile,
        permanent
      } as ctrldUnblockRequest
    })

    if (error.value) {
      throw new Error(error.value.statusMessage || "An unknown error occurred.")
    }

    // Store the success message for later emission
    successMessage.value = `Successfully unblocked ${props.domain}${permanent ? " permanently" : " for 15 minutes"}.`

    // Close the permanent confirmation modal if it's open
    if (modalOpen.value) {
      closeModal()
    }

    // Show the success modal with instructions
    openSuccessModal(permanent)
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : "An unknown error occurred."
    emit("error", `Error: ${message}`)
  } finally {
    isSubmitting.value = false
    isSubmittingPermanent.value = false
  }
}

async function handleTempUnblock() {
  await performUnblock(false)
}

async function confirmPermanent() {
  if (countdown.value > 0) return
  await performUnblock(true)
}

onBeforeUnmount(() => {
  stopCountdown()
})
</script>

<style scoped>
/* Using DaisyUI modal styles; no custom positioning to avoid conflicts */
</style>
