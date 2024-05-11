<template>
  
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-toolbar
      color="grey lighten-3"
      flat
      max-height="100"
    ><v-spacer></v-spacer>
      <h2 class="mt-9 mb-9" style="text-align: center;">Timesheets list that needs review</h2>
    <v-spacer></v-spacer></v-toolbar>
      <v-layout >
        <v-flex md11 class="mx-auto">
            <v-card class=" text-center mt-5 pa-7" max-width="1400" >
              <v-card-title>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="Search"
                  single-line
                  hide-details
                ></v-text-field>
              </v-card-title>
              <v-card>
              <div id="app" >
                  <v-data-table
                  :headers="headers"
                  :items="etats"
                  :items-per-page="-1"
                  hide-default-footer
                  :search="search"
                  class="px-0"
                  >
                  <template v-slot:item.Mois="{ item }">
                    <div class="text-truncate" style="width: 90px">{{item.Mois}}</div>
                  </template>
                  <template v-slot:item.Numero_matricule="{ item }">
                    <div class="text-truncate" style="width: 40px">{{item.Numero_matricule}}</div>
                  </template>
                  <template v-slot:item.Nom_employe="{ item }">
                    <div class="text-truncate" style="width: 120px">{{item.Nom_employe}}</div>
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
                  <template v-slot:item.Validation="{ item }">
                    <div class="text-truncate d-flex" style="flex-wrap: nowrap;">
                      <div><h6 class="ml-6"> Refuse</h6><v-switch v-model="item.Validation_refus" class="ml-8 mt-0" color="red darken-3" @click="updateStatusRefuse(item)"></v-switch></div>
                      <div><h6 class="ml-6"> Accept</h6><v-switch v-model="item.Validation_accept" class="ml-8 mt-0" color="success" @click="updateStatusAccept(item)"></v-switch></div>
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
                        <div class="text-h5 pa-12">State of the item changed</div>
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
                <!-- toValidate dialog de succès -->
                <v-col cols="auto">
                  <v-dialog
                    transition="dialog-top-transition"
                    max-width="500"
                    max-height="300px"
                    v-model="dialogComment"
                  >
                    <v-card>
                      <v-toolbar
                        color="success"
                        dark
                      >If necessary, add a comment, otherwise click on OK</v-toolbar>
                      <v-card-text>
                        <v-col
                          cols="20"
                          class="mt-4 mb-0"
                        >
                          <v-textarea
                            v-model="Comment"
                            outlined
                            :rules="rules"
                            counter="30"
                            name="input-7-4"
                            label="Add a comment"
                          ></v-textarea>
                        </v-col>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          text
                          @click="updateStatusComment(item)"
                        >OK</v-btn>
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
import axios from "axios";
import { socket } from '../../api/socket';
import { mapGetters } from "vuex"
export default {
  data () {
    return {
      search: '',
      headers: [
        {text: 'Month',value: 'Mois',},
        { text: 'Serial number ', value: 'Numero_matricule', },
        { text: 'Name', value: 'Nom_employe',},
        {text: 'Timesheet status',value: 'Validation_message', sortable: false,},
        { text: 'Validation ', value: 'Validation', sortable: false, align: 'center', 
        children: [
        {
            text: 'Validation2',
            value: 'Validation2',
        },
        {
            text: 'Validation2',
            value: 'Validation2',
        }
      ]},
      { text: 'Comment', value: 'Comment', sortable: false,},
      { text: 'Details', value: 'Date', sortable: false,}
      ],
      etats: [],
      rules: [v => v.length <= 30 || 'Max 30 characters'],
      switch2: false,
      dialogtoValidateSuccess: false,
      dialogComment: false,
      Comment: '',
      item: '',
      Date: '',
      Numero_matricule: '',
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
  // Show modal toValidate item
  showCommentDialog(item) {
  this.dialogComment = !this.dialogComment
  this.Date = item.Date;
  this.Numero_matricule = item.Numero_matricule;
  },
  async onClickButton(item) {
      this.$store.commit("seeItem",item);
      await this.$router.push('/Timesheet_details');
    },
  async get_all_etat() {
    let response = await axios.get(`http://localhost:5000/etat`);
    this.etats = response.data;
  },   
  async updateStatusRefuse(item) {
    item.Validation_refus = !item.Validation_refus
    item.Validation_refus = !item.Validation_refus
      try{
          await axios.post("http://localhost:5000/etat_validation_refus", {
        Numero_matricule: item.Numero_matricule,
        Date: item.Date,
        Validation_refus: item.Validation_refus,
      });
      socket.emit("send-notif-user", {
        data: "Timesheet rejected"
      })
      } catch (err) {
      console.log(err);
      }
      this.showCommentDialog(item);
      this.get_all_etat();
    },
    async updateStatusAccept(item) {
    item.Validation_accept = !item.Validation_accept
    item.Validation_accept = !item.Validation_accept
      try{
          await axios.post("http://localhost:5000/etat_validation_accept", {
        Numero_matricule: item.Numero_matricule,
        Date: item.Date,
        Validation_accept: item.Validation_accept,
      });
      socket.emit("send-notif-user", {
        data: "Timesheet accepted"
      })
      } catch (err) {
      console.log(err);
      }
      this.showtoValidateSuccessDialog();
      this.get_all_etat();
    },
    async updateStatusComment(item) {
      console.log(this.Date);
      console.log(this.Numero_matricule);
      try{
          await axios.post("http://localhost:5000/etat_comment", {
        Numero_matricule: this.Numero_matricule,
        Date: this.Date,
        Comment: this.Comment,
      });
      } catch (err) {
      console.log(err);
      }
      this.showCommentDialog(item);
      this.get_all_etat();
    },
},

}
</script>