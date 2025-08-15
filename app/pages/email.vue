<template>
  <div
    class="min-h-screen bg-gradient-to-br from-base via-mantle to-base flex flex-col justify-center py-12 px-4 relative overflow-hidden"
  >
    <Background />
    <div class="max-w-3xl mx-auto w-full relative z-10">
      <Interface :hide-hero="true">
        <NuxtTurnstile ref="turnstile" v-model="token" />
        {{ emailAddress }}
      </Interface>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import Background from "../components/layout/Background.vue"
import Interface from "../components/layout/Interface.vue"

// you can call this template ref anything
const token = ref()
const emailAddress = ref()

emailAddress.value = "[...loading...]"

const stopWatchingToken = watch(token, async (newToken) => {
  if (!newToken) return
  try {
    const response = await $fetch("/api/util/email", {
      method: "POST",
      body: { token: newToken }
    })
    if (response.email) {
      emailAddress.value = response.email
    }
    // stop after first successful capture to avoid duplicate posts
    stopWatchingToken()
  } catch {
    void 0
  }
})
</script>

<style></style>
