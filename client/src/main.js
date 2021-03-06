import Vue from 'vue'
import App from './App.vue'
import router from './router';

// подключаем дизайн для нашего приложения
import { MdButton, MdCard, MdField,MdProgress,MdTable,MdContent,MdRipple} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

// подключаем доп библиотеки
import Vuelidate from 'vuelidate';
import Notifications from 'vue-notification'


Vue.use(MdButton);
Vue.use(MdCard);
Vue.use(MdProgress);
Vue.use(MdField);
Vue.use(MdTable);
Vue.use(MdContent);
Vue.use(MdRipple);
Vue.use(Vuelidate);
Vue.use(Notifications);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
