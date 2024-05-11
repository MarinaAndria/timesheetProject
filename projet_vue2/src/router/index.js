import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeViewAdmin from '../views/admin/HomeViewAdmin.vue'
import HomeViewUser from '../views/user/HomeViewUser.vue'
import EnregistrementAdmin from "../views/admin/Champ_enregistrement.vue"
import Enregistrement from "../views/user/Champ_enregistrement.vue"
import Enregistrement_global from "../views/admin/Add_global_timesheet.vue"
import Singup from '../views/admin/Singup.vue'
import LoginUser from "../views/LoginUser.vue"
import LoginAdmin from "../views/LoginAdmin.vue"
import Projet_add from "../views/admin/Projet_add.vue"
import attribuer from "../views/admin/Attribuer.vue"
import recapitulationAdmin from "../views/admin/Recapitulation.vue"
import recapitulation from "../views/user/Recapitulation.vue"
import recapitulation_mois from "../views/admin/Recap_mois.vue"
import tovalide from "../views/admin/Faire_valider.vue"
import Layout_admin from "../views/admin/LayoutAdmin.vue"
import Layout_user from "../views/user/Layout_user.vue"
import Validation_time from "../views/admin/Validation_time.vue"
import Financial_year from "../views/admin/Financial_year.vue"
import store from "../store/index"
import Timesheet_details from "../views/admin/Timesheet_details.vue"
import HomeViewUser1 from '../views/admin/HomeViewUser.vue'
import test from '../views/admin/test.vue'
Vue.use(VueRouter)
try{
  if(store.getters["getUserProfile"].Nom_employe == undefined || store.getters["getUserProfile"].Nom_employe == "y"){
    console.log("non connect")
  } else {
    console.log("connecté")
  }
} catch(e){
  //console.log(e)
}

const routes = [
  {
    path: '/admin',
    name: 'Layout_admin',
    component: Layout_admin,
    children: [
      {path: '/attribuer', name: 'attribuer', component: attribuer, meta: { requiredAuth: true } },
      {path: '/projet_add', name: 'projet_add', component: Projet_add, meta: { requiredAuth: true } },
      {path: '/singup', name: 'Singup', component: Singup, meta: { requiredAuth: true } },
      {path: '/homeAdmin',name: 'homeAdmin', component: HomeViewAdmin, meta: { requiredAuth: true } },
      {path: '/enregistrerAdmin', name: 'EnregistrementAdmin', component: EnregistrementAdmin, meta: { requiredAuth: true } },
      {path: '/Enregistrement_global', name: 'Enregistrement_global', component: Enregistrement_global, meta: { requiredAuth: true } },
      {path: '/recapitulationAdmin', name: 'recapitulationAdmin', component: recapitulationAdmin, meta: { requiredAuth: true } },
      {path: '/tovalide', name: 'tovalide', component: tovalide, meta: { requiredAuth: true } },
      {path: '/homeUser1',name: 'homeUser1', component: HomeViewUser1},
      {path: '/Validation_time',name: 'Validation_time', component: Validation_time},
      {path: '/Financial_year',name: 'Financial_year', component: Financial_year},
      {path: '/Timesheet_details',name: 'Timesheet_details', component: Timesheet_details},
      {path: '/recapitulation_mois',name: 'recapitulation_mois', component: recapitulation_mois},
      {path: '/test',name: 'test', component: test},
      
    ]
  },
  {
    path: '/user',
    name: 'Layout_user',
    component: Layout_user,
    children: [
      {path: '/enregistrer', name: 'Enregistrement', component: Enregistrement},
      {path: '/recapitulation', name: 'recapitulation', component: recapitulation},
      {path: '/homeUser',name: 'homeUser', component: HomeViewUser},
    ]
  },
  {
    path: '/login',
    name: 'LoginUser',
    component: LoginUser,
  },
  {
    path: '/',
    name: 'LoginAdmin',
    component: LoginAdmin,
    meta: {
      title: "Se-connecter",
      notAccessToLogin: true
    }
  },
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});
router.beforeEach(async (to, from, next) => {
  if (to.meta.requiredAuth) {
    var userProfile = store.getters["getUserProfile"];
    if (userProfile.Numero_matricule === 0) {
      await store.dispatch("userProfile");
      userProfile = store.getters["getUserProfile"];
      if (userProfile.Numero_matricule === 0) {
        return next({ path: "/" });
      } else {
        return next();
      }
    }
  }
  return next();
});

export default router
