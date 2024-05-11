<!-- eslint-disable vue/no-multiple-template-root -->
<template >
  <v-app :style="{background: $vuetify.theme.themes.light.background}">
    <v-toolbar
      color="grey lighten-3"
      flat
      max-height="100"
      class="mt-5"
    ><v-spacer></v-spacer>
    <div>
      <h3 align="center" class="mt-12">Hello {{ getUserProfile.Nom_employe }} </h3>
      <p align="center">Welcome to your User space</p>
    </div>
      <v-spacer></v-spacer></v-toolbar>
      <v-layout>
        <v-flex md8>
          <v-card class="ml-14 mr-3 text-center mt-4 pa-7" width="500" height="600">
            <div>
                <div >
                  <div class="indigo lighten-2 text-center">General informations</div>
                 
                  <h4 class="mt-5">TECH-MGMT lines</h4>
                  <p>For some employees, their activity may be attributed to TECH (technical activity) or MGMT (paid on management fees) depending on the projects. MGMT times are the times we allocate to projects for regular supervision tasks. They are therefore taken from the time budget on 9F. There is therefore no time budget on MGMT, you are free to bill all projects in MGMT but the amount will be deducted from the budget on 9F. TECH times are tasks that fall outside of normal supervision.

Note: For Lalasoa, you are covered by Management fees, so only bill 9F or MGMT (no TECH time) unless it is a truly specific case and a specifically allocated budget.</p>
                  <h4 class="mt-5">New projects</h4>
                  <p>To work on a new  project, please get in touch with the admin </p>
                  <h5 class="mt-15">NB: If you encounter problems or difficulties, please contact the administrator</h5>
              </div>
            </div>
          </v-card>
        </v-flex>
        <v-flex md8>
          <v-card class="ml-14 mr-3 text-center mt-4 pa-7" width="500" height="320">
            <div>
                <apexchart :options="chartOptions" :series="series"></apexchart>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex"
import axios from 'axios'
export default {
  data() {
    return {
      monthYear: '',
      chartOptions: { 
        chart: {
          type: 'bar',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        title: {
          text: 'Progress of the project (Unit: "h")',
        },
        xaxis: {
          type: undefined
        },
       },
       chartOptions2: { 
        chart: {
          type: 'area',
          height: 430
        },
        plotOptions: {
          bar: {
            horizontal: true,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          offsetX: -6,
          style: {
            fontSize: '12px',
            colors: ['#fff']
          }
        },
        stroke: {
          curve: 'smooth'
        },
        tooltip: {
          shared: true,
          intersect: false
        },
        title: {
          text: 'Progress of the project (Unit: "h")',
        },
        xaxis: {
          type: undefined
        },
       },
      Chart_data: [],
    }
  },
  computed: {
    ...mapGetters(['getDate']),
    ...mapGetters(['getUserProfile']),
    series: ({ Chart_data }) => {
    const series = Chart_data.reduce((map, { Nom_projet, ...points }) => {
      Object.entries(points).forEach(([ name, point ]) => {
        const s = (map.has(name) ? map : map.set(name, [])).get(name)
    
        s.push({
          x: Nom_projet,
          y: point
        })
      })
      return map
    }, new Map())

    return Array.from(series.entries(), ([ name, data ]) => ({
      name,
      data
    }))
  },
  },
  mounted() {
    this.Chart_dataq()
  },
  methods:{
    async Chart_dataq() {
      let Numero_matricule = this.getUserProfile.Numero_matricule;
      const response = await axios.get(`http://127.0.0.1:5000/chart_user/${Numero_matricule}`)
      this.Chart_data = response.data
      console.log(this.Chart_data)
    },
  },
  filters: {
    formatDate(value) {
      return new Date(value).toLocaleDateString()
    },
  },
}
</script>
