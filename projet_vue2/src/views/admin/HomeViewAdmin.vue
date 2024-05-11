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
      <p align="center">Welcome to your Admin space</p>
    </div>
      <v-spacer></v-spacer></v-toolbar>
      <v-flex>
          <v-card class="ma-5 text-center mt-7 mb-0" >
              <v-row no-gutters class="mt-7 ml-12">
                  <v-col cols="12" md="4" >
                   <v-row>
                     <v-col cols="12" md="2">
                        <v-card height="80px" width="10px" color="green"></v-card>
                     </v-col>
                     <v-col cols="12" md="10">
                       <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                       <v-list-item-subtitle>{{ data_accee[0].Employees }}</v-list-item-subtitle>
                      <v-list-item-title class="mt-3">Employees</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                     </v-col>
                   </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                     <v-row>
                     <v-col cols="12" md="2">
                        <v-card height="80px" width="10px" color="red"></v-card>
                     </v-col>
                     <v-col cols="12" md="10">
                       <v-list two-line subheader class="ml-n8">
                  <v-list-item >
                    <v-list-item-content>
                      <v-list-item-subtitle>{{ data_accee[0].Projects }}</v-list-item-subtitle>
                      <v-list-item-title class="mt-3">Projects</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                     </v-col>
                   </v-row>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-row>
                     <v-col cols="12" md="2">
                        <v-card height="80px" width="10px" color="grey"></v-card>
                     </v-col>
                     <v-col cols="12" md="10">
                       <v-list two-line subheader class="ml-n8">
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-subtitle>23 January, 2023</v-list-item-subtitle>
                      <v-list-item-title class="mt-3">Date</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                     </v-col>
                   </v-row>
                  </v-col>
              </v-row>
          </v-card>
        </v-flex>
    <v-layout>
        <v-flex md8>
          <v-card class="ml-14 mr-3 text-center mt-4 pa-7" width="500" height="320">
            <div>
                <apexchart :options="chartOptions" :series="series"></apexchart>
            </div>
          </v-card>
        </v-flex>
        <v-flex md8>
          <v-card class="ml-4 mr-3 text-center mt-4 pa-7" width="500" height="320">
            <div>
                <apexchart :options="chartOptions2" :series="series2"></apexchart>
            </div>
          </v-card>
        </v-flex>
    </v-layout>
  </v-app>
</template>
<script>
import VueApexCharts from 'vue-apexcharts'
import axios from 'axios'
import { mapGetters } from "vuex"
  export default {
    name: 'HomeViewAdmin',
    data() {
    return {
      Chart_data: [],
      data_accee: [],
      Chart_data2: [],
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
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            distributed: true,
            dataLabels: {
              position: 'top', // top, center, bottom
            },
            colors: {
              ranges: [{
                from: -100,
                to: -46,
                color: '#FEB019'
              }, {
                from: -45,
                to: 0,
                color: '#FEB019'
              }]
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val ;
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        stroke: {
          show: true,
          width: 1,
          colors: ['#fff']
        },
        tooltip: {
          enabled: true,
        },
        title: {
          text: 'Employees per project',
        },
        xaxis: {
          type: undefined,
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
        },
      },
      yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val ;
            }
          }
        
        },
      },
    }
  },
  mounted() {
    this.Chart_dataq()
    this.Chart_dataq2()
    this.data_accueil()
  },
  components: {
  apexchart: VueApexCharts
},
computed: {
  usersFromStore() {
    return this.$store.state.userProfile;
  },
  ...mapGetters(['getUserProfile']),
  // eslint-disable-next-line vue/no-dupe-keys
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
  series2: ({ Chart_data2 }) => {
    const series2 = Chart_data2.reduce((map, { Nom_projet, ...points }) => {
      Object.entries(points).forEach(([ name, point ]) => {
        const s = (map.has(name) ? map : map.set(name, [])).get(name)
    
        s.push({
          x: Nom_projet,
          y: point
        })
      })
      return map
    }, new Map())

    return Array.from(series2.entries(), ([ name, data ]) => ({
      name,
      data
    }))
  }
},
methods: {
      async Chart_dataq() {
      const response = await axios.get('http://127.0.0.1:5000/chart')
      this.Chart_data = response.data
      console.log(this.Chart_data)
    },
    async Chart_dataq2() {
      const response = await axios.get('http://127.0.0.1:5000/chart2')
      this.Chart_data2 = response.data
      console.log(this.Chart_data2)
    },
    async data_accueil() {
      const response = await axios.get('http://127.0.0.1:5000/data_accueil')
      this.data_accee = response.data
      console.log(this.data_accee.Employees)
    }
}
}
</script>