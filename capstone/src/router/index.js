
import firebase from 'firebase'
import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Survey from '../views/Survey.vue'
import Landing from '../views/Landing.vue'
import InputsVis from '../views/inputs-vis.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/survey',
    name: 'Survey',
    component: Survey,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:  '/login',
    name: 'Login',
    component: Login
  },
  {
    path:  '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '*', // this redirects anything that doesn't correspond to the login page
    redirect: '/Landing'
  },
  {
    path: '/landing', // this redirects anything that doesn't correspond to the login page
    name: 'Landing',
    component: Landing
  },
  {
    path: '/inputs-vis',
    name: 'InputsVis',
    component: InputsVis, // this will require Auth
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login');
  // else if (!requiresAuth && currentUser) next('landing');
  else next();
});

export default router;
