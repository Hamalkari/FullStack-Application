import Vue from 'vue'
import VueRouter from 'vue-router'

// подключаем наши страница для маршрутизации
import Home from '@/views/Home'
import Users from '@/views/Users'
import Register from '@/views/Auth/Register'
import Login from '@/views/Auth/Login'


Vue.use(VueRouter);


export default new VueRouter({
  mode: "history",
  routes: [
    {
      name: 'home',
      path: '/',
      component: Home
    },
    {
      name: 'users',
      path: '/users',
      component: Users,
    },
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
    {
      name: 'registration',
      path: '/registration',
      component: Register,
    }
  ]
});