<template>
    <v-app :style="{background: $vuetify.theme.themes.light.background}">
      <v-toolbar
        color="grey lighten-3"
        flat
        max-height="100"
        class="mt-4"
      ><v-spacer></v-spacer>
        <div class="mt-6">
          <h3 align="center">Name : {{ getElementInfo.Nom_employe }}</h3>
          <h4 align="center">Numero matricule : {{ getElementInfo.Numero_matricule }}</h4>
          <h4 align="center">Month : {{ getElementInfo.mois }}</h4>
        </div>
        <v-spacer></v-spacer></v-toolbar>
        <v-layout>
            <v-flex md12 class="mx-auto"><v-spacer></v-spacer>
              <v-card class="ml-4 text-center mt-6 pa-7" max-width="900" >
                <div id="app" >
                    <v-main class="container align-center px-1" >
                        <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                        class="mb-6"
                        ></v-text-field>
                      <v-card>
                        <v-data-table :headers="headers" :search="search" :items="filteredItems" class="elevation-0">
                          <template v-slot:item.Date="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Date}}</div>
                          </template>
                          <template v-slot:item.Nom_projet="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Nom_projet}}</div>
                          </template>
                          <template v-slot:item.Heure="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Heure}}</div>
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-main>
                </div>
            </v-card>
          </v-flex><v-spacer></v-spacer>
          <v-flex md8 class="mx-auto">
              <v-card class="mr-5 ml-5 text-center mt-6 pa-7" max-width="900" >
                <div id="app" >
                    <v-main class="container align-center px-1" >
                      <v-card>
                        <v-data-table ref="myTable" :headers="headers2" :items="effectuer_mois" class="elevation-0">
                          <template v-slot:item.Nom_projet="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Nom_projet}}</div>
                          </template>
                          <template v-slot:item.Accumulated="{ item }">
                            <div class="text-truncate" style="width: 180px">{{item.Accumulated}}</div>
                          </template>
                        </v-data-table>
                        <v-btn @click="generatePdf" class="mt-4 mb-4" color="cyan darken-2" dark>Download PDF</v-btn>
                      </v-card>
                    </v-main>
                </div>
            </v-card>
          </v-flex>
      </v-layout>
    </v-app>
  </template>
  <script>
  // import axios
  import axios from "axios";
  import { mapGetters } from "vuex"
  import jsPDF from 'jspdf'
  import 'jspdf-autotable'
  import html2canvas from 'html2canvas'
  export default {
  data() {
    return {
    headers: [
            { text: 'Date', value: 'Date' },
            { text: 'Project', value: 'Nom_projet' },
            { text: 'Hour', value: 'Heure' },
    ],
    headers2: [
            { text: 'Project', value: 'Nom_projet' },
            { text: 'Accumulated hour', value: 'Accumulated' },
    ],
    modal: false,
    effectuer: [],
    effectuer_mois: [],
    projets: [],
    items: [],
    search: '',
    dialog: false,
    dialogDelete: false,
    date: '',
    Numero_projet: '',
    Accumulated: '',
    Nom_projet_update: '',
    Nom_projet_delete: '',
    Update_Heure: '',
    Numero_matricule: '',
    Heure: '',
    Numero_effectuer: '',
    Nom_projet: '',
    errorMessages: '',
    formHasErrors: false,
    dialogUpdateSuccess: false,
    dialogDeleteSuccess: false,
  };
  },
  computed: {
    usersFromStore() {
      return this.$store.state.userProfile;
    },
     filteredItems() {
        if(!this.getElementInfo.date){
          return this.effectuer
        }
        return this.effectuer.filter(item => {
          const itemDate = new Date(item.Date)
          const month = itemDate.getMonth() + 1;
          const year = itemDate.getFullYear();
          const monthYearFilter = this.getElementInfo.date.split("-")
          return monthYearFilter[1] == month && monthYearFilter[0] == year
        })
      },
    ...mapGetters(['getUserProfile']),
    ...mapGetters(['getElementInfo'])
  },
  mounted() {
    this.get_all_projets();
    this.get_all_effectuer();
    this.get_all_effectuer_mois();
  },
  methods: {
    generatePdf() {
      const table = this.$refs.myTable.$el;
      // convert vuetify table to image
      html2canvas(table).then(() => {
        // create pdf and add image to it
        let pdf = new jsPDF('p', 'mm', 'a4');
        // set pdf content and download it
        var img = new Image();
        img.src = "../../assets/logo_WWF_dark.png";
        img.onload = function(){
          pdf.addImage(img, 'JPEG', 15, 15, 30, 30);
        }
        // add title to pdf
        pdf.text(50, 28, "Recapitulation of the timesheet on " + this.getElementInfo.mois);
        pdf.text(20, 60, "Employee ");
        pdf.text(20, 70, "Serial number : " + this.getElementInfo.Numero_matricule.toString());
        pdf.text(20, 80, "Name : " + this.getElementInfo.Nom_employe);
        pdf.text(20, 90, "Date : " + this.getElementInfo.date);
        pdf.text(30, 120, "After review of the timesheet, those informations are attested");
        pdf.text(15, 130, "by Mrs/Mr " + this.getUserProfile.Nom_employe + ', ' + this.getUserProfile.Titre + '.');
        pdf.autoTable({
          head: [['Project name', 'Hour']],
          body: this.effectuer_mois.map(item => [item.Nom_projet, item.Accumulated]),
    startY: 140
        });
        pdf.text(140, 230, "Signature");
        pdf.save(this.getElementInfo.Nom_employe + ' timesheet.pdf');
      });
      },
    // Get All Projets
    async get_all_projets() {
        let response = await axios.get("http://localhost:5000/projet");
        this.projets = response.data;
      },
  
    // Get All work done
    async get_all_effectuer() {
      let Numero_matricule = this.getElementInfo.Numero_matricule;
      console.log (this.getElementInfo.Numero_matricule)
        let response = await axios.get(`http://127.0.0.1:5000/effectuer/${Numero_matricule}`);
        this.effectuer = response.data;
    },
        // Get All work done
        async get_all_effectuer_mois() {
      let Date = this.getElementInfo.date
      let Numero_matricule = this.getElementInfo.Numero_matricule;
      console.log (this.getElementInfo.Numero_matricule)
        let response = await axios.get(`http://127.0.0.1:5000/effectuer_mois/${Numero_matricule}/${Date}`);
        this.effectuer_mois = response.data;
    },
  },
    filters: {
      formatDate(value) {
        return new Date(value).toLocaleDateString()
      },
    },
  };
  </script>