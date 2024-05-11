<!-- eslint-disable vue/no-multiple-template-root -->
<template >
   <div>
    <div class="mt-10 pt-10" v-for="user_compte in usersFromStore" :key="user_compte.Numero_matricule">
      <h3 align="center">Hello {{ user_compte.Nom_employe }}</h3>
      <p align="center">Welcome to your "Timesheet" space</p>
    </div>
  </div>
</template>
<script>
// import axios
import axios from "axios";
  export default {
    name: 'HomeViewAdmin',
    mounted() {
    this.get_user();
  },
    methods: {
    async get_user() {
        let response = await axios.get("http://localhost:5000/user_compte", {
          withCredentials: true
        });
        console.log(response.data);
        this.user = await response.data
        //We add the following line
        this.$store.commit("getData", this.user);
  }
},
computed: {
    usersFromStore() {
      return this.$store.state.user_compte;
    },
  },
}
</script>