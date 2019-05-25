<template lang="pug">
  #app
    compNavBar
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
@import './assets/style.scss';

</style>
