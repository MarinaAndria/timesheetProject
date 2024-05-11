/* eslint-disable camelcase */
// import connection
// import db from '../database/Database.js'
// Get All employes
import db from '../database/Database.js'
import bcrypt from 'bcrypt'
export const add_new_employe = async (data, res) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.Password, salt)
  const donnees = []
  db.query("INSERT INTO Employe (Numero_matricule, Nom_employe, Titre, Email, Password, Role) VALUES ('" + data.Numero_matricule + "','" + data.Nom_employe + "', '" + data.Titre + "', '" + data.Email + "', '" + hashedPassword + "', '" + data.Role + "')", async (err, results) => {
    if (err) console.log(err)
    donnees.push(results)
    const { Password, ...data_res } = donnees
    res(data_res)
  })
}
export const get_all_employe = (result) => {
  db.query('SELECT * FROM Employe ORDER BY Nom_employe ASC', (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Delete employe to Database
export const delete_employe_by_id = (Numero_matricule, result) => {
  db.query("DELETE FROM Employe WHERE Numero_matricule = '" + Numero_matricule + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results.recordsets[0])
    }
  })
}
// Update employe login to Database
export const update_employe_login_by_Id = async (data, Numero_matricule, result) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(data.Password, salt)
  db.query("UPDATE Employe SET  Email = '" + data.Email + "', Password = '" + hashedPassword + "'  WHERE Numero_matricule = '" + Numero_matricule + "'", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results)
    }
  })
}
// Update employe to Database
export const update_employe_by_Id = async (data, Numero_matricule, result) => {
  db.query("UPDATE Employe SET  Nom_employe = '" + data.Nom_employe + "', Titre = '" + data.Titre + "', Role = '" + data.Role + "'  WHERE Numero_matricule = '" + Numero_matricule + " '", (err, results) => {
    if (err) {
      console.log(err)
      result(err, null)
    } else {
      result(null, results)
    }
  })
}
