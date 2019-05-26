<template lang="pug">
  header.header
    .container
      .header-wrapper
        router-link(to="/").header__logo: img(:src="logo" alt="Логотип")
        nav.nav
          ul.menu 
            li.menu__item(v-for="(link,i) in links" :key="i")
              router-link(:to="link.url" tag="md-button" exact-active-class="md-raised md-accent").menu__link {{ link.title }}
            
</template>

<script>
import LogoIcon from '@/assets/images/logo.png'; 

  export default {
    name: 'navbar',
    data() {
      return {
        logo: LogoIcon,
        links:[
          {title: "Главная",url: '/'},
          {title: "Регистрация", url: "/registration"},
          {title: "Войти",url: "/login"},
          {title: "Таблица Пользователей", url: "/users"}
        ]
      }
    },
  }
</script>

<style lang="scss" scopped>
.header{
}
.header-wrapper{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
.menu{
  display: flex;
  &__item{
    margin-right: 30px;
    
  }
  &__item:last-child{
    margin-right: 0;
  }
  
}


</style>