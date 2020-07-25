<template>
  <v-container fluid fill-height>
    <v-row align="center" justify="center">
      <v-card color="error" justify="center" height="250" width="400">
        <v-card-title class="card-center"
          ><v-icon size="80">mdi-alert-octagram</v-icon></v-card-title
        >
        <v-card-title class="card-center">ERROR 404</v-card-title>
        <v-card-text class="card-center"
          >Esta página no existe. Para volver al inicio haz click
          <router-link to="/">aquí</router-link>.</v-card-text
        >
      </v-card>
    </v-row>
  </v-container>
</template>
<script>
export default {}
</script>
<style scoped>
.card-center {
  justify-content: center;
}
</style>
