<template>
  <div>
    <Subtitle />
    <ProfileInfo />
    <SocialLinks />
    <ExtraLinks />
  </div>
</template>

<script
  setup
  lang="ts"
>
  import ExtraLinks from "~/components/ui/ExtraLinks.vue"
  import ProfileInfo from "~/components/ui/ProfileInfo.vue"
  import SocialLinks from "~/components/ui/SocialLinks.vue"
  import Subtitle from "~/components/ui/Subtitle.vue"

  usePageSetup({
    title: "home"
  })

  definePageMeta({
    layoutProps: {
      showHero: true,
      showCurlCommand: true,
      useMonospace: true
    }
  })

  onMounted(() => {
    // Page mounted
  })
</script>
