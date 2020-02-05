<template>
  <v-container fluid>
    <p v-if="this.myTeams.length == 0">Aún no tienes equipos. Dale al botón para crear uno</p>
    <v-list v-else>
      <v-list-item
        v-for="team in this.myTeams"
        :key="team.id"
        @click.stop="goTo(team.id)"
      >
        <v-list-item-avatar>
          <v-img :src="constants.ADDRESS+team.avatar" @error="team.avatar=constants.DEFAULT_TEAM_URL" :contain="true">
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{team.name}}</v-list-item-title>
        </v-list-item-content>   
        <v-list-item-action>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn text icon color="info" @click.stop="updatingTeam=team, dialog=true" v-on="on">
                <v-icon size="18">edit</v-icon>
              </v-btn>
            </template>
            <span>Editar equipo</span>
          </v-tooltip>
        </v-list-item-action>
        <v-list-item-action>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
            <v-btn text icon color="error" v-on="on" @click.stop="deletingTeam=team.id ,deleteDialog=true">
              <v-icon size="18">delete</v-icon>
            </v-btn>
            </template>
            <span>Borrar equipo</span>
          </v-tooltip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
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
      <span>Añadir equipo</span>
    </v-tooltip>
    <CreateTeam v-if="dialog" :myTeam="true" :team="(updatingTeam ? updatingTeam : null)" :show="dialog" @confirm="confirmCreate" @close="dialog=!dialog, updatingTeam=null"></CreateTeam>
    <DeleteDialog
      v-if="deleteDialog"
      :show="deleteDialog"
      type="team"
      @close="deleteDialog=!deleteDialog, deletingTeam=null"
      @delete="deleteTeamFunction"
    ></DeleteDialog>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CreateTeam from '../../components/modals/CreateTeam'
import DeleteDialog from '../../components/modals/DeleteDialog'
import constants from '../../assets/constants/constants'
  export default {
    components: {
      CreateTeam,
      DeleteDialog
    },
    data: () => ({
      constants: constants,
      dialog: false,
      deleteDialog: false,
      updatingTeam: null,
      deletingTeam: null
    }),
    methods: {
      goTo(id) {        
        this.$router.push({
          name: "teams-id",
          params: {
            id: id
          }
        })
      },
      confirmCreate() {
        this.dialog = false
        if (this.updatingTeam) {
          this.getUserTeams(this.user.id)
        }
      },
      deleteTeamFunction() {
        this.deleteTeam(this.deletingTeam).then((response) =>{          
          this.deleteDialog = false
        })
        .catch((err) => {   
          this.deleteDialog = false         
        })
      },
      ...mapActions("team",[
        'getUserTeams',
        'deleteTeam'
      ])
    },
    computed:{
      ...mapGetters({
        myTeams: 'team/myTeams',
        user: 'user/user',
        competitions: 'competition/competitions'
      })
    },
    created() {
      //do something after creating vue instance
      this.getUserTeams(this.user.id)
    }
  }
</script>
<style scoped>
.uploadPhoto {
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 209, 89, 0.44);
  cursor: pointer;
}
</style>