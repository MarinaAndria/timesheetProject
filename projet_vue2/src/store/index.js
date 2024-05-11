import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex);
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default new Vuex.Store({
  strict: true,
  state: {
    userProfile: {
      Numero_matricule: 0,
      Nom_employe: "",
      Titre: "",
      Role: "",
      Email: "",
    },
    dateInfo: {
      date: "",
      mois: "",
    },
    elementInfo: {
      date: "",
      mois: "",
      Numero_matricule: '',
      Nom_employe: ''
    },
  },
  getters: {
  getUserProfile(state) {
    return state.userProfile;
  },
  getDate(state) {
    return state.dateInfo;
  },
  getElementInfo(state) {
    return state.elementInfo;
  },
  },
  mutations: {
    setUserProfile(state, data) {
      const userProfile = {
        Numero_matricule: data.Numero_matricule,
        Nom_employe: data.Nom_employe,
        Role: data.Role,
        Titre: data.Titre,
        Email: data.Email,
      };
      state.userProfile = userProfile;
    },
    setDate(state, data) {
      const dateInfo = {
        date: data.Date,
        mois: data.Mois
      };
      state.dateInfo = dateInfo;
    },
    seeItem(state, data) {
      const elementInfo = {
        date: data.Date,
        mois: data.Mois,
        Numero_matricule: data.Numero_matricule,
        Nom_employe: data.Nom_employe
      };
      state.elementInfo = elementInfo;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
