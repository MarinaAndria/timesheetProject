 <template>
    <v-app>
      <v-container>
        <v-data-table
      ref="myTable"
      :headers="headers"
      :items="items"
      class="elevation-1"
      >
      <template v-slot:items="props">
        <td v-for="header in props.headers" :key="header.text">
          {{ props.item[header.value] }}
        </td>
      </template>
    </v-data-table>
    <v-btn @click="generatePdf">Download PDF</v-btn>
      </v-container>
    </v-app>
  </template>
  <script>
  import jsPDF from 'jspdf'
  
import 'jspdf-autotable'
  import html2canvas from 'html2canvas'
  export default {
    data: () => ({
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Email', value: 'email' },
        { text: 'Phone', value: 'phone' }
      ],
      items: [
        { name: 'John Doe', email: 'johndoe@gmail.com', phone: '555-555-5555' },
        { name: 'Jane Smith', email: 'janesmith@gmail.com', phone: '444-444-4444' },
        { name: 'Bob Johnson', email: 'bobjohnson@gmail.com', phone: '333-333-3333' }
      ]
    }),
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
        pdf.text(100, 30, "Title of PDF");
        pdf.autoTable({
          head: [['name', 'email', 'phone']],
          body: this.items.map(item => [item.name, item.email, item.email]),
    startY: 50
        });
        pdf.save('table.pdf');
      });
      }
    }
  }
  </script>