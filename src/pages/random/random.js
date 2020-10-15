import aop from '../../assets/js/aop.js'
import home from './random.vue';

new aop.Vue({
  render: h => h(home)
}).$mount('#app');
