<template>
    <v-app>
      <Sidebar/>
      <v-main class="ps-0">
        <router-view/>
      </v-main>
    </v-app>
</template>
  
  <script>
  import Sidebar from '@/components/SidebarAdmin'
  export default {
    name: 'Layout_admin',
    components: {
      Sidebar,
    },
    data: () => ({
      //
    }),
  };
  </script>