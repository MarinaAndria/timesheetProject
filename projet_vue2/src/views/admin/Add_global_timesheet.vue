<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-6" style="text-align: center;"> Manage your personal Timesheet </h2>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout>
            <v-flex md8>
              <v-card class="ml-5 text-center mt-5 pa-7" max-width="900" >
                <div id="app" >
                    <v-main class="container align-center px-1" >
                      <v-row class="mb-6">
                      <v-col cols="4" class="mt-6">
                        <h3>Your timesheet added on</h3>
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
                        <v-dialog v-model="dialogDelete" max-width="400px">
                          <v-card>
                            <v-toolbar
                              color="red darken-3" 
                              dark
                            >Delete the item `{{Nom_projet_delete}}`</v-toolbar>
                            <v-card-title></v-card-title>
                            <v-card-text>Are you sure to delete this item ? </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="dialogDelete = false">Close</v-btn>
                              <v-btn color="error" text @click="delete_effectuer(Numero_effectuer)">Delete</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog> 
                        <!-- delete dialog de succès -->
                        <v-col cols="auto">
                          <v-dialog
                            transition="dialog-top-transition"
                            max-width="390"
                            v-model="dialogDeleteSuccess"
                          >
                            <v-card>
                              <v-toolbar
                                color="success"
                                dark
                              ></v-toolbar>
                              <v-card-text>
                                <div class="text-h6 pa-4 mt-6 text-center">Item deleted successfully</div>
                              </v-card-text>
                              <v-card-actions class="justify-end">
                                <v-btn
                                  text
                                  @click="showDeleteSuccessDialog()"
                                >Close</v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-dialog>
                        </v-col>
                        <!-- this dialog is used for both create and update -->
                        <v-dialog v-model="dialog" max-width="400px">
                          <v-card>
                            <v-toolbar
                              color="blue darken-3" 
                              dark
                            >Edit the item `{{Nom_projet_update}}`</v-toolbar>
                            <v-card-title>
                              <span v-if="Nom_projet_update">Change to the correct hour</span>
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
                              <v-btn color="teal" text @click="Update_effectuer(Numero_effectuer)">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                         <!-- edit dialog de succès -->
                    <v-col cols="auto">
                      <v-dialog
                        transition="dialog-top-transition"
                        max-width="390"
                        v-model="dialogUpdateSuccess"
                      >
                        <v-card>
                          <v-toolbar
                            color="success"
                            dark
                          >Success</v-toolbar>
                          <v-card-text>
                            <div class="text-h6 pa-4 mt-6 text-center">Item updated successfully</div>
                          </v-card-text>
                          <v-card-actions class="justify-end">
                            <v-btn
                              text
                              @click="showUpdateSuccessDialog()"
                            >Close</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-col>
                      </v-card>
                    </v-main>
                </div>
            </v-card>
            </v-flex>
            <v-flex md8>
            <v-card ref="form" class="ml-5 mr-5 text-center mt-5 pa-7" max-width="700" >
              <h3 class="mt-2 mb-5 text-center">Add new item on your "Timesheet"</h3>
              <v-divider class="mb-7"></v-divider>
                <div class="row list-group-item " style="width: 100%; margin-left: 10px">
                    <v-row>
                      <v-col class="d-flex ml-5" cols="" sm="10">
                        <v-dialog
                          ref="dialog"
                          v-model="modal"
                          :return-value.sync="date"
                          persistent
                          width="290px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              ref="date"
                              v-model="date"
                              :rules="[() => !!date || 'This field is required']"
                              label="Choose a date "
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                              filled
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
                    </v-row>
                    <v-row align="center">
                        <v-col class="d-flex ml-5" cols="12" sm="5">
                        <v-select
                        ref="Numero_projet"
                        label="Select project"
                        v-model="Numero_projet"
                        :items="projets"
                        :rules="[() => !!Numero_projet || 'This field is required']"
                        item-text="Nom_projet"
                        item-value="Numero_projet"
                        filled
                        dense></v-select></v-col>
                        <v-col cols="2" sm="5">
                        <v-text-field
                        ref="Heure"
                        label="Hour"
                        type="number"
                        v-model="Heure"
                        :rules="[() => !!Heure || 'This field is required']"
                        filled
                        required
                        ></v-text-field></v-col>
                    </v-row>
                </div>   
                <v-divider class="mt-12"></v-divider>
                  <v-card-actions>
                  <v-btn text>
                      Cancel
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-slide-x-reverse-transition>
                      <v-tooltip
                      v-if="formHasErrors"
                      left
                      >
                      <template v-slot:activator="{ on, attrs }">
                          <v-btn
                          icon
                          class="my-0"
                          v-bind="attrs"
                          @click="resetForm"
                          v-on="on"
                          >
                          <v-icon>mdi-refresh</v-icon>
                          </v-btn>
                      </template>
                      <span>Refresh form</span>
                      </v-tooltip>
                  </v-slide-x-reverse-transition>
                  <v-btn
                      color="primary"
                      text
                      @click="Ajout_effectuer"
                  >
                      Submit
                  </v-btn>
                  </v-card-actions>
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
    modal: false,
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
    errorMessages: '',
    formHasErrors: false,
    dialogUpdateSuccess: false,
    dialogDeleteSuccess: false,
  };
  },
  computed: {
    usersFromStore() {
      return this.$store.state.userProfile;
    },
      form () {
          return {
            date: this.date,
            Numero_projet: this.Numero_projet,
            Heure: this.Heure
          }
        },
      ...mapGetters(['getDate']),
    ...mapGetters(['getUserProfile'])
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
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false
  
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
      },
     // Show modal delete item
    showDeleteDialog(item) {
      this.dialogDelete = !this.dialogDelete
      this.Nom_projet_delete = item.Nom_projet;
      this.Numero_effectuer = item.Numero_effectuer;
    },
  
    // Get All Projets
    async get_all_projets() {
      let Numero_matricule = this.getUserProfile.Numero_matricule;
        let response = await axios.get(`http://127.0.0.1:5000/projet_by_mat/${Numero_matricule}`);
        this.projets = response.data;
      },
  
    // Get All work done
    async get_all_effectuer() {
      let Numero_matricule = this.getUserProfile.Numero_matricule;
      console.log (this.getUserProfile.Numero_matricule)
        let response = await axios.get(`http://127.0.0.1:5000/effectuer/${Numero_matricule}`);
        this.effectuer = response.data;
    },
     // add new effectuer
     async Ajout_effectuer() {
      this.formHasErrors = false
  
      if (!this.form.Numero_projet || !this.form.date || !this.form.Heure) {
          this.formHasErrors = true
      }
      this.$refs.Numero_projet.validate(true)
      this.$refs.date.validate(true)
      this.$refs.Heure.validate(true)
  
      if (!this.formHasErrors) {
        try{
            await axios.post("http://localhost:5000/effectuer", {
          Numero_projet: this.Numero_projet,
          Numero_matricule: this.getUserProfile.Numero_matricule,
          Date: this.date,
          Heure: this.Heure,
        });
        this.Numero_projet = "";
        this.Heure = "";
        this.date = "";
        this.get_all_effectuer();
    } catch (err) {
        console.log(err);
      }
    }
    },
        // Show modal delete item
      showDeleteSuccessDialog() {
      this.dialogDeleteSuccess = !this.dialogDeleteSuccess
      },
      // Show modal update item
      showUpdateSuccessDialog() {
      this.dialogUpdateSuccess = !this.dialogUpdateSuccess
      },
    // Update effectuer
    async Update_effectuer(Numero_effectuer) {
      try {
        const effectuer = await axios.put(`http://127.0.0.1:5000/effectuer/${Numero_effectuer}`, {
          Heure: this.Update_Heure,
        });
        this.get_all_effectuer();
        this.showUpdateSuccessDialog();
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
        this.showDeleteSuccessDialog();
        this.showDeleteDialog();
      } catch (err) {
        console.log(err);
      }
    },
  },
  };
  </script>