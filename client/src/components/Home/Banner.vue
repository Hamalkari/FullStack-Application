<template lang="pug">
  section.banner
    .container
      h1.banner__title Привествуем вас на нашем сайте о пиццерии
      .banner__video
        iframe(width="560" height="315" src="https://www.youtube.com/embed/5N06nI2C3hw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen)
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>
.banner{
  padding: 50px 0;
  background: url('../../assets/images/banner-bg.jpg') no-repeat center;
  &__title{
    text-align: center;
    color: #fff;
    margin-bottom: 20px;
    font-size: 40px;
    font-family: "Roboto";  
  }

  &__video{
     position: relative;
    padding-bottom: 50%;
    iframe{
      position: absolute;
      width: calc(100% - 120px);
      height: calc(100% - 120px*3/4);
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
    }
  }
}

</style>