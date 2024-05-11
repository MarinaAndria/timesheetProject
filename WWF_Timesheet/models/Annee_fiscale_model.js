/* eslint-disable camelcase */
// import connection
import db from '../database/Database.js'
// Insert Attribuer to Database
export const insert_annee_fiscale = (data, result) => {
  const donnees = []
  db.query('SELECT Numero_matricule FROM Employe', (err, results) => {
    if (err) console.log(err)
    results.recordsets[0].forEach(record => {
      for (const prop in record) {
        console.log(prop + ':' + record[prop])
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        for (let i = 7; i <= 9; i++) {
          db.query("INSERT INTO Etat (Numero_matricule, Date, Mois) VALUES ('" + record.Numero_matricule + "', '" + data.Date_debut + '-' + '0' + i + "', '" + months[i - 1] + "')", (err, results) => {
            if (err) console.log(err)
            donnees.push(results)
          })
        }
        for (let i = 10; i <= 12; i++) {
          db.query("INSERT INTO Etat (Numero_matricule, Date, Mois) VALUES ('" + record.Numero_matricule + "', '" + data.Date_debut + '-' + i + "', '" + months[i - 1] + "')", (err, results) => {
            if (err) console.log(err)
            donnees.push(results)
          })
        }
        for (let i = 1; i <= 6; i++) {
          db.query("INSERT INTO Etat (Numero_matricule, Date, Mois) VALUES ('" + record.Numero_matricule + "', '" + data.Date_fin + '-' + '0' + i + "', '" + months[i - 1] + "')", (err, results) => {
            if (err) console.log(err)
            donnees.push(results)
          })
        }
      }
    })
    result(donnees)
  })
}
