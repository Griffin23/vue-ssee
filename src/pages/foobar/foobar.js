import Vue from 'vue';
import home from './foobar.vue';

new Vue({
  render: h => h(home)
}).$mount('#app');
