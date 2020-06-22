import Vue from 'vue';
import Vuex from 'vuex';

import { userModule } from "./modules/user";
import { competitionModule } from "./modules/competition";
import { teamModule } from "./modules/team";
import { rootModule } from "./modules/root";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user: userModule,
    competition: competitionModule,
    team: teamModule,
    root: rootModule
  },
});
