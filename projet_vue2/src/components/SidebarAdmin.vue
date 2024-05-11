<template>
  <v-navigation-drawer
  floating
  permanent
  dark app class="blue-grey darken-4"
  >
    <v-list-item>
      <v-list-item-content class="mb-6">
        <v-img :src="require('../assets/logo_WWF_lite.png')"
            contain
            height="100">
        </v-img>
        <v-list-item-subtitle align="center">Timesheet</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item v-if=" getUserProfile.Role == 'Admin'" router to="/homeAdmin">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
    </v-list-item>
    <v-list-item v-if=" getUserProfile.Role == 'User'" router to="/homeUser1">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
    </v-list-item>
    <v-list-group
        prepend-icon="mdi-monitor"
        v-if=" getUserProfile.Role == 'Admin'"
      >
        <template v-slot:activator>
          <v-list-item-title>Administrator</v-list-item-title>
        </template>
          <v-list-item  router to="/singup">
            <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
              <v-icon class="mb-2">fas fa-list</v-icon>
              <v-list-item-subtitle align="center">Add new employee</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
          <v-list-item  router to="/projet_add">
            <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
              <v-icon class="mb-2">fas fa-list</v-icon>
              <v-list-item-subtitle align="center">Add new project</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
          <v-list-item  router to="/Validation_time">
            <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
              <v-icon class="mb-2">fas fa-list</v-icon>
              <v-list-item-subtitle align="center">Validation</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
          <v-list-item  router to="/attribuer">
            <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
              <v-icon class="mb-2">fas fa-list</v-icon>
              <v-list-item-subtitle align="center">Budget</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
          <v-list-item  router to="/Financial_year">
            <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
              <v-icon class="mb-2">fas fa-list</v-icon>
              <v-list-item-subtitle align="center">Financial year</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
    </v-list-group>
    <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
      >
        <template v-slot:activator>
          <v-list-item-title>User account</v-list-item-title>
        </template>
      <v-list flat >
        <v-list-item  router to="/tovalide">
          <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
            <v-icon class="mb-2">fas fa-list</v-icon>
            <v-list-item-subtitle align="center">Validate</v-list-item-subtitle>
          </v-list-item-content>  
        </v-list-item>
      </v-list>
    <v-list flat>
        <v-list-item  router to="/Enregistrement_global">
          <v-list-item-content><i class="fa-duotone fa-bars-progress"></i>
            <v-icon class="mb-2">fas fa-check</v-icon>
            <v-list-item-subtitle align="center">Add new</v-list-item-subtitle>
          </v-list-item-content>  
        </v-list-item>
      </v-list>
    <v-list flat>
      <v-list-item  router to="/recapitulationAdmin">
        <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
          <v-icon class="mb-2">fas fa-list</v-icon>
          <v-list-item-subtitle align="center">Recapitulation</v-list-item-subtitle>
        </v-list-item-content>  
      </v-list-item>
    </v-list>
    </v-list-group>
    <v-list flat class="mt-16" >
      <v-list-item >
        <v-icon >mdi-logout</v-icon><v-btn color="blue darken-1" text @click="Logout()"><h4 align="center">LOGOUT</h4></v-btn>  
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
// import axios
import axios from "axios";
import { mapGetters } from "vuex"
export default {
  name: 'SidebarAdmin',
  data: () => ({
  }),
computed: {
usersFromStore() {
return this.$store.state.userProfile;
},
...mapGetters(['getUserProfile'])
},
  methods: {
  // Logout function 
   // Logout function 
   async Logout () {
      try{
        await axios.post("http://localhost:5000/logout_admin");
        //We add the following line
        const resetUser = {
          Numero_matricule: 0,
          Nom_employe: "",
          Role: "",
          Titre: "",
          Email: ""
      };
        this.$store.commit("setUserProfile", resetUser);
      await this.$router.push('/');
  } catch (err) {
      console.log(err);
    }
  }
  },
}
</script>
