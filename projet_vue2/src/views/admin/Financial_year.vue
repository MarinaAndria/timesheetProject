<template>
  
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
      ><v-spacer></v-spacer>
        <h2 class="mt-6" style="text-align: center;">Start a new financial year</h2>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout>
            <v-flex md8 class="mx-auto ">
            <v-card ref="form" class="ml-5 text-center mt-5 pa-7" max-width="700" >
              <h3 class="mt-2 mb-5 text-center">Add those two informations to start a new financial year</h3>
              <v-divider class="mb-7"></v-divider>
                <div class="row list-group-item text-center" style="width: 100%; margin-left: 10px">
                    <v-row align="center">
                      <v-text-field
                        ref="Date_debut"
                        type="number"
                        v-model="Date_debut"
                        :rules="[() => !!Date_debut || 'This field is required']"
                        label="Start date"
                        placeholder="****"
                        required
                        class="mr-4"
                      ></v-text-field>
                                    
                      <v-text-field
                        ref="Date_fin"
                        type="number"
                        v-model="Date_fin"
                        :rules="[() => !!Date_fin || 'This field is required']"
                        label="End date"
                        placeholder="****"
                        required
                      ></v-text-field>
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
                      @click="Ajout_year"
                  >
                      Submit
                  </v-btn>
                  </v-card-actions>
            </v-card>
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
                              <div class="text-h5 pa-12"> Financial year added successfully</div>
                            </v-card-text>
                            <v-card-actions class="justify-end">
                              <v-btn
                                text
                                @click="showYearSuccessDialog()"
                              >ok</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-col>
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
  errorMessages: '',
  formHasErrors: false,
  dialogtoValidateSuccess: false,
  Date_debut: '',
  Date_fin: '',
  };
  },
  computed: {
    form () {
        return {
          Date_debut: this.Date_debut,
          Date_fin: this.Date_fin
        }
      },
  },
  mounted() {
  },
  methods: {
  resetForm () {
    this.errorMessages = []
    this.formHasErrors = false

    Object.keys(this.form).forEach(f => {
      this.$refs[f].reset()
    })
    },
    // Show modal toValidate item
    showYearSuccessDialog() {
    this.dialogtoValidateSuccess = !this.dialogtoValidateSuccess
    },
    // add new year
   async Ajout_year() {
    this.formHasErrors = false

    if (!this.form.Date_debut || !this.form.Date_fin) {
        this.formHasErrors = true
    }
    this.$refs.Date_debut.validate(true)
    this.$refs.Date_fin.validate(true)

    if (!this.formHasErrors) {
      try{
      await axios.post("http://localhost:5000/annee_fiscale", {
        Date_debut: this.Date_debut,
        Date_fin: this.Date_fin,
      });
      this.Date_debut = "";
      this.Date_fin = "";
  } catch (err) {
      console.log(err);
    }
    this.showYearSuccessDialog();
  }
  },
  }
};
  </script>