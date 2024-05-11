<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-12 mb-12" style="text-align: center;">Recapitulation of your personal work</h2>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout >
            <v-flex md8 class="mx-auto">
              <v-card class=" text-center mt-5 pa-7" max-width="900" >
                <v-card>
                <div id="app" >
                    <v-data-table
                    :headers="headers"
                    :items="etats"
                    :items-per-page="-1"
                    hide-default-footer
                    class="px-0"
                    >
                    <template v-slot:item.Mois="{ item }">
                      <div class="text-truncate" style="width: 100px">{{item.Mois}}</div>
                    </template>
                    <template v-slot:item.Validation_message="{ item }">
                      <div v-if="item.Validation_message == 'Waiting for a review'" class="blue darken-4 text-center rounded-pill">
                        <span class="white--text text-truncate font-italic" style="width: 100px"><h5>{{item.Validation_message}}</h5></span>
                      </div>
                      <div v-if="item.Validation_message == 'Accepted'" class="green darken-2 text-center rounded-pill">
                        <span class="white--text text-truncate font-italic" style="width: 100px"><h5>{{item.Validation_message}}</h5></span>
                      </div>
                      <div v-if="item.Validation_message == 'Rejected'" class="deep-orange darken-4 text-center rounded-pill">
                        <span class="white--text text-truncate font-italic" style="width: 100px"><h5>{{item.Validation_message}}</h5></span>
                      </div>
                    </template>
                    <template v-slot:item.Comment="{ item }">
                      <div class="text-truncate" style="width: 200px">{{item.Comment}}</div>
                    </template>
                    <template v-slot:item.Etat="{ item }">
                      <div class="text-truncate">
                        <v-switch
                        v-model="item.Etat"
                        class="ml-8"
                        color="success"
                        @click="updateStatus(item)"
                        ></v-switch>
                      </div>
                    </template>
                    <template v-slot:item.Date="{ item }">
                      <v-btn icon color="indigo" v-bind:data-value="item.Date" @click="onClickButton(item)">
                          <v-icon>mdi-eye</v-icon>
                      </v-btn>
                    </template>
                </v-data-table>
                <!-- toValidate dialog de succès -->
                <v-col cols="auto">
                        <v-dialog
                          transition="dialog-top-transition"
                          max-width="600"
                          v-model="dialogtoValidateSuccess"
                        >
                          <v-card>
                            <v-toolbar
                              color="success"
                              dark
                            ></v-toolbar>
                            <v-card-text>
                              <div class="text-h5 pa-12">State of the timesheet changed</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="showtoValidateSuccessDialog()"
                              >ok</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
                </div>
              </v-card>
            </v-card>
          </v-flex>
      </v-layout>
    </v-app>
  </template>
  <script>
  // import axios
  import { socket } from '../../api/socket';
  import axios from "axios";
import { mapGetters } from "vuex"
  export default {
    data () {
      return {
        search: '',
        headers: [
          {text: 'Month',value: 'Mois', sortable: false,},
          { text: 'Timesheet status ', value: 'Etat', sortable: false, },
          { text: 'Answer from the admin ', value: 'Validation_message', sortable: false, },
          {text: 'Comment',value: 'Comment', sortable: false,},
          { text: 'Details', value: 'Date', sortable: false,}
        ],
        etats: [],
        switch2: false,
  dialogtoValidateSuccess: false,
      }
    },
    created() {
  this.get_all_etat();
},
computed: {
  usersFromStore() {
    return this.$store.state.userProfile;
  },
  ...mapGetters(['getUserProfile'])
},
    methods: {
    // Show modal toValidate item
    showtoValidateSuccessDialog() {
    this.dialogtoValidateSuccess = !this.dialogtoValidateSuccess
    },
    async get_all_etat() {
      let Numero_matricule = this.getUserProfile.Numero_matricule;
      console.log (this.getUserProfile.Numero_matricule)
      let response = await axios.get(`http://localhost:5000/etat/${Numero_matricule}`);
      this.etats = response.data;
      console.log (this.etats)
    },   
    async onClickButton(item) {
      this.$store.commit("setDate",item);
      await this.$router.push('/enregistrerAdmin');
    },
    async updateStatus(item) {
      item.Etat = !item.Etat
      item.Etat = !item.Etat
      try{
          await axios.post("http://localhost:5000/etat", {
        Numero_matricule: this.getUserProfile.Numero_matricule,
        Date: item.Date,
        Etat: item.Etat,
      });
      socket.emit("send-notif-admin", {
        data: this.getUserProfile.Nom_employe
      })
      } catch (err) {
      console.log(err);
      }
      this.showtoValidateSuccessDialog();
      this.get_all_etat();
    },
  },
  
  }
</script>