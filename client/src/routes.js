const login = () => import(/* webpackChunkName: "Login" */ './pages/login.vue')
const register = () =>
  import(/* webpackChunkName: "Register" */ './pages/register.vue')
const index = () => import(/* webpackChunkName: "Index" */ './pages/index.vue')
const error404 = () =>
  import(/* webpackChunkName: "404" */ './pages/error/404.vue')
const error500 = () =>
  import(/* webpackChunkName: "500" */ './pages/error/500.vue')
const teams = () =>
  import(/* webpackChunkName: "Teams" */ './pages/teams/index.vue')
const team = () =>
  import(/* webpackChunkName: "Team" */ './pages/teams/_id/index.vue')
const competitionList = () =>
  import(/* webpackChunkName: "CompList" */ './pages/competitions/index.vue')
const competitionBase = () =>
  import(
    /* webpackChunkName: "CompBase" */ './pages/competitions/_id/index.vue'
  )
const summary = () =>
  import(
    /* webpackChunkName: "Summary" */ './pages/competitions/_id/summary.vue'
  )
const results = () =>
  import(
    /* webpackChunkName: "Results" */ './pages/competitions/_id/results.vue'
  )
const match = () =>
  import(/* webpackChunkName: "Match" */ './pages/match/_id.vue')
const classification = () =>
  import(
    /* webpackChunkName: "Classification" */ './pages/competitions/_id/classification.vue'
  )
const competitionStats = () =>
  import(
    /* webpackChunkName: "CompStats" */ './pages/teams/_id/competitionstats.vue'
  )
const planification = () =>
  import(
    /* webpackChunkName: "Planification" */ './pages/planification/index.vue'
  )

import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: { requiresAuth: false, onceLogged: true, layout: 'empty' },
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta: { requiresAuth: false, onceLogged: true, layout: 'empty' },
    },
    {
      path: '/',
      name: 'index',
      component: index,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/teams',
      name: 'teams',
      component: teams,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/teams/:id?',
      name: 'teams-id',
      component: team,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/teams/:id?/competitionstats',
      name: 'competitionStats',
      component: competitionStats,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/competitions',
      name: 'competitions',
      component: competitionList,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/competitions/:id',
      name: 'competition-id',
      component: competitionBase,
      meta: { requiresAuth: true, layout: 'default' },
      children: [
        {
          path: 'summary',
          name: 'summary',
          component: summary,
          meta: { requiresAuth: true, layout: 'default' },
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
          meta: { requiresAuth: true, layout: 'default' },
        },
      ],
    },
    {
      path: '/competitions/:id/match/:matchId',
      name: 'match-id',
      component: match,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/planification',
      name: 'planification',
      component: planification,
      meta: { requiresAuth: true, layout: 'default' },
    },
    {
      path: '/500',
      name: 'error500',
      component: error500,
      meta: { requiresAuth: false, layout: 'empty' },
    },
    {
      path: '*',
      name: 'error',
      component: error404,
      meta: { requiresAuth: false, layout: 'empty' },
    },
  ],
})
/**
 * Function to check some things before redirect to a page
 *
 */
router.beforeEach((to, from, next) => {
  // method to check if user needs to be logged to access a page
  if (to.meta.requiresAuth) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (!authUser) {
      next({ name: 'login' })
    } else {
      isAuth()
      next()
    }
  }
  // method to not allow a user to go to certain pages once logged
  else if (to.meta.onceLogged) {
    const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser) {
      next({ name: 'index' })
    } else {
      next()
    }
  } else {
    next()
  }
})
function isAuth() {
  axios
    .post('private', null)
    .then((response) => {
      if (response.status === 200) {
        // console.log("Autorizado")
      }
    })
    .catch((error) => {
      console.log(error)
      if (error.response.status === 403) {
        console.log('No estás autorizado')
      } else if (error.response.status === 401) {
        console.log('No estás autorizado')
      } else if (error.response.status === 500) {
        console.log('No estás autorizado')
      }
      window.localStorage.removeItem('authUser')
      router.push({ path: '/' })
    })
}
export default router
