<template lang="pug">
  header.header
    .container
      .header-wrapper
        router-link(to="/").header__logo: img(:src="logo" alt="Логотип")
        nav.nav
          ul.menu 
            li.menu__item
              router-link(to="/" tag="md-button" exact-active-class="md-raised md-accent").menu__link Главная
            li.menu__item(v-if="!auth")
              router-link(to="/registration" tag="md-button" exact-active-class="md-raised md-accent").menu__link Регистрация
            li.menu__item(v-if='auth')
              md-button(@click="logout") Выйти
            li.menu__item(v-if="!auth")
              router-link(to="/login" tag="md-button" exact-active-class="md-raised md-accent").menu__link Войти
            li.menu__item
              router-link(to="/users" tag="md-button" exact-active-class="md-raised md-accent").menu__link Таблица пользователей
            
</template>

<script>
import LogoIcon from '@/assets/images/logo.png'; 
import EventBus from '@/components/EventBus';

  export default {
    name: 'navbar',
    data() {
      return {
        logo: LogoIcon,
        auth: false
      }
    },

    methods: {
      logout(){
        localStorage.removeItem('usertoken');
        EventBus.$emit('logged-in',false);
      }
    },
    mounted() {
      EventBus.$on('logged-in',status => {
        this.auth = status;
      })
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
  &__link{
    color: #000;
    text-decoration: none;
  }
}


</style>