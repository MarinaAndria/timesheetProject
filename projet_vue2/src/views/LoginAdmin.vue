<template>
    <v-container>
      <v-row align="center" justify="center" >
          <v-col cols="12" sm="10">
            <v-card class="elevation-6 mt-15"  >
              <v-row>
                <v-col>
                  <v-card 
                  class="overflow-hidden container align-center pa-7 mt-8"
                  color="grey lighten-3"
                  max-width="400"
                  height="420"
                  >
                  <div>
                    <v-alert :value="showAlert" shaped dense dark type="warning" dismissible>{{ errorMessage }}</v-alert>
                  </div>
                    <v-toolbar
                      flat
                      color="orange darken-3"
                      dark
                    >
                    <v-icon>mdi-account</v-icon>
                      <v-toolbar-title class="font-weight-light ml-4">
                        Login to your user account
                      </v-toolbar-title>
                    </v-toolbar>
                    <v-form
                    ref="form"
                    lazy-validation
                    class="font-weight-dark"
                    >
                      <v-text-field
                      class="font-weight-light mt-10"
                        v-model="Email"
                        :rules="emailRules"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        required
                      ></v-text-field>
                      <v-text-field
                        ref="Password"
                        v-model="Password"
                        :rules="required"
                        :error-messages="errorMessages"
                        label="Password"
                        prepend-icon="mdi-lock"
                        required
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                      ></v-text-field>
                    <v-card-actions><v-spacer></v-spacer>
                        <v-btn
                          color="success mt-10"
                          style="width: 150px"
                          @click="Login"
                        >
                          Login
                        </v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card>
                </v-col>
                <v-col cols="12" md="6" class="orange darken-3 rounded-bl-xl" >
                  <div style="  text-align: center; padding: 180px 0;">
                    <v-card-text class="white--text text-center mt-4" >
                      <v-row>
                          <v-img max-width="100" src="../assets/logo-Gret.jpg"></v-img>
                        <v-col>
                          <h2 class="text-center "> For Nature, For People, Forever</h2>
                          <h5
                            class="mt-6"
                          >Build a future in which <br> people live in harmony with nature.
                          </h5>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </div>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  <script>
  // import axios
  import axios from "axios";

  export default {
    name: 'LoginAdmin',
    data: () => ({
      Password: '',
      Email: '',
      show1: false,
      showAlert: false,
      errorMessage: '',
      formHasErrors: false,
      errorMessages: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      required: [value => !!value || 'Required.'],
      select: null,
    }),
    watch: {
      name () {
        this.errorMessages = ''
      },
    },
    computed: {
      form () {
        return {
          Email: this.Email,
          Password: this.Password
        }
      },
    }, 
    methods: {
      handleError(err) {
      this.showAlert = true
      this.errorMessage = err.response.data
    },
      // Login function 
    async Login () {
      this.$refs.form.validate()
        try{
          await axios.post("http://localhost:5000/login", {
          Email: this.Email,
          Password: this.Password,
          }, {
            withCredentials: true
          });

          let response = await axios.get("http://localhost:5000/user_compte", {
            withCredentials: true
          });
          
          this.user = await response.data[0]
          //We add the following line
          this.$store.commit("setUserProfile", this.user);
          if (this.user.Role == 'Admin'){
          await this.$router.push('/homeAdmin');
          //alert("Welcome")
          this.$toast.success({
              title:'Good to see you' +' '+ this.user.Nom_employe,
              message:'Welcome to your Admin space'
          })
        } else {
          await this.$router.push('/homeUser1');
          //alert("Welcome")
          this.$toast.success({
              title:'Good to see you' +' '+ this.user.Nom_employe,
              message:'Welcome to your User space'
          })
        }
        } catch (err) {
          this.handleError(err);
      }
    }
    },
  }
  </script>