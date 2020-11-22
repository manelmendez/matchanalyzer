<template>
  <v-avatar left class="primary white--text" size="34">
    {{ initials }}
  </v-avatar>
</template>

<script>
export default {
  props: {
    name: {
      required: true
    }
  },
  computed: {
    initials() {
      let initials = ''
      let nameParts = this.name.split(' ')
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
