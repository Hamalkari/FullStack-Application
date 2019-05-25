<template lang="pug">
  #app
    notifications(group="auth" position="bottom center")
    compNavBar
    router-view
</template>

<script>
import compNavBar from '@/components/Navbar';

export default {
  name: 'app',
  components: {
    compNavBar
  }
}
</script>

<style lang="scss">
@import '@/assets/style.scss';

</style>
