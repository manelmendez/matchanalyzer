<template>
  <v-dialog v-if="show" v-model="show" max-width="500" persistent>
    <v-card>
      <v-card-title class="headline" v-model="title">{{ title }}</v-card-title>
      <v-card-text>{{ text }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="close()">Atras</v-btn>
        <v-btn color="green darken-1" text @click="confirm()">Adelante</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    type: String,
    show: Boolean
  },
  data() {
    return {
      match: {
        title: 'Quieres borrar este partido?',
        text:
          'Si aceptas, el partido se borrará y se perderán todos sus datos. Quieres continuar?'
      },
      jornada: {
        title: 'Quieres borrar esta jornada?',
        text:
          'Si aceptas, la jornada se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
      },
      player: {
        title: 'Quieres borrar este jugador?',
        text:
          'Si aceptas, el jugador se borrará y se perderán todos sus datos. Quieres continuar?'
      },
      team: {
        title: 'Quieres borrar este equipo?',
        text:
          'Si aceptas, el equipo se borrará y se perderán todos sus partidos y datos estadísticos. Quieres continuar?'
      },
      competition: {
        title: 'Quieres borrar esta competición?',
        text:
          'Si aceptas, la competición se borrará y se perderán todos sus datos. Quieres continuar?'
      }
    }
  },
  computed: {
    title() {
      if (this.type == 'jornada') {
        return this.jornada.title
      } else if (this.type == 'match') {
        return this.match.title
      } else if (this.type == 'player') {
        return this.player.title
      } else if (this.type == 'team') {
        return this.team.title
      } else {
        return this.competition.title
      }
    },
    text() {
      if (this.type == 'jornada') {
        return this.jornada.text
      } else if (this.type == 'match') {
        return this.match.text
      } else if (this.type == 'player') {
        return this.player.text
      } else if (this.type == 'team') {
        return this.team.text
      } else {
        return this.competition.text
      }
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('delete')
    }
  }
}
</script>
<style scoped></style>
