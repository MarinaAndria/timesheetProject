<template>
    <v-navigation-drawer
    floating
    permanent
    dark app mini-variant mini-variant-width="200" class="indigo darken-4"
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
      <v-list class="my-5">
        <v-list flat>
          <v-list-item  router to="/homeUser">
            <v-list-item-content>
              <v-icon class="mb-2">fa-regular fa-calendar-circle-plus</v-icon>
              <v-list-item-subtitle align="center">Home</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
        </v-list>
        <v-list flat>
          <v-list-item  router to="/enregistrer">
            <v-list-item-content><i class="fa-duotone fa-bars-progress"></i>
              <v-icon class="mb-2">fas fa-check</v-icon>
              <v-list-item-subtitle align="center">Add new</v-list-item-subtitle>
            </v-list-item-content>  
          </v-list-item>
        </v-list>
      <v-list flat>
        <v-list-item  router to="/recapitulation">
          <v-list-item-content><i class="fa-solid fa-rectangle-history-circle-user"></i>
            <v-icon class="mb-2">fas fa-list</v-icon>
            <v-list-item-subtitle align="center">Recapitulation</v-list-item-subtitle>
          </v-list-item-content>  
        </v-list-item>
      </v-list>
      </v-list>
      <v-list flat>
        <v-list-item >
          <v-btn color="blue darken-1" text @click="Logout()">Logout</v-btn>  
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  <script>
  // import axios
import axios from "axios";
  export default {
    name: 'SidebarUser',
    data: () => ({
    }),
    computed: {
    }, 
    methods: {
    // Logout function 
    async Logout () {
    try{
        await axios.post("http://localhost:5000/logout", {}, {
          withCredentials: true
        });
        await this.$router.push('/login');
    } catch (err) {
        console.log(err);
      }
    }
    },
  }
  </script>
  