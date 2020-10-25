<template>
  <v-dialog v-if="show" v-model="show" width="70%" persistent>
    <v-card>
      <v-card-title>
        <span class="headline" style="word-break: keep-all"
          >Datos del jugador:</span
        >
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-row align="center" justify="center">
            <v-col cols="12" md="4" align="center" justify="center">
              <input
                type="file"
                ref="file"
                @change="onFileChanged"
                style="display: none"
              />
              <v-avatar
                v-if="!image"
                size="100px"
                class="uploadPhoto"
                @click="launchFilePicker"
                style="cursor: pointer"
              >
                <v-icon>add_a_photo</v-icon>
              </v-avatar>
              <v-img
                v-else
                style="cursor: pointer"
                height="100px"
                :src="image"
                @click="launchFilePicker"
                @error="image = constants.DEFAULT_PLAYER_URL"
                contain
              />
            </v-col>
            <v-col cols="12" md="8">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nombre y apellidos"
                    v-model="name"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="6" md="6">
                  <v-select
                    :items="positions"
                    label="Posicion"
                    v-model="position"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="6" md="6">
                  <v-select
                    :items="years"
                    label="Año de nacimiento"
                    v-model="year"
                    required
                  ></v-select>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="primary"
          @click.native="player ? editPlayer() : createPlayer()"
          >Continue</v-btn
        >
        <v-btn text @click.native="close()">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapActions } from 'vuex'
import constants from '../../assets/constants/constants'

export default {
  props: {
    show: Boolean,
    player: Object
  },
  data() {
    return {
      constants: constants,
      image: this.player ? constants.ADDRESS + this.player.avatar : null,
      file: null,
      name: this.player ? this.player.name : '',
      position: this.player ? this.player.position : '',
      year: this.player ? this.player.year : '',
      positions: ['PT', 'LD', 'LI', 'CT', 'MCD', 'MC', 'MP', 'ED', 'EI', 'DC'],
      years: [2007, 2008, 2009, 2011, 2012, 2013, 2014]
    }
  },
  methods: {
    launchFilePicker() {
      this.$refs.file.click()
    },
    onFileChanged(event) {
      this.image = URL.createObjectURL(event.target.files[0])
      this.file = event.target.files[0]
    },
    async createPlayer() {
      if (this.file != null) {
        const fd = new FormData()
        fd.append('image', this.file, this.file.name)
        console.log(fd)
        try {
          const response = await this.uploadImage(fd)
          let player = {
            name: this.name,
            position: this.position,
            year: this.year,
            team: this.$route.params.id,
            guest: false
          }
          if (response.status == 200) {
            player.avatar = response.data
          }
          this.addPlayer(player).then((response) => {
            if (response.status === 200) {
              this.$emit('confirm')
            }
          })
        } catch (err) {
          console.log(err)
        }
      } else {
        let player = {
          name: this.name,
          position: this.position,
          year: this.year,
          team: this.$route.params.id,
          guest: false
        }
        this.addPlayer(player).then((response) => {
          if (response.status === 200) {
            this.$emit('confirm')
          }
        })
      }
    },
    editPlayer() {
      let player = {
        id: this.player.id,
        name: this.name,
        position: this.position,
        year: this.year,
        team: this.$route.params.id
      }
      this.updatePlayer(player).then(() => {
        this.$emit('confirm')
      })
    },
    close() {
      this.$emit('close')
    },
    ...mapActions('team', ['addPlayer', 'updatePlayer', 'uploadImage'])
  }
}
</script>
<style scoped></style>
