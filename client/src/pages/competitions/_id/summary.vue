<template>
  <v-container fluid grid-list-md>
    <v-row v-if="competition.teams.length == 0">
      <v-card class="no-teams">
        <v-card-text class="text-center">No hay equipos en la competición.</v-card-text>
      </v-card>
    </v-row>
    <v-row dense>
      <v-col xs="6"
        sm="4"
        md="3"
        lg="2"
        xl="1"
        v-for="team in competition.teams" :key="team.id">
        <v-card class="teamCard d-flex flex-column" min-height="100%" @click.native.stop="goTo(team.id)">
          <v-col>
            <v-img 
              justify="center"
              :src="constants.ADDRESS+team.avatar"
              @error="team.avatar=constants.DEFAULT_TEAM_URL"
              aspect-ratio="2"
              contain
            ></v-img>
          </v-col>
          <v-card-text class="title-card text-center grow">
            <b>{{team.name}}</b>
          </v-card-text>
          <v-card-text class="text-center" height="100%" >
            <!-- Nº de jugadores: {{team.players.length}}   -->
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions >
            <v-spacer></v-spacer>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn text icon color="blue lighten-2" @click.stop="updatingTeam=team, dialog=true" v-on="on">
                  <v-icon size="18">edit</v-icon>
                </v-btn>
              </template>
              <span>Editar equipo</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
              <v-btn text icon color="red lighten-2" v-on="on" @click.stop="deletingTeam=team.id ,deleteDialog=true">
                <v-icon size="18">delete</v-icon>
              </v-btn>
              </template>
              <span>Borrar equipo</span>
            </v-tooltip>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-speed-dial
      v-model="fab"
      bottom
      right
      direction="top"
      transition="slide-y-reverse-transition"
      fixed
    >
      <template v-slot:activator>
        <v-btn
          v-model="fab"
          fab
          color="accent"
          dark
        >
          <v-icon v-if="fab">mdi-close</v-icon>
          <v-icon v-else>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="green"
            @click.stop="dialog=!dialog"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </template>
        <span>Añadir equipo a competición</span>
      </v-tooltip>
      <v-tooltip left>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            fab
            dark
            small
            color="indigo"
            @click.stop="addOwnTeam=!addOwnTeam"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
        <span>Añadir equipo propio</span>
      </v-tooltip>
    </v-speed-dial>
    <v-dialog v-model="addOwnTeam" persistent max-width=50%>
      <v-card>
        <v-card-title class="headline">Selecciona el equipo que quieres añadir</v-card-title>
        <v-card-text>
          <v-select :items="myTeams" item-text="name" return-object v-model="team" label="Seleccionar Equipo"></v-select>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text  @click="addOwnTeam = false">Cancelar</v-btn>
          <v-btn color="primary" @click="addMyTeam()">Añadir</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <CreateTeam v-if="dialog" :team="(updatingTeam ? updatingTeam : null)" :show="dialog" @confirm="confirm" @close="dialog=!dialog, updatingTeam=null"></CreateTeam>
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
import { mapActions, mapGetters } from 'vuex'
import constants from '../../../assets/constants/constants'
import CreateTeam from '../../../components/modals/CreateTeam'
import DeleteDialog from '../../../components/modals/DeleteDialog'
  export default {
    components: {
      CreateTeam,
      DeleteDialog
    },
    data: () => ({
      fab:false,
      constants: constants,
      dialog: false,
      deleteDialog: false,
      updatingTeam: null,
      deletingTeam: null,
      addOwnTeam: false,
      team: ""
    }),
    methods: {
      goTo(teamId) {
        this.$router.push('/teams/'+teamId+'/global')
      },
      confirm(){
        this.dialog = false
        if (this.updatingTeam) {
          this.getCompetition(this.competition.id)
        }
      },
      deleteTeamFunction() {
        this.deleteTeam(this.deletingTeam).then((response) =>{  
          this.getCompetition(this.competition.id)        
          this.deleteDialog = false
        })
        .catch((err) => {   
          this.deleteDialog = false         
          let snackbar = {
            show: true,
            color: "error",
            text: err.data.message
          };
          this.$store.commit("root/SNACKBAR", snackbar);
        })
      },
      addMyTeam(){
        this.team.competition = Number(this.$route.params.id)
        let body = {
          team: {competition: this.team.competition}
        }
        let data = {
          body: body,
          id: this.team.id
        }
        this.updateTeam(data).then((response) => {
          if(response.status === 200) {
            this.addOwnTeam = false
          }
        }).catch((err)=>{
          console.log(err)
        })
      },
      ...mapActions({
        getCompetition:'competition/getCompetition',
        deleteTeam:'team/deleteTeam',
        updateTeam:'team/updateTeam'
      })
    },
    computed: {
      ...mapGetters({
        competition: 'competition/competition',
        myTeams: 'team/myTeams',
      })
    }
  }
</script>
<style scoped>
.no-teams {
  width: 100%;
}
.teamCard{
  cursor: pointer;
}
.title-card{
  font-size: 15px;
}
</style>

