<template>
  <div>
    <GenderFloatingChatButton />
    <GenderContent />
  </div>
</template>

<script
  setup
  lang="ts"
>
  import GenderContent from "~/components/gender/GenderContent.vue"
  import GenderFloatingChatButton from "~/components/gender/GenderFloatingChatButton.vue"

  usePageSetup({
    title: "gender",
    keywords: [
      "non-binary",
      "pronouns",
      "they/them",
      "gender identity",
      "LGBTQ+",
      "transgender",
      "enby",
      "inclusion",
      "respect",
      "gender diversity"
    ],
    description: "Understanding non-binary gender identity and they/them pronouns - a friendly educational guide"
  })

  onMounted(() => {
    // Page mounted
  })
</script>

<style scoped>
  /* Additional styling if needed */
</style>
