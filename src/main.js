import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueResource);
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
