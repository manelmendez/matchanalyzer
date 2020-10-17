<template>
  <v-main>
    <v-app-bar
      app
      fixed
      flat
      clipped-left
      collapse-on-scroll
      :color="dark ? '#1e1e1e' : 'primary darken-1'"
      height="50px"
    >
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="white--text"
      ></v-app-bar-nav-icon>
      <v-toolbar-title :to="'/'" class="white--text" style="cursor: pointer">
        <router-link to="/" class="toolbar-title"
          >MatchAnalyzer</router-link
        ></v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-menu
        offset-y
        :close-on-content-click="false"
        transition="slide-y-transition"
        rounded="b-xl"
        :nudge-width="140"
      >
        <template v-slot:activator="{ on }">
          <v-btn dark v-on="on" icon>
            <v-icon>mdi-palette</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-list>
            <v-list-item class="text-center justify-center">
              <v-switch
                dense
                v-model="dark"
                inset
                color="white"
                label="Dark"
              ></v-switch>
            </v-list-item>
            <v-divider></v-divider>
            <v-subheader class="justify-center">Elegir tema</v-subheader>
            <v-list-item
              v-for="(item, index) in themes"
              :key="index"
              @click="selectTheme(item)"
            >
              <v-row justify="center">
                <v-avatar :color="item.value.primary" size="36"> </v-avatar>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu offset-y id="user" :close-on-content-click="false">
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" icon dark class="mr-5">
            <v-icon>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title @click="logOut()" class="logout">{{
              item.title
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer
      clipped
      fixed
      :expand-on-hover="!checkMobile"
      v-model="drawer"
      width="200"
      :bottom="checkMobile"
      app
    >
      <v-list dense>
        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Inicio</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/teams">
          <v-list-item-action>
            <v-icon>mdi-soccer</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mis equipos</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/competitions">
          <v-list-item-action>
            <v-icon>mdi-trophy-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mis competicones</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/planification">
          <v-list-item-action>
            <v-icon>mdi-calendar-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Planificación</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <router-view :class="dark ? 'darkContent' : 'content'"></router-view>
  </v-main>
</template>
<script>
import { mapActions } from 'vuex'
import red from '../assets/themes/red'
import green from '../assets/themes/green'
import deepPurple from '../assets/themes/deep-purple'
import lightBlue from '../assets/themes/light-blue'
import indigo from '../assets/themes/indigo'
import teal from '../assets/themes/teal'
import black from '../assets/themes/black'
import constants from '../assets/constants/constants'
import store from '../store/store'

export default {
  name: 'Layout',
  data: () => ({
    constants: constants,
    drawer: null,
    items: [{ title: 'Sign Out' }],
    themes: [
      { name: 'green', value: green },
      { name: 'red', value: red },
      { name: 'lightBlue', value: lightBlue },
      { name: 'teal', value: teal },
      { name: 'deepPurple', value: deepPurple },
      { name: 'indigo', value: indigo },
      { name: 'black', value: black }
    ],
    actualTheme: window.localStorage.getItem('theme')
  }),
  methods: {
    logOut() {
      window.localStorage.removeItem('authUser')
      this.signOut()
      let snackbar = { show: true, color: 'success', text: 'Sesión cerrada' }
      this.$store.commit('root/SNACKBAR', snackbar)
      this.$router.push('/login')
    },
    ...mapActions('user', ['signOut']),
    randomTheme() {
      let randomTheme = this.themes[
        Math.floor(Math.random() * this.themes.length)
      ]
      window.localStorage.setItem('theme', randomTheme.name)
      this.actualTheme = randomTheme.name
      store.commit('root/SET_THEME', randomTheme.name)
      if (this.$vuetify.theme.dark) {
        this.$vuetify.theme.themes.dark = randomTheme.value
      } else {
        this.$vuetify.theme.themes.light = randomTheme.value
      }
    },
    selectTheme(theme) {
      window.localStorage.setItem('theme', theme.name)
      this.actualTheme = theme.name
      store.commit('root/SET_THEME', theme.name)
      this.$vuetify.theme.themes.dark = theme.value
      this.$vuetify.theme.themes.light = theme.value
    }
  },
  computed: {
    dark: {
      get() {
        return this.$vuetify.theme.dark
      },
      set() {
        window.localStorage.setItem('dark', !this.dark)
        this.$vuetify.theme.dark = !this.dark
      }
    },
    checkMobile() {
      // console.log(this.$vuetify.breakpoint.name)
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
        default:
          return false
      }
    }
  }
}
</script>
<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
.content {
  background-color: var(--v-item-lighten3);
  height: 100%;
}
.darkContent {
  background-color: var(--v-background-base);
  height: 100%;
}
.logout {
  cursor: pointer;
}
</style>
