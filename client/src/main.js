import Vue from 'vue'
import Vuetify from 'vuetify'

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