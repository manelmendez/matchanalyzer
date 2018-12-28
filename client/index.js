import Vue from 'vue'
import Vuex from 'vuex'
import Vuetify from 'vuetify'
import GSignInButton from 'vue-google-signin-button'
import FBSignInButton from 'vue-facebook-signin-button'

import constants from './assets/constants/constants'
import router from './routes/routes'
import App from './components/App.vue'
import store from './vuex/store/store'

Vue.use(Vuetify)
Vue.use(GSignInButton)
Vue.use(FBSignInButton)

// Vue.prototype.$axios = axios.create()
// Vue.prototype.$axios.defaults.baseURL = constants.LOCAL_ADDRESS
// // add token to Auth header if onceLogged
// if (JSON.parse(window.localStorage.getItem('authUser'))!= null)
// {
//   Vue.prototype.$axios.defaults.headers.common['Authorization'] = 'Bearer '+JSON.parse(window.localStorage.getItem('authUser')).token
// }

new Vue({
  el: '#app',
  router,
  store,
  beforeCreate() {
    //do something before creating vue instance
    this.$store.dispatch('initializeStore')
  },
  render: (h) => h(App)
})

/**/
window.fbAsyncInit = function() {
    FB.init({
      appId      : '208299039767458',
      cookie     : true,  // enable cookies to allow the server to access the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
  };
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
/**/