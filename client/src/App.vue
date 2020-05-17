<template>
  <v-app>
    <Default v-if="isLogged"></Default>
    <Empty v-else></Empty>
    <Snackbar v-if="snackbar.show" :show="snackbar.show" :color="snackbar.color" :text="snackbar.text"></Snackbar>
  </v-app>
</template>

<script>
import Default from './layouts/default.vue'
import Empty from './layouts/empty.vue'
import Snackbar from './components/flashmessages/Snackbar'

import { mapGetters } from 'vuex'
export default {
  name: "App",
  components: {
    Empty,
    Default,
    Snackbar
  },
  data: () => ({
    drawer: true,
  }),
  computed: {
    isLogged(){
      return this.$route.meta.layout == "default" ? true : false
    },
    ...mapGetters("root",[
      'snackbar'
    ])
  }
}

</script>

<style>
</style>
