import TurbolinksAdapter from 'vue-turbolinks';
import Vue from 'vue/dist/vue.esm'
import App from '../widgets/VueDictionary/app.vue';

Vue.use(TurbolinksAdapter);

document.addEventListener('turbolinks:load', () => {
  const app = new Vue({
    el: '#vue-dictionary',
    template: '<App />',
    components: { App }
  })
})
