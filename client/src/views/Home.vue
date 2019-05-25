<template lang="pug">
  #home
    compBanner
    compMenu
</template>

<script>
  import compBanner from '@/components/Home/Banner';
  import compMenu from '@/components/Home/Menu';
  export default {
    components: {
      compBanner,
      compMenu
    }
  }
</script>

<style lang="scss" scoped>

</style>