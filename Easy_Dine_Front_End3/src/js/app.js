import './firebase'

// Import Vue
import Vue from 'vue';

// Import Framework7
import Framework7 from 'framework7/framework7-lite.esm.bundle.js';

// Import Framework7-Vue Plugin
import Framework7Vue from 'framework7-vue/framework7-vue.esm.bundle.js';

// Import Framework7 Styles
import 'framework7/css/framework7.bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.css';

// Import App Component
import App from '../components/app.vue';

import {firestorePlugin} from 'vuefire'

import vueComponentDispatchEvent from 'framework7-vue/runtime-helpers/vue-component-dispatch-event';


// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

document.addEventListener('deviceready', function () {
  alert('deviceready')
}, false)

//Vue.prototype.$db=firebase.firestore();
//Vue.prototype.$axios = axios;
Vue.use(firestorePlugin);

// Your web app's Firebase configuration

// Initialize Firebase

//firebase.analytics();

// Init App
new Vue({
  el: '#app',
  render: (h) => h(App),

  // Register App Component
  components: {
    app: App
  },
});
