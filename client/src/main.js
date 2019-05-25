import Vue from 'vue'
import App from './App.vue'
import router from './router';

// подключаем дизайн для нашего приложения
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// подключаем доп библиотеки
import Vuelidate from 'vuelidate';


Vue.use(MdButton);
Vue.use(MdContent);
Vue.use(MdTabs);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
