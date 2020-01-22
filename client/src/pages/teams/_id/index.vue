<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <v-layout align-center>
          <v-flex xs1>
            <v-img v-if="team.avatar" :src="constants.ADDRESS+team.avatar" @error="team.avatar=constants.DEFAULT_TEAM_URL" alt="avatar" :contain="true" height="40" width="40">
          </v-flex>
          <v-flex>  
            {{team.name}}
          </v-flex>
        </v-layout>
      </v-card-title>
      <v-data-table
        v-if="team"
        :headers="headers"
        :items="team.players"
        class="elevation-1 text-xs-center"
        hide-default-footer
        :items-per-page="-1"
      >
        <template v-slot:item.avatar="{ item }">
          <v-row class="text-center">
            <v-img :src="constants.ADDRESS+item.avatar" @error="item.avatar=constants.DEFAULT_PLAYER_URL" alt="avatar" :contain="true" height="40" width="40">
          </v-row>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="info" @click="editingPlayer=item, dialog=true" v-on="on">
                <v-icon size="18">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar jugador</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
            <v-btn text icon color="error" v-on="on" @click="deletingPlayer=item.id ,deleteDialog=true">
              <v-icon size="18">delete</v-icon>
            </v-btn>
            </template>
            <span>Borrar jugador</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-col>
            <v-alert :value="true" type="error" icon="warning">
              No hay jugadores en este equipo :(
            </v-alert>
          </v-col>
        </template>
      </v-data-table>
    </v-card>
    <v-tooltip left>
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="accent"
          dark
          bottom
          right
          fixed
          @click.stop="dialog=!dialog"
          v-on="on"
        >
          <i class="material-icons">add</i>
        </v-btn>
        </template>
      <span>Añadir jugador</span>
    </v-tooltip>
    <CreatePlayer v-if="dialog" :player="(editingPlayer ? editingPlayer : null)" :show="dialog" @confirm="createPlayer" @close="dialog=!dialog, editingPlayer=null"></CreatePlayer>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="player"
      @close="deleteDialog=!deleteDialog, deletingPlayer=null"
      @delete="deletePlayerFunction"
    ></DeleteDialog>
  </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import CreatePlayer from '../../../components/modals/CreatePlayer'
import DeleteDialog from '../../../components/modals/DeleteDialog'
import constants from '../../../assets/constants/constants'
  export default {
    name: "team",
    components: {
      CreatePlayer,
      DeleteDialog
    },
    data: () => ({
      deletingPlayer: null,
      editingPlayer: null,
      deleteDialog: false,
      constants: constants,
      dialog: false,
      headers: [
        { text: '', align: 'center', sortable: false, value: 'avatar' },
        { text: 'Nombre', align: 'center', sortable: true, value: 'name' },
        { text: 'Posición', value: 'position', align: 'center', },
        { text: 'Año de nacimiento', value: 'year', align: 'center', },
        { text: 'Acciones', value: 'actions', align: 'center', }
      ],
    }),
    methods: {
      createPlayer(){
        this.dialog = false
      },
      async deletePlayerFunction(){
        await this.deletePlayer(this.deletingPlayer)
        this.deleteDialog = false
      },
      ...mapActions({
        getTeam: 'team/getTeam',
        deletePlayer: 'team/deletePlayer'
      })
    },
    computed: {
      ...mapGetters("team",[
        'team',
        'teamPlayers'
      ])
    },
    async created() {
      await this.getTeam(this.$route.params.id)
    }
  }
</script>
<style scoped>
</style>
