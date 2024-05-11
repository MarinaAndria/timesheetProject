<template>
    <v-app>
      <Sidebar/>
      <v-main class="ps-0">
        <router-view/>
      </v-main>
    </v-app>
</template>
  
  <script>
  import Sidebar from '@/components/SidebarUser'
  export default {
    name: 'Layout_user',
    components: {
      Sidebar,
    },
    data: () => ({
      //
    }),
  };
  </script>