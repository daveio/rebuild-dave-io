<template>
  <div>
    <p>This is the UI for {{ profileName }}.</p>
  </div>
</template>

<script
  setup
  lang="ts"
>
  const profileName = useRoute().params.profileName
</script>