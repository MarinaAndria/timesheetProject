<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-6" style="text-align: center;">Recapitulation of your personal work</h2>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout >
            <v-flex md8 class="mx-auto">
              <v-card class=" text-center mt-5 pa-7" max-width="900" >
                <div id="app" >
                    <v-main class="container align-center px-1" >
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                      <v-card class="mt-5">
                        <v-data-table :headers="headers" :items="recapitulation" :search="search" class="elevation-0">
                          <template v-slot:item.Nom_projet="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Nom_projet}}</div>
                          </template>
                          <template v-slot:item.Nom_employe="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Accumule}}</div>
                          </template>
                          <template v-slot:item.Budget="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Budget}}</div>
                          </template>
                          <template v-slot:item.Reste="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Reste}}</div>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-main>
                </div>
              </v-card>
          </v-flex>
      </v-layout>
    </v-app>
  </template>
  <script>
  // import axios
  import axios from "axios";
import { mapGetters } from "vuex"
  export default {
  data() {
    return {
    headers: [
            { text: 'Project name', value: 'Nom_projet' },
            { text: 'Accumulated hours', value: 'Accumele' },
            { text: 'Budget', value: 'Budget' },
            { text: 'Reste', value: 'Reste' },
    ],
    search: '',
    recapitulation: [],
    Accumele: null,
    Nom_projet: null,
    Budget: null,
    Reste: null,
  };
  },
  computed: {
  usersFromStore() {
    return this.$store.state.userProfile;
  },
  ...mapGetters(['getUserProfile'])
},
  mounted() {
    this.get_all_projets();
  },
  methods: {
    // Get All Projets
    async get_all_projets() {
    let Numero_matricule = this.getUserProfile.Numero_matricule;
        let response = await axios.get(`http://127.0.0.1:5000/recap/${Numero_matricule}`);
        this.recapitulation = response.data;
        console.log(this.recapitulation)
      },
  },
  };
  </script>