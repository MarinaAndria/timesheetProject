<template>
  
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-6" style="text-align: center;">Add new project to the database</h2>
      <v-spacer></v-spacer></v-toolbar>
    <v-layout class="ms-5">
        <v-flex md8>
          <v-card class="ml-4 mr-3 text-center mt-5 pa-7" max-width="900" >
            <div id="app" >
                <v-main class="container align-center px-1" >
                  <v-card>
                    <v-data-table :headers="headers" :items="projets" :search="search" class="elevation-0">
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
                      <template v-slot:item.Bailleur_primaire="{ item }">
                        <div class="text-truncate" style="width: 180px">{{item.Bailleur_primaire}}</div>
                      </template>
                    </v-data-table>
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
                          <div class="text-h5 pa-12">Project updated successfully</div>
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
                   <!-- delete dialog -->
                   <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                      <v-card-title>Delete</v-card-title>
                      <v-card-text>Are you sure to delete the project n°`{{Numero_projet_delete}}`, {{Nom_projet_delete}}  </v-card-text>
                      <v-card-actions>
                        <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
                        <v-btn color="primary" text @click="delete_projet(Numero_projet_delete)">Delete</v-btn>
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
                          <div class="text-h5 pa-12">Project deleted successfully</div>
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
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Nom_projet" label="Project name"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Description" label="Contract object"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Bailleur_primaire" label="Primary donor"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Bailleur_contractuel" label="Contracting donor"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Ref_contrat" label="Internal contract Ref"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Date_debut" label="Start date"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Date_fin" label="End date"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Budget" label="Budget"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Unite" label="CUR"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Contract_officer" label="Contret officer"></v-text-field>
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12" sm="8">
                            <v-text-field v-model="Update_Finance_officer" label="Finance officer"></v-text-field>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="showEditDialog()">Cancel</v-btn>
                        <v-btn color="blue darken-1" text @click="Update_projet(Numero_projet)">Save</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                  </v-card>
                </v-main>
            </div>
          </v-card>
        </v-flex>
          <v-col
            cols="12"
            sm="10"
            md="8"
            mr="6"
            lg="6"
          >
            <v-card ref="form">
              <v-card-text>
                <v-row>
                    <v-col>
                        <v-text-field
                        ref="Nom_projet"
                        v-model="Nom_projet"
                        :rules="[() => !!Nom_projet || 'This field is required']"
                        :error-messages="errorMessages"
                        label="Project name"
                        required
                        ></v-text-field>
                        <v-text-field
                        ref="Description"
                        v-model="Description"
                        :rules="[() => !!Description || 'This field is required']"
                        label="Contract Object"
                        required
                        ></v-text-field>
                        <v-text-field
                        ref="Bailleur_primaire"
                        v-model="Bailleur_primaire"
                        :rules="[() => !!Bailleur_primaire || 'This field is required']"
                        label="Primary Donor"
                        required
                        ></v-text-field>
                        <v-text-field
                        ref="Bailleur_contractuel"
                        v-model="Bailleur_contractuel"
                        :rules="[() => !!Bailleur_contractuel || 'This field is required']"
                        label="Contracting Donor"
                        required
                        ></v-text-field>
                        <v-text-field
                        ref="Ref_contrat"
                        v-model="Ref_contrat"
                        :rules="[() => !!Ref_contrat || 'This field is required']"
                        label="Internal Contract Ref"
                        required
                        ></v-text-field>
                        <v-text-field
                        ref="Date_debut"
                        type="date"
                        v-model="Date_debut"
                        :rules="[() => !!Date_debut || 'This field is required']"
                        label="Start Date"
                        required
                        ></v-text-field>
                    </v-col>
                    <v-col>
                        <v-text-field
                            ref="Date_fin"
                            type="date"
                            v-model="Date_fin"
                            :rules="[() => !!Date_fin || 'This field is required']"
                            :error-messages="errorMessages"
                            label="End Date"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="Budgets"
                            v-model="Budgets"
                            type="number"
                            :rules="numberRule"
                            label="Budget"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="Unite"
                            v-model="Unite"
                            :rules="[() => !!Unite || 'This field is required']"
                            label="CUR"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="Contract_officer"
                            v-model="Contract_officer"
                            :rules="[() => !!Contract_officer || 'This field is required']"
                            label="Contract officer"
                            required
                        ></v-text-field>
                        <v-text-field
                            ref="Finance_officer"
                            v-model="Finance_officer"
                            :rules="[() => !!Finance_officer || 'This field is required']"
                            label="Finance officer"
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
                  @click="submit"
                >
                  Submit
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
    </v-layout>
  </v-app>
