import Vue from 'vue'
import App from './App.vue'
import router from './router';

// подключаем дизайн для нашего приложения
import { MdButton, MdCard, MdField,MdProgress,MdSnackbar} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// подключаем доп библиотеки
import Vuelidate from 'vuelidate';


Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdProgress);
Vue.use(MdField);
Vue.use(MdSnackbar);
Vue.use(Vuelidate);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
