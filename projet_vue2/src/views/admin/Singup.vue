<template>
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-toolbar
      color="grey lighten-3"
      flat
      max-height="100"
    ><v-spacer></v-spacer>
      <h2 class="mt-6" style="text-align: center;">Add new employee to the database</h2>
    <v-spacer></v-spacer></v-toolbar>
    <v-row justify="center">
      <v-layout class="ms-5">
        <v-flex md8>
            <v-card class="ml-5 text-center mt-5 pa-7" max-width="900" >
              <div id="app" >
                  <v-main class="container align-center px-1" >
                    <v-card>
                      <v-card-title>
                        <v-text-field
                          v-model="search"
                          append-icon="mdi-magnify"
                          label="Search"
                          single-line
                          hide-details
                        ></v-text-field>
                      </v-card-title>
                      <v-data-table :headers="headers" :items="employe" :search="search" class="elevation-0">
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
                        <template v-slot:item.actions1="{ item }">
                        <div class="text-truncate">
                          <v-icon small class="mr-2" @click="showEditLoginDialog(item)" color="primary">
                            mdi-pencil
                          </v-icon>
                        </div>
                        </template>
                        <template v-slot:item.Numero_matricule="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Numero_matricule}}</div>
                        </template>
                        <template v-slot:item.Nom_employe="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Nom_employe}}</div>
                        </template>
                        <template v-slot:item.Titre="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Titre}}</div>
                        </template>
                        <template v-slot:item.Email="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Email}}</div>
                        </template>
                        <template v-slot:item.Password="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Password}}</div>
                        </template>
                        <template v-slot:item.Role="{ item }">
                          <div class="text-truncate" style="width: 180px">{{item.Role}}</div>
                        </template>
                      </v-data-table>
                        <!-- added dialog -->
                    <v-dialog v-model="AddedDialog" max-width="500px">
                      <v-card>
                        <v-card-title>Success</v-card-title>
                        <v-card-text>The project has been successfully added</v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" text @click="AddedDialog = false">Ok</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- delete dialog -->
                    <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title>Delete</v-card-title>
                        <v-card-text>Are you sure to delete the employee n°`{{Numero_matricule_delete}}`, {{Nom_employe_delete}}  </v-card-text>
                        <v-card-actions>
                          <v-btn color="primary" text @click="dialogDelete = false">Close</v-btn>
                          <v-btn color="primary" text @click="delete_employee(Numero_matricule_delete)">Delete</v-btn>
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
                            <div class="text-h5 pa-12">Employee deleted successfully</div>
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
                          <p v-if="Numero_matricule">Edit the employee n°: {{Numero_matricule}} / </p>
                        </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="8">
                              <v-text-field v-model="Update_Nom_employe" label="Full name"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="8">
                              <v-text-field v-model="Update_Titre" label="Job"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="8">
                            <v-select
                            v-model="Update_Role"
                            :items="Account_type"
                            item-text="Role"
                            item-value="Role"
                            filled
                            label="Account type"
                            ></v-select>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="showEditDialog()">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="Update_employee(Numero_matricule)">Save</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <!-- this dialog update login information -->
                    <v-dialog v-model="dialog1" max-width="500px">
                      <v-card>
                        <v-card-title>
                          <p v-if="Numero_matricule">Edit the login of the employee n°: {{Numero_matricule}} / </p>
                        </v-card-title>
                        <v-card-text>
                          <v-row>
                            <v-col cols="12" sm="8">
                              <v-text-field v-model="Update_Email" label="E-mail"></v-text-field>
                            </v-col>
                          </v-row>
                          <v-row>
                            <v-col cols="12" sm="8">
                              <v-text-field v-model="Update_Password" label="Password"></v-text-field>
                            </v-col>
                          </v-row>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="blue darken-1" text @click="showEditLoginDialog()">Cancel</v-btn>
                          <v-btn color="blue darken-1" text @click="Update_login_employee(Numero_matricule)">Save</v-btn>
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
                            <div class="text-h5 pa-12">Employee updated successfully</div>
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
          <v-col
            cols="12"
          >
          <v-card ref="form" class="mr-5 mt-5">
            <v-card-text>
              <v-text-field
                ref="Numero_matricule"
                type="number"
                v-model="Numero_matricule"
                :rules="numberRule"
                label="Registration number"
                placeholder="****"
                required
              ></v-text-field>
              <v-text-field
                ref="Nom_employe"
                v-model="Nom_employe"
                :rules="[() => !!Nom_employe || 'This field is required']"
                label="Full name"
                required
              ></v-text-field>
              <v-text-field
                ref="Titre"
                v-model="Titre"
                :rules="[() => !!Titre || 'This field is required']"
                label="Job"
                required
              ></v-text-field>
              <v-text-field
                ref="Email"
                v-model="Email"
                :rules="emailRules"
                label="E-mail"
                placeholder="...@gmail.com"
                required
              ></v-text-field>
              <v-text-field
                ref="Password"
                v-model="Password"
                :rules="[
                  () => !!Password || 'This field is required',
                  () => !!Password && Password.length >= 8 || 'The password must be at least 8 characters',
                  ]"
                label="Password"
                placeholder="******"
                required
              ></v-text-field>
              <v-select
              v-model="Role"
              :items="Account_type"
              item-text="Role"
              item-value="Role"
              filled
              label="Account type"
              required
              ></v-select>
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
        </v-flex>
      </v-layout>
    </v-row>
  </v-app>
