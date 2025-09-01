<template>
  <div>
    <p>Domain: {{ domain }}</p>
    <p>Auth: {{ auth }}</p>
    <p>Profile: {{ profile }}</p>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const validProfiles = ["main", "permissive", "parents"]
const profile = computed(() => route.params.profileName as string)
const domain = computed(() => route.query.domain as string)
const auth = computed(() => route.query.auth as string)

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
</script>
