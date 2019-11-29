<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline">Datos del jugador:</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12 md4>
              <v-text-field label="Nombre y apellidos" v-model="name" required></v-text-field>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="positions"
                label="Posicion"
                v-model="position"
                required
              ></v-select>
            </v-flex>
            <v-flex xs12 md4>
              <v-select
                :items="years"
                label="Año de nacimiento"
                v-model="year"
                required
              ></v-select>
            </v-flex>
          </v-layout>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" @click.native="player ? editPlayer() : createPlayer()">Continue</v-btn>
        <v-btn text @click.native="close()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'

export default {
  props:{
    show: Boolean,
    player: Object,
  },
  data() {
    return {
      name: (this.player) ? this.player.name : '',
      position: (this.player) ? this.player.position : '',
      year: (this.player) ? this.player.year : '',
      positions: [
        'PT',
        'LD',
        'LI',
        'CT',
        'MCD',
        'MC',
        'MP',
        'ED',
        'EI',
        'DC'
      ],
      years: [
        '2007',
        '2008',
        '2009',
        '2011',
        '2012',
        '2013',
        '2014',
      ],
    }
  },
  methods: {
    createPlayer() {
      let player = {
        name: this.name,
        position: this.position,
        year: this.year,
        team: this.$route.params.id,
      }
      this.addPlayer(player).then((value) => {
        this.$emit('confirm') 
      })
    },
    editPlayer() {
      let player = {
        id: this.player.id,
        name: this.name,
        position: this.position,
        year: this.year,
        team: this.$route.params.id
      }      
      this.updatePlayer(player).then((value) => {        
        this.$emit('confirm') 
      })
    },
    close() {
      this.$emit('close')
    },
    ...mapActions("team",['addPlayer', 'updatePlayer'])
  }
}
</script>
<style scoped>

</style>
