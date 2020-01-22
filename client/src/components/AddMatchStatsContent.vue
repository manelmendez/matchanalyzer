<template>
  <v-col v-if="team.manager==null">
    Añadir stats del equipo rival se implementará en el futuro
  </v-col>
  <v-col v-else>
    <v-row dense class="mr-5 ml-5">
      <v-col cols=9 class="text-center">
        <v-select
          outlined
          shaped
          v-model="formacion"
          :items="formacionesF7"
          item-text="name"
          item-value="name"
          label="Elegir formación">
          <template v-slot:item="{item}">
            <v-row>
              <v-col cols=2 class="text-center" align-self="center">
                {{item.name}}
              </v-col>
              <v-divider vertical></v-divider>
              <v-col>
                <v-img :src="item.image" :contain="true" aspect-ratio="4"></v-img>
              </v-col>
            </v-row>
          </template>
        </v-select>
      </v-col>
      <v-col>
        <v-text-field outlined shaped label="Duración" class="centered-input ml-2" type="number" v-model="duration" required></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mr-5 ml-5" dense>
      <v-col>
        <v-row class="text-center" justify="center" align="center" dense>
          Añadir jugadores:
          <v-btn class="ml-2" fab color="accent" x-small dark @click.stop="addplayerDialog= true">
            <v-icon class="material-icons">mdi-plus</v-icon>
            <AddPlayer v-if="addplayerDialog" :show="addplayerDialog" :players="team.players" @close="addplayerDialog=false" @confirm="addPlayer"></AddPlayer>
          </v-btn>
        </v-row>
        <v-row dense>
          <v-col cols="12"
            sm="12"
            md="4"
            lg="4"
            xl="4"
            v-for="(player,index) in players" :key="index"
            >
            <v-row dense>
              <v-col class="players-content">
                {{player["player"].name}} --- {{player["position"]}}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row dense class="text-center" justify="center" align="center">
          Añadir goles:
          <v-btn class="ml-2" fab color="accent" x-small dark @click.stop="addgoalDialog=true">
            <v-icon class="material-icons">mdi-plus</v-icon>
          </v-btn>
          <AddGoal v-if="addgoalDialog" :show="addgoalDialog" :players="players" :duration="Number(duration)" @close="addgoalDialog=false" @confirm="addGoal"></AddGoal>
        </v-row>
        <v-row dense>
          <v-col cols="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            v-for="(goal, index) in goals" :key="index"
            >
            <v-row dense>
              <v-col class="players-content">
                {{goal["player"].name}} --- min.{{goal["minute"]}}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row dense class="text-center" justify="center" align="center">
          Añadir tarjetas:
          <v-btn class="ml-2" fab color="accent" x-small dark @click.stop="addcardDialog=true">
            <v-icon class="material-icons">mdi-plus</v-icon>
          </v-btn>
          <AddCard v-if="addcardDialog" :show="addcardDialog" :players="players" :duration="Number(duration)" @close="addcardDialog=false" @confirm="addCard"></AddCard>
        </v-row>
        <v-row dense>
          <v-col cols="12"
            sm="12"
            md="6"
            lg="6"
            xl="6"
            v-for="(card, index) in cards" :key="index"
            >
            <v-row dense>
              <v-col class="players-content">
                {{card["player"].name}} --- min.{{card["minute"]}}
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row dense class="mr-5 ml-5">
      <v-col>
        <v-row class="text-center" justify="center" align="center">
          Añadir cambios:
          <v-btn class="ml-2" fab color="accent" x-small dark @click.stop="totalchanges+=1">
            <v-icon dense class="material-icons">mdi-plus</v-icon>
          </v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>
<script>
import AddPlayer from '../components/modals/AddPlayer'
import AddGoal from '../components/modals/AddGoal'
import AddCard from '../components/modals/AddCard'
import { mapGetters } from "vuex"
export default {
  props: {
    team: {
      type: Object,
      required: true
    }
  },
  components: {
    AddPlayer,
    AddGoal,
    AddCard
  },
  data(){
    return {
      formacionesF7: [
        {
          name: '3-2-1',
          image: require('/assets/images/formaciones/3-2-1.png')
        },
        {
          name: '2-3-1',
          image: require('/assets/images/formaciones/2-3-1.png')
        },
        {
          name: '3-1-2',
          image: require('/assets/images/formaciones/3-1-2.png')
        },
        {
          name: '3-3',
          image: require('/assets/images/formaciones/3-3.png')
        },
        {
          name: '4-2',
          image: require('/assets/images/formaciones/4-2.png')
        },

      ],
      formacion: '',
      players: [],
      goals: [],
      cards: [],
      duration: null,
      addplayerDialog: false,
      addgoalDialog: false,
      addcardDialog: false
    }
  },
  methods: {
    close() {
      this.$emit('close')
    },
    addPlayer(data) {      
      this.players.push(data)
      this.addplayerDialog = false
    },
    addGoal(data) {      
      this.goals.push(data)
      this.addgoalDialog = false
    },
    addCard(data) {      
      this.cards.push(data)
      this.addcardDialog = false
    }
  },
  computed: {
    ...mapGetters("competition", ["competition"])
  }
}
</script>
<style scoped>
.players-content{
  font-size: 14px;
  font-weight: lighter;
}
</style>