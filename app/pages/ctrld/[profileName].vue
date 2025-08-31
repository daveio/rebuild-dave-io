<template>
  <div>
    <p>This is the UI for {{ profileName }}.</p>
  </div>
</template>

<script
  setup
  lang="ts"
>
  const profileName = useRoute().params.profileName || ""

  const validProfiles = ["main", "permissive", "parents"]

  if (!validProfiles.includes(profileName as string)) {
    throw createError({
      statusCode: 404,
      statusMessage: "Profile not found"
    })
  }

  usePageSetup({
    title: `ControlD for ${profileName}`,
    description: `Unblock a domain for ${profileName}`
  })

</script>
