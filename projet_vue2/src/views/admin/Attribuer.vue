<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-6" style="text-align: center;"> Assign employees to projects</h2>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout class="ps-0">
          <v-flex md8>
              <v-card class="ml-5 text-center mt-5 pa-7" max-width="900" >
                <div id="app" >
                    <v-main class="container align-center px-1" >
                      <v-card>
                        <v-data-table :headers="headers" :items="attribuer" :search="search" class="elevation-0">
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
                          <template v-slot:item.Nom_projet="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Nom_projet}}</div>
                          </template>
                          <template v-slot:item.Nom_employe="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Nom_employe}}</div>
                          </template>
                          <template v-slot:item.Budget="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Budget}}</div>
                          </template>
                        </v-data-table>
                         <!-- delete dialog -->
                      <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                          <v-card-title>Delete</v-card-title>
                          <v-card-text>Are you sure to delete the item `{{Nom_projet_delete}}` </v-card-text>
                          <v-card-actions>
                            <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
                            <v-btn color="primary" text @click="delete_attribuer(Numero_attribuer)">Delete</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- delete dialog de succès -->
                      <v-col cols="auto">
                        <v-dialog
                          transition="dialog-top-transition"
                          max-width="600"
                          v-model="dialogDeleteSuccess"
                        >
                          <v-card>
                            <v-toolbar
                              color="success"
                              dark
                            ></v-toolbar>
                            <v-card-text>
                              <div class="text-h5 pa-12">Assignement deleted successfully</div>
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
                      <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                          <v-card-title>
                            <p v-if="Nom_projet_update">Edit the project: {{Nom_projet_update}} / </p>
                            <p v-if="Nom_employe"> Employee: {{Nom_employe}}</p>
                          </v-card-title>
                          <v-card-text>
                            <v-row>
                              <v-col cols="12" sm="4">
                                <v-text-field v-model="Update_Budget" label="Hour"></v-text-field>
                              </v-col>
                            </v-row>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="showEditDialog()">Cancel</v-btn>
                            <v-btn color="blue darken-1" text @click="Update_attribuer(Numero_attribuer)">Save</v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                      <!-- edit dialog de succès -->
                      <v-col cols="auto">
                        <v-dialog
                          transition="dialog-top-transition"
                          max-width="600"
                          v-model="dialogUpdateSuccess"
                        >
                          <v-card>
                            <v-toolbar
                              color="success"
                              dark
                            ></v-toolbar>
                            <v-card-text>
                              <div class="text-h5 pa-12">Assignement updated successfully</div>
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
              <v-card-text>
                  <v-select
                  ref="Numero_projet"
                  v-model="Numero_projet"
                  :items="projets"
                  :rules="[() => !!Numero_projet || 'This field is required']"
                  label="Select project"
                  item-text="Nom_projet"
                  item-value="Numero_projet"
                  filled
                  required></v-select>
                  <v-row>
                      <v-col>
                      <v-select
                      ref="Numero_matricule"
                      v-model="Numero_matricule"
                      :items="employe"
                      :rules="[() => !!Numero_matricule || 'This field is required']"
                      item-text="Nom_employe"
                      item-value="Numero_matricule"
                      filled
                      label="The employee's name"
                      required
                      ></v-select>
                      </v-col>
                      <v-col>
                      <v-text-field
                      ref="Budget"
                      v-model="Budget"
                      :rules="[
                        () => !!Budget || 'This field is required'
                      ]"
                      type="number"
                      filled
                      label="Budget"
                      required
                      ></v-text-field>
                      </v-col>
                  </v-row>
              </v-card-text>
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
                  @click="Ajout_attribuer"
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
            { text: 'Project name', value: 'Nom_projet' },
            { text: 'Employee', value: 'Nom_employe' },
            { text: 'Budget', value: 'Budget' },
            { text: 'Action', value: 'actions', sortable: false },
    ],
    projets: [],
    employe: [],
    attribuer: [],
    items: [],
    dialog: false,
    dialogDelete: false,
    dialogDeleteSuccess: false,
    dialogUpdateSuccess: false,
    Nom_projet: '',
    Update_Budget: '',
    Nom_projet_update: '',
    Nom_projet_delete: '',
    Nom_employe: '',
    Numero_projet: '',
    errorMessages: '',
    formHasErrors: false,
    Numero_matricule: '',
    Budget: '',
    search: ''
  };
  },
  computed: {
    usersFromStore() {
      return this.$store.state.user_compte;
    },
    ...mapGetters(['getUser']),
    form () {
        return {
          Numero_projet: this.Numero_projet,
          Numero_matricule: this.Numero_matricule,
          Budget: this.Budget
        }
      },
  },
  mounted() {
    this.get_all_projets();
    this.get_all_employe();
    this.get_all_attribuer();
  },
  methods: {
    // Get All attribution
    async get_all_attribuer() {
        let response = await axios.get("http://localhost:5000/attribuer");
        this.attribuer = response.data;
    },      
    // Show modal delete item
    showDeleteSuccessDialog() {
    this.dialogDeleteSuccess = !this.dialogDeleteSuccess
    },
    // Show modal update item
    showUpdateSuccessDialog() {
    this.dialogUpdateSuccess = !this.dialogUpdateSuccess
    },
      resetForm () {
    this.errorMessages = []
    this.formHasErrors = false

    Object.keys(this.form).forEach(f => {
      this.$refs[f].reset()
    })
    },
    // Get All attribution
    async get_all_projets() {
    let response = await axios.get("http://localhost:5000/projet");
    this.projets = response.data;
    },
    // Show modal edit item
    showEditDialog(item) {
      this.dialog = !this.dialog
      this.Update_Budget = item.Budget;
      this.Numero_attribuer = item.Numero_attribuer;
      this.Nom_projet_update = item.Nom_projet;
      this.Nom_employe = item.Nom_employe;
    },
  
     // Show modal delete item
    showDeleteDialog(item) {
      this.dialogDelete = !this.dialogDelete
      this.Nom_projet_delete = item.Nom_projet;
      this.Numero_attribuer = item.Numero_attribuer;
    },
  
    // Get All work done
    async get_all_employe() {
        let response = await axios.get("http://localhost:5000/employe");
        this.employe = response.data;
    },

  
    // add new attribuer
    async Ajout_attribuer() {
      this.formHasErrors = false

      if (!this.form.Numero_projet || !this.form.Numero_matricule || !this.form.Budget) {
          this.formHasErrors = true
      }
      this.$refs.Numero_projet.validate(true)
      this.$refs.Numero_matricule.validate(true)
      this.$refs.Budget.validate(true)

      if (!this.formHasErrors) {
        try{
          await axios.post("http://localhost:5000/attribuer", {
          Numero_projet: this.Numero_projet,
          Numero_matricule: this.Numero_matricule,
          Budget: this.Budget,
        });
        this.Numero_projet = "";
        this.Numero_matricule = "";
        this.Budget = "";
        this.get_all_attribuer();
        } catch (err) {
          console.log(err);
        }
      }
    },
  
    // Update attribuer
    async Update_attribuer(Numero_attribuer) {
      try {
        const attribuer = await axios.put(`http://127.0.0.1:5000/attribuer/${Numero_attribuer}`, {
          Budget: this.Update_Budget,
        });
        this.get_all_attribuer();
        this.showUpdateSuccessDialog();
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
        this.showDeleteSuccessDialog();
        this.showDeleteDialog();
      } catch (err) {
        console.log(err);
      }
    },
  },
  };
  </script>