/* eslint-disable camelcase */
// import connection
import db from '../database/Database.js'
// Get All attribuers
export const get_attribuer = (result) => {
  db.query('SELECT Attribuer.Numero_attribuer, Attribuer.Numero_matricule, Attribuer.Numero_projet, Attribuer.Budget, Projet.Nom_projet, Employe.Nom_employe FROM Attribuer, Projet, Employe WHERE Attribuer.Numero_projet = Projet.Numero_projet AND Attribuer.Numero_matricule = Employe.Numero_matricule', (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Insert Attribuer to Database
export const insert_attribuer = (data, result) => {
  const donnees = []
  db.query("INSERT INTO Attribuer (Numero_matricule, Numero_projet, Budget) VALUES ('" + data.Numero_matricule + "','" + data.Numero_projet + "', '" + data.Budget + "')", (err, results) => {
    if (err) console.log(err)
    donnees.push(results)
    result(donnees)
  })
}
// Delete attribuer to Database
export const delete_attribuer_by_id = (Numero_attribuer, result) => {
  db.query("DELETE FROM Attribuer WHERE Numero_attribuer = '" + Numero_attribuer + " '", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}

// Update attribuer to Database
export const update_attribuer_by_Id = (data, Numero_attribuer, result) => {
  db.query("UPDATE Attribuer SET Budget = '" + data.Budget + " ' WHERE Numero_attribuer = '" + Numero_attribuer + " '", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results)
    }
  })
}
