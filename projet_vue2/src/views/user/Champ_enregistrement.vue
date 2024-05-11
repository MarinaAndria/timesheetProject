<template>
  
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <div class="my-5">
      <h2 align="center">Add new item on the Timesheet</h2>
    </div>
  <v-col>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Choose a date "
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
          required
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        scrollable
        hidden
      >
        <v-spacer></v-spacer>
        <v-btn
          text
          color="primary"
          @click="modal = false"
        >
          Cancel
        </v-btn>
        <v-btn
          text
          color="primary"
          @click="$refs.dialog.save(date)"
        >
          OK
        </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-col>
      <v-layout>
          <v-flex md8>
          <v-card class="ml-5 text-center mt-0 pa-7" max-width="700" >
            
            <h3 class="mt-2 mb-5 text-center">Add new item on your "Timesheet"</h3>
            <v-divider class="mb-7"></v-divider>
              <div class="row list-group-item " style="width: 100%; margin-left: 10px">
                  <v-row align="center">
                      <v-col class="d-flex" cols="12" sm="5">
                      <v-select
                      label="Select project"
                      v-model="Numero_projet"
                      :items="projets"
                      item-text="Nom_projet"
                      item-value="Numero_projet"
                      filled
                      dense></v-select></v-col>
                      <v-col cols="2" sm="5">
                      <v-text-field
                      label="Hour"
                      type="number"
                      v-model="Heure"
                      filled
                      ></v-text-field></v-col>
                  </v-row>
              </div>   
              <v-row>
                  <v-card-actions>
                      <v-btn @click="Ajout_effectuer">Save</v-btn>
                  </v-card-actions>
              </v-row>  
          </v-card>
          </v-flex>
          <v-flex md8>
            <v-card class="ml-5 text-center mt-0 pa-7" max-width="900" ><v-card>
              <div id="app" >
                  <v-main class="container align-center px-1" >
                    <v-row class="mb-6">
                    <v-col cols="4" class="mt-6">
                      <subtitle-2>Your timesheet added on</subtitle-2>
                    </v-col>
                    <v-col cols="8">
                      <v-text-field
                        v-model="date"
                        label="Please select a date "
                        single-line
                        hide-details
                        disabled
                      ></v-text-field>
                    </v-col>
                    </v-row>
                    <v-spacer></v-spacer>
                    <v-card>
                      <v-data-table :headers="headers" :items="effectuer" :search="date" class="elevation-0">
                        <template v-slot:item.actions="{ item }">
                        <div class="text-truncate">
                        <v-icon small class="mr-2" @click="showEditDialog(item)" color="primary">
                          mdi-pencil
                        </v-icon>
                        <v-icon small class="mr-2" @click="showDeleteDialog(item)" color="pink">
                          mdi-delete
                        </v-icon>
                        </div>
                        </template>
                        <template v-slot:item.Date="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Date}}</div>
                        </template>
                        <template v-slot:item.Nom_projet="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Nom_projet}}</div>
                        </template>
                        <template v-slot:item.Heure="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Heure}}</div>
                        </template>
                      </v-data-table>
                      <!-- delete dialog -->
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title>Delete</v-card-title>
                          <v-card-text>Are you sure to delete the item `{{Nom_projet_delete}}` </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
                            <v-btn color="primary" text @click="delete_effectuer(Numero_effectuer)">Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- this dialog is used for both create and update -->
                      <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <span v-if="Nom_projet_update">Edit the project: {{Nom_projet_update}}</span>
                          </v-card-title>
                          <v-card-text>
                            <v-row>
                              <v-col cols="12" sm="4">
                                <v-text-field v-model="Update_Heure" label="Hour"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="showEditDialog()">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="Update_effectuer(Numero_effectuer)">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-card>
                  </v-main>
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
import { mapGetters } from "vuex"
export default {
data() {
  return {
  headers: [
          { text: 'Date', value: 'Date' },
          { text: 'Project', value: 'Nom_projet' },
          { text: 'Hour', value: 'Heure' },
          { text: 'Action', value: 'actions', sortable: false },
  ],
  effectuer: [],
  projets: [],
  items: [],
  dialog: false,
  dialogDelete: false,
  date: '',
  Numero_projet: '',
  Nom_projet_update: '',
  Nom_projet_delete: '',
  Update_Heure: '',
  Numero_matricule: '',
  Heure: '',
  Numero_effectuer: '',
  Nom_projet: '',
};
},
computed: {
  usersFromStore() {
    return this.$store.state.user_compte;
  },
  ...mapGetters(['getUser'])
},
mounted() {
  this.get_all_projets();
  this.get_all_effectuer();
},
methods: {
  // Show modal edit item
  showEditDialog(item) {
    this.dialog = !this.dialog
    this.Update_Heure = item.Heure;
    this.Numero_effectuer = item.Numero_effectuer;
    this.Nom_projet_update = item.Nom_projet;
  },

   // Show modal delete item
  showDeleteDialog(item) {
    this.dialogDelete = !this.dialogDelete
    this.Nom_projet_delete = item.Nom_projet;
    this.Numero_effectuer = item.Numero_effectuer;
  },

  // Get All Projets
  async get_all_projets() {
      let response = await axios.get("http://localhost:5000/projet");
      this.projets = response.data;
    },

  // Get All work done
  async get_all_effectuer() {
      let response = await axios.get("http://localhost:5000/effectuer");
      this.effectuer = response.data;
  },

  // add new effectuer
  async Ajout_effectuer() {
      try{
          await axios.post("http://localhost:5000/effectuer", {
        Numero_projet: this.Numero_projet,
        Numero_matricule: this.getUser,
        Date: this.date,
        Heure: this.Heure,
      });
      this.Numero_projet = "";
      this.Heure = "";
      this.get_all_effectuer();
  } catch (err) {
      console.log(err);
    }
  },

  // Update effectuer
  async Update_effectuer(Numero_effectuer) {
    try {
      const effectuer = await axios.put(`http://127.0.0.1:5000/effectuer/${Numero_effectuer}`, {
        Heure: this.Update_Heure,
      });
      this.get_all_effectuer();
      this.showEditDialog();
      console.log(effectuer.data);
    } catch (err) {
      console.log(err);
    }
  },

  // Delete effectuer
  async delete_effectuer(Numero_effectuer) {
    try {
      await axios.delete(`http://127.0.0.1:5000/effectuer/${Numero_effectuer}`);
      this.get_all_effectuer();
      this.showDeleteDialog();
    } catch (err) {
      console.log(err);
    }
  },
},
};
</script>