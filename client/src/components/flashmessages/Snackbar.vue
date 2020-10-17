<template>
  <v-snackbar v-model="show" :bottom="true" :left="true" :color="color">
    {{ text }}
    <template v-slot:action>
      <v-btn color="black" text @click="close"> Close </v-btn>
    </template>
  </v-snackbar>
</template>
<script>
export default {
  props: {
    show: Boolean,
    text: String,
    color: String
  },
  methods: {
    close() {
      this.$store.commit('root/SNACKBAR_OFF')
    }
  }
}
</script>
<style scoped></style>
