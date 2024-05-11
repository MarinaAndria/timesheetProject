<template>
  <v-card 
  class="overflow-hidden container align-center pa-7 mt-15"
  color="indigo lighten-5"
  max-width="500"
  >
    <v-toolbar
      flat
      color="indigo darken-4"
      dark
    >
      <v-icon>mdi-account</v-icon>
      <v-toolbar-title class="font-weight-light">
        Login Employee profile
      </v-toolbar-title>
    </v-toolbar>
    <v-form
    ref="form"
    lazy-validation
    class="font-weight-dark"
    >
          <v-text-field
          class="font-weight-light"
            v-model="Email"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            ref="Password"
            v-model="Password"
            :rules="required"
            :error-messages="errorMessages"
            label="Password"
            required
          ></v-text-field>
       
          <v-btn
            color="success"
            class="mr-4"
            @click="Login"
          >
            Login
          </v-btn>
        </v-form>
      </v-card>
  </template>
  <script>
  // import axios
  import axios from "axios";

  export default {
    name: 'LoginUser',
    data: () => ({
      Password: '',
      Email: '',
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
        await this.$router.push('/homeUser');
    } catch (err) {
        console.log(err);
      }
    },
          // Logout function 
          async Logout () {
        try{
          await axios.post("http://localhost:5000/logout");
        await this.$router.push('/logout');
    } catch (err) {
        console.log(err);
      }
    }
    },
  }
  </script>