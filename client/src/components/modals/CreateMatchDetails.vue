<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">HOLA</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-row></v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Continue</v-btn>
        <v-btn text>Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    show: Boolean
  }
}
</script>
