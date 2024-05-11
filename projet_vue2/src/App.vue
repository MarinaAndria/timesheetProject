<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import { socket } from './api/socket';
import { mapGetters } from "vuex"

export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods: {

},
computed: {
  usersFromStore() {
    return this.$store.state.userProfile;
  },
  ...mapGetters(['getUserProfile'])
},
mounted() {
  socket.emit("connection")
  /* socket.emit("test", {
    data: "hello"
  })
  socket.on("arrival-test", () => {}) */
  socket.on("arrival-notif-admin", (result) => {
    if (this.getUserProfile.Role == "Admin"){
      this.$toast.success({
      title:'Timesheet request approbation',
      message:'From'+' '+ result.data
    })
    }
  })

  socket.on("arrival-notif-user", (result) => {
    if (this.getUserProfile.Role == "User"){
      if (result.data == "Timesheet rejected"){
        this.$toast.error({
          title:'Alert',
          message: result.data
        })
      } else {
        this.$toast.success({
        title:'Alert',
        message:result.data
      })
      }
    }
  })
}
};
</script>