</template>
  <script>
    // import axios
    import axios from "axios";
  
    export default {
      data: () => ({
        headers: [
            { text: 'Project number', value: 'Numero_projet' },
            { text: 'Project name', value: 'Nom_projet' },
            { text: 'Action', value: 'actions', sortable: false },
    ],
      numberRule:[
        v => /^\d+$/.test(v)||'This field only accept numbers'],
    projets: [],
    items: [],
        errorMessages: '',
        dialog: false,
      dialogUpdateSuccess: false,
      dialogDeleteSuccess: false,
      dialogDelete: false,
        Nom_projet: null,
        Description: null,
        Bailleur_primaire: null,
        Bailleur_contractuel: null,
        Ref_contrat: null,
        Date_debut: null,
        Date_fin: null,
        Budgets: null,
        Unite: null,
        Contract_officer: null,
        Finance_officer: null,
        formHasErrors: false,
      }),
  mounted() {
    this.get_all_projets();
  },
      computed: {
        form () {
          return {
            Nom_projet: this.Nom_projet,
            Description: this.Description,
            Bailleur_primaire: this.Bailleur_primaire,
            Bailleur_contractuel: this.Bailleur_contractuel,
            Ref_contrat: this.Ref_contrat,
            Date_debut: this.Date_debut,
            Date_fin: this.Date_fin,
            Budgets: this.Budgets,
            Unite: this.Unite,
            Contract_officer: this.Contract_officer,
            Finance_officer: this.Finance_officer,
          }
        },
      },
  
      watch: {
        Nom_projet () {
          this.errorMessages = ''
        },
      },
  
      methods: {
    // Get All Projets
    async get_all_projets() {
        let response = await axios.get("http://localhost:5000/projet");
        this.projets = response.data;
    },
    resetForm () {
      this.errorMessages = []
      this.formHasErrors = false

      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset()
      })
    },      
    // Show modal update item
    showUpdateSuccessDialog() {
    this.dialogUpdateSuccess = !this.dialogUpdateSuccess
    }, 
    // Show modal delete item
    showDeleteSuccessDialog() {
    this.dialogDeleteSuccess = !this.dialogDeleteSuccess
    }, 
    // Show modal delete item
    showDeleteDialog(item) {
      this.dialogDelete = !this.dialogDelete
      this.Numero_projet_delete = item.Numero_projet;
      this.Nom_projet_delete = item.Nom_projet;
    },
    // Show modal edit item
    showEditDialog(item) {
      this.dialog = !this.dialog
      this.Numero_projet = item.Numero_projet;
      this.Update_Nom_projet = item.Nom_projet;
      this.Update_Description = item.Description;
      this.Update_Bailleur_primaire = item.Bailleur_primaire;
      this.Update_Bailleur_contractuel = item.Bailleur_contractuel;
      this.Update_Ref_contrat = item.Ref_contrat;
      this.Update_Date_debut = item.Date_debut;
      this.Update_Date_fin = item.Date_fin;
      this.Update_Budgets = item.Budgets;
      this.Update_Unite = item.Unite;
      this.Update_Contract_officer = item.Contract_officer;
      this.Update_Finance_officer = item.Finance_officer;
    },
        // Update attribuer
        async Update_projet(Numero_projet) {
      try {
        const attribuer = await axios.put(`http://127.0.0.1:5000/projet/${Numero_projet}`, {
          Numero_projet: this.Numero_projet,
          Description: this.Update_Description,
          Nom_projet: this.Update_Nom_projet,
          Bailleur_primaire: this.Update_Bailleur_primaire,
          Bailleur_contractuel: this.Update_Bailleur_contractuel,
          Ref_contrat: this.Update_Ref_contrat,
          Date_debut: this.Update_Date_debut,
          Date_fin: this.Update_Date_fin,
          Budgets: this.Update_Budgets,
          Unite: this.Update_Unite,
          Contract_officer: this.Update_Contract_officer,
          Finance_officer: this.Update_Finance_officer,
        });
        this.get_all_projets();
        this.showUpdateSuccessDialog();
        this.showEditDialog();
        console.log(attribuer.data);
      } catch (err) {
        console.log(err);
      }
    },
      // add new effectuer
      async submit() {
        this.formHasErrors = false
  
          Object.keys(this.form).forEach(async f => {
            if (!this.form[f]) this.formHasErrors = true
  
            this.$refs[f].validate(true)
          })
          try{
            await axios.post("http://localhost:5000/projet", {
            Nom_projet: this.Nom_projet,
            Description: this.Description,
            Bailleur_primaire: this.Bailleur_primaire,
            Bailleur_contractuel: this.Bailleur_contractuel,
            Ref_contrat: this.Ref_contrat,
            Date_debut: this.Date_debut,
            Date_fin: this.Date_fin,
            Budgets: this.Budgets,
            Unite: this.Unite,
            Contract_officer: this.Contract_officer,
            Finance_officer: this.Finance_officer,
          });
          this.Nom_projet = "";
        this.Description = "";
        this.Bailleur_primaire = "";
        this.Bailleur_contractuel = "";
        this.Ref_contrat = "";
        this.Date_debut = "";
        this.Date_fin = "";
        this.Budgets = "";
        this.Unite = "";
        this.Contract_officer = "";
        this.Finance_officer = "";
        this.get_all_projets();
      } catch (err) {
          console.log(err);
        }
      },
      // Delete projet
    async delete_projet(Numero_projet_delete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/projet/${Numero_projet_delete}`);
        this.get_all_projets();
        this.showDeleteSuccessDialog();
        this.showDeleteDialog();
      } catch (err) {
        console.log(err);
      }
    },
      },
    }
  </script>