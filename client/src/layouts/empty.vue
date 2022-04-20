<template>
  <v-app>
    <router-view :class="dark ? 'darkContent' : 'content'"></router-view>
  </v-app>
</template>
<script>
export default {
  computed: {
    dark() {
      return this.$vuetify.theme.dark
    }
  }
}
</script>
<style scoped>
.content {
  background-color: var(--v-item-lighten3);
  height: 100%;
}
.darkContent {
  background-color: var(--v-background-base);
  height: 100%;
}
</style>
