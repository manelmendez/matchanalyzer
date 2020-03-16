<template>
  <v-dialog v-model="show" persistent max-width="450">
    <v-card>
      <v-card-title class="headline">Añadir Tarjeta</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col>
            <v-select 
              dense
              outlined
              shaped  
              v-model="player"
              :items="players"
              item-text="name"
              return-object
              label="Jugador"></v-select>
          </v-col>
          <v-col>
            <v-select 
              dense
              outlined
              shaped  
              v-model="type"
              :items="types"
              item-text="type"
              label="Tipo"></v-select>
          </v-col>
          <v-col>
            <v-text-field dense outlined shaped label="Minuto" :max="duration" class="centered-input ml-2" type="number" v-model="minute" required></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="close">Cancelar</v-btn>
        <v-btn color="primary" :disabled="player==null || minute==null" @click="add">Añadir</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      required: true,
      default: false
    },
    players: {
      type: Array,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      player: null,
      minute: null,
      type: null,
      types: [
        'amarilla',
        'roja'
      ]
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    add() {            
      this.$emit('confirm', {'playerId':this.player.id, 'type': this.type, 'minute':this.minute})
    }
  }
}
</script>

<style scoped>

</style>