</template>
<script>
  // import axios
  import axios from "axios";

  export default {
    data: () => ({
      headers: [
            { text: 'Serial number', value: 'Numero_matricule' },
            { text: 'Name', value: 'Nom_employe' },
            { text: 'Role', value: 'Role' },
            { text: 'Action', value: 'actions', sortable: false },
            { text: 'Edit login', value: 'actions1', sortable: false },
    ],
        Account_type: [
          { Role: 'User' },
          { Role: 'Admin' },
        ],
      errorMessages: '',
      employe: [],
      items: [],
      search: '',
      Numero_matricule: null,
      Nom_employe: null,
      Titre: null,
      Email: null,
      Password: null,
      Update_Email: null,
      Numero_matricule_delete: null,
      Nom_employe_delete: null,
      Update_Titre: null,
      Update_Nom_employe: null,
      Update_Role: null,
      Update_Password: null,
      Role: null,
      formHasErrors: false,
      dialog: false,
      dialog1: false,
      dialogDelete: false,
      dialogDeleteSuccess: false,
      dialogUpdateSuccess: false,
      AddedDialog: false,
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      numberRule:[
        v => /^\d+$/.test(v)||'This field only accept numbers']
    }),

    computed: {
      form () {
        return {
          Numero_matricule: this.Numero_matricule,
          Nom_employe: this.Nom_employe,
          Titre: this.Titre,
          Email: this.Email,
          Password: this.Password,
          Role: this.Role,
        }
      },
    },

    watch: {
      Numero_matricule () {
        this.errorMessages = ''
      },
    },
    mounted() {
    this.get_all_employe();
  },
    methods: {
     // Get All work done
     async get_all_employe() {
        let response = await axios.get("http://localhost:5000/employe");
        this.employe = response.data;
    },
      resetForm () {
        this.errorMessages = []
        this.formHasErrors = false

        Object.keys(this.form).forEach(f => {
          this.$refs[f].reset()
        })
      },
          // Show modal edit item
    showEditDialog(item) {
      this.dialog = !this.dialog
      this.Numero_matricule = item.Numero_matricule;
      this.Update_Nom_employe = item.Nom_employe;
      this.Update_Titre = item.Titre;
      this.Update_Role = item.Role;
    },
    // Show modal edit item
    showEditLoginDialog(item) {
      this.dialog1 = !this.dialog1
      this.Numero_matricule = item.Numero_matricule;
      this.Update_Email = item.Email;
      this.Update_Password = item.Password;
    },
    // Show modal delete item
    showDeleteDialog(item) {
      this.dialogDelete = !this.dialogDelete
      this.Numero_matricule_delete = item.Numero_matricule;
      this.Nom_employe_delete = item.Nom_employe;
    },
      // Show modal delete item
    showDeleteSuccessDialog() {
    this.dialogDeleteSuccess = !this.dialogDeleteSuccess
    },
    // Show modal update item
    showUpdateSuccessDialog() {
    this.dialogUpdateSuccess = !this.dialogUpdateSuccess
    },
    // add new effectuer
    async submit() {
      this.formHasErrors = false

        Object.keys(this.form).forEach(async f => {
          if (!this.form[f]) this.formHasErrors = true 
          this.$refs[f].validate(true)

          try{
          await axios.post("http://localhost:5000/employe", {
          Numero_matricule: this.Numero_matricule,
          Nom_employe: this.Nom_employe,
          Titre: this.Titre,
          Email: this.Email,
          Password: this.Password,
          Role: this.Role
        });
        this.Numero_matricule = "";
        this.Nom_employe = "";
        this.Titre = "";
        this.Email = "";
        this.Password = "";
        this.Role = "";
        this.get_all_employe();
    } catch (err) {
        console.log(err);
      }
        })
    },
        // Update attribuer
    async Update_employee(Numero_matricule) {
      try {
        const attribuer = await axios.put(`http://127.0.0.1:5000/employe/${Numero_matricule}`, {
          Nom_employe: this.Update_Nom_employe,
          Titre: this.Update_Titre,
          Role: this.Update_Role,
        });
        this.get_all_employe();
        this.showUpdateSuccessDialog();
        this.showEditDialog();
        console.log(attribuer.data);
      } catch (err) {
        console.log(err);
      }
    },
    // Update attribuer
    async Update_login_employee(Numero_matricule) {
      try {
        const attribuer = await axios.put(`http://127.0.0.1:5000/employeLogin/${Numero_matricule}`, {
          Email: this.Update_Email,
          Password: this.Update_Password,
        });
        this.get_all_employe();
        this.showUpdateSuccessDialog();
        this.showEditLoginDialog();
        console.log(attribuer.data);
      } catch (err) {
        console.log(err);
      }
    },
    // Delete attribuer
    async delete_employee(Numero_matricule_delete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/employe/${Numero_matricule_delete}`);
        this.get_all_employe();
        this.showDeleteSuccessDialog();
        this.showDeleteDialog();
      } catch (err) {
        console.log(err);
      }
    },
    },
  }
</script>