<template>
  <v-avatar left class="primary white--text" size="34">
    {{ initials }}
  </v-avatar>
</template>

<script>
export default {
  props: {
    firstname: {
      required: true
    },
    lastname: {
      required: true
    }
  },
  computed: {
    initials() {
      let initials = ''
      let nameParts = [this.firstname, this.lastname]
      for (const namePart of nameParts) {
        initials += namePart.charAt(0).toUpperCase()
      }
      console.log(initials)
      return initials
    }
  }
}
</script>

<style></style>
