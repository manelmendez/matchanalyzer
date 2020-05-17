import Vue from 'vue'
import Vuetify from 'vuetify'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

import router from './routes'
import App from './App.vue'
import store from './store/store'
import axiosConfig from './assets/axios'

import 'vuetify/dist/vuetify.min.css'
import green from './assets/themes/green'
import red from './assets/themes/red'
import teal from './assets/themes/teal'
import indigo from './assets/themes/indigo'
import lightBlue from './assets/themes/light-blue'
import deepPurple from './assets/themes/deep-purple'

Vue.use(Vuetify)
Vue.use(GSignInButton)
Vue.use(FBSignInButton)

Vue.prototype.$axios = axiosConfig

let themeApp = green
if (window.localStorage.getItem('theme')!= null) {
  const storeTheme = window.localStorage.getItem('theme')
  themeApp= storeTheme=='red'? red : storeTheme=='green'? green : 
    storeTheme=='lightBlue'? lightBlue : storeTheme=='indigo'? indigo :
    storeTheme=='teal'? teal : storeTheme=='deepPurple'? deepPurple : green
}
let darkMode = true
if (window.localStorage.getItem('dark')!= null) {
  const storeDark = window.localStorage.getItem('dark')
  darkMode = JSON.parse(storeDark)
}

new Vue({
  el: '#app',
  router,
  store,
  vuetify: new Vuetify({
    theme: {
      dark: darkMode,
      themes: {
        dark: themeApp,
        light: themeApp
      },
      options: {
        customProperties: true,
      },
    }
  }),
  beforeCreate() {
    //do something before creating vue instance    
    this.$store.dispatch('user/initializeStore')    
  },
  render: (h) => h(App)
})

/**/
// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '208299039767458',
//       cookie     : true,  // enable cookies to allow the server to access the session
//       xfbml      : true,  // parse social plugins on this page
//       version    : 'v2.8' // use graph api version 2.8
//     });
//   };
//   (function(d, s, id) {
//     var js, fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s); js.id = id;
//     js.src = "//connect.facebook.net/en_US/sdk.js";
//     fjs.parentNode.insertBefore(js, fjs);
//   }(document, 'script', 'facebook-jssdk'));
/**/
