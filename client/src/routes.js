import Vue from 'vue';
import login from './pages/login.vue';
import register from './pages/register.vue';
import index from './pages/index.vue';
import error404 from './pages/error/404.vue';
import error500 from './pages/error/500.vue';
import teams from './pages/teams/index.vue';
import team from './pages/teams/_id/index.vue';
import competitionList from './pages/competitions/index.vue';
import competitionBase from './pages/competitions/_id/index.vue';
import summary from './pages/competitions/_id/summary.vue';
import results from './pages/competitions/_id/results.vue';
import match from './pages/match/_id.vue';
import classification from './pages/competitions/_id/classification.vue';
import competitionStats from './pages/teams/_id/competitionstats.vue';
import planification from './pages/planification/index.vue';

import VueRouter from 'vue-router';
import axios from 'axios';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false, onceLogged: true, layout: 'empty' }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { requiresAuth: false, onceLogged: true, layout: 'empty' }
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/teams',
      name: 'teams',
      component: teams,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/teams/:id?',
      name: 'teams-id',
      component: team,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/teams/:id?/competitionstats',
      name: 'competitionStats',
      component: competitionStats,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/competitions',
      name: 'competitions',
      component: competitionList,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/competitions/:id',
      name: "competition-id",
      component: competitionBase,
      meta: { requiresAuth: true, layout: 'default' },
      children: [
        {
          path: 'summary',
          name: 'summary',
          component: summary,
          meta: { requiresAuth: true, layout: 'default' }
        },
        {
          path: 'results',
          name: 'results',
          component: results,
          meta: { requiresAuth: true, layout: 'default' },
        },
        {
          path: 'rankings',
          name: 'classification',
          component: classification,
          meta: { requiresAuth: true, layout: 'default' }
        },
      ]
    },
    {
      path: '/competitions/:id/match/:matchId',
      name: 'match-id',
      component: match,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/planification',
      name: 'planification',
      component: planification,
      meta: { requiresAuth: true, layout: 'default' }
    },
    {
      path: '/500',
      name: 'error500',
      component: error500,
      meta: { requiresAuth: false, layout: "empty" }
    },
    {
      path: '*',
      name: 'error',
      component: error404,
      meta: { requiresAuth: false, layout: "empty" }
    },
  ]
});
/**
 * Function to check some things before redirect to a page
 *
 */
router.beforeEach((to, from, next) => {
  // method to check if user needs to be logged to access a page
  if(to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if(!authUser) {
      next({name:'login'});
    }
    else {
      isAuth();
      next();
    }
  }
  // method to not allow a user to go to certain pages once logged
  else if (to.meta.onceLogged) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'));
    if(authUser) {
      next({name:'index'});
    }
    else {
      next();
    }
  }
  else {
    next();
  }
});
function isAuth() {
  axios.post('private', null)
  .then(response => {
    if(response.status === 200) {
      // console.log("Autorizado")
    }
  })
  .catch(error => {
    console.log(error);
    if (error.response.status === 403) {
      console.log("No estás autorizado");
    }
    else if (error.response.status === 401) {
      console.log("No estás autorizado");
    }
    else if (error.response.status === 500) {
      console.log("No estás autorizado");
    }
    window.localStorage.removeItem('authUser');
    router.push({ path: "/" });
  });
}
export default router;
