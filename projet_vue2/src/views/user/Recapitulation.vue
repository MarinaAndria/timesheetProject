<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-col>
    </v-col>
        <v-layout >
            <v-flex md8 class="mx-auto">
              <v-card class=" text-center mt-0 pa-7" max-width="900" ><v-card>
                <div id="app" >
                    <v-main class="container align-center px-1" >
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>
                      <v-card>
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
                          <template v-slot:item.Solde="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Solde}}</div>
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
  export default {
  data() {
    return {
    headers: [
            { text: 'Project name', value: 'Nom_projet' },
            { text: 'Accumulated hours', value: 'Accumele' },
            { text: 'Budget', value: 'Budget' },
            { text: 'Solde', value: 'Solde' }
    ],
    search: '',
    recapitulation: [],
  };
  },
  mounted() {
    this.get_all_projets();
  },
  methods: {
    // Get All Projets
    async get_all_projets() {
        let response = await axios.get("http://localhost:5000/recap");
        this.recapitulation = response.data;
      },
  
    // add new attribuer
    async Ajout_attribuer() {
        try{
            await axios.post("http://localhost:5000/attribuer", {
          Numero_projet: this.Numero_projet,
          Numero_matricule: this.Numero_matricule,
          Budget: this.Budget,
        });
        this.Numero_projet = "";
        this.Budget = "";
        this.get_all_attribuer();
    } catch (err) {
        console.log(err);
      }
    },
  
    // Update attribuer
    async Update_attribuer(Numero_attribuer) {
      try {
        const attribuer = await axios.put(`http://127.0.0.1:5000/attribuer/${Numero_attribuer}`, {
          Budget: this.Update_Budget,
        });
        this.get_all_attribuer();
        this.showEditDialog();
        console.log(attribuer.data);
      } catch (err) {
        console.log(err);
      }
    },
  
    // Delete attribuer
    async delete_attribuer(Numero_attribuer) {
      try {
        await axios.delete(`http://127.0.0.1:5000/attribuer/${Numero_attribuer}`);
        this.get_all_attribuer();
        this.showDeleteDialog();
      } catch (err) {
        console.log(err);
      }
    },
  },
  };
  </script>