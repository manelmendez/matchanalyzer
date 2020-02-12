<template>
  <v-dialog v-model="show" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">Añadir Sustitución</v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col>
            <v-select 
              dense
              outlined
              shaped  
              v-model="playerOut"
              :items="players"
              item-text="player.name"
              return-object
              label="Sale"></v-select>
          </v-col>
          <v-col>
            <v-select 
              dense
              outlined
              shaped  
              v-model="playerIn"
              :items="players"
              item-text="player.name"
              return-object
              label="Entra"></v-select>
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
      playerIn: null,
      playerOut: null,
      minute: null
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    add() {      
      this.$emit('confirm', {'playerIn':this.playerIn['player'], 'playerOut':this.playerOut['player'], 'minute':this.minute})
    }
  }
}
</script>

<style scoped>

</style>