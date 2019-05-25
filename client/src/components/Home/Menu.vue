<template lang="pug">
  section.menu
    .container
      h2.menu__title Тут вы можете увидеть примеры наших пицц
      carousel.slider(
        :autoplay="true"
        :perPage="1"
        :autoplayHoverPause="true"
        :autoplayTimeout="5000"
        :loop="true"
      )
        slide.slide(v-for="slide in slides" :key="slide.id")
          img.slide__img(:src="slide.urlBg")
          h3.slide__title {{slide.title}}
      .menu__info
        h2.menu__title Зарегестрируйся прямо сейчас
        router-link.menu__btn(to="/registration" tag="md-button" class="md-raised") Зарегестрироваться


</template>

<script>
import SlideBg1 from '@/assets/images/slide-1.jpg';
import SlideBg2 from '@/assets/images/slide-2.jpg';
import SlideBg3 from '@/assets/images/slide-3.jpg';

import { Carousel, Slide } from 'vue-carousel';
  export default {
    data() {
      return {
       slides: [
         {id: 1,urlBg: SlideBg1,title: "Пицца Маргарита"},
         {id: 2,urlBg: SlideBg2,title: "Пицца Дьябола"},
         {id: 3,urlBg: SlideBg3,title: "Пицца Четыре сыра"},
       ]
      }
    },
    components: {
      Carousel,
      Slide
    }
  }
</script>

<style lang="scss" scoped>

.menu{
  padding: 50px 0;
  background-color: #f20434;
  &__title{
    color: #fff;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
  }
  &__btn{
  }
  &__info{
    text-align: center;
  }
}

.slider{
  width: 500px;
  margin: 0 auto;
  margin-bottom: 20px;
}
.slide{
  &__title{
    text-align: center;
    color: #fff;
    font-size: 24px;
    margin: 10px 0;
  }
}
</style